// Get selection
const currentSelection      = figma.currentPage.selection;
const properties            = [];

async function documentSelected() {

    try {

        // Load fonts
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Regular" });
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Bold" });

        // Setup weights
        const fontReg   = { family: "IBM Plex Mono", style: "Regular" };
        const fontBold  = { family: "IBM Plex Mono", style: "Bold" };

        // Create default styles
        const baseStroke    = new Stroke('INSIDE', 1, {token: null, value: '9747FF'}, [10,5]);
        const baseFill      = new Item('FFFFFF');
        const baseToken     = new Visual(baseFill, null, null ,null);
        const baseFrame     = new Frame('VERTICAL', 16, 24, 5, baseToken);
        const innerFrame    = new Frame('VERTICAL', 8, 0, 0, null);
        const propFill      = new Item('F5F5F6');
        const propToken     = new Visual(propFill, null, null, null);
        const propFrame     = new Frame('VERTICAL', 0, [4,8], 4, propToken);
        const valueFill     = new Item('FAF4F2');
        const valueToken    = new Visual(valueFill, null, null, null);
        const valueFrame    = new Frame('VERTICAL', 0, [4,8], 4, valueToken);
        const compHead      = new Text('LOWER', 'NONE', fontBold, 16, null, null);
        const sectHead      = new Text('LOWER', 'UNDERLINE', fontBold, 14, null, null);
        const regCopy       = new Text('ORIGINAL', 'NONE', fontReg, 12, null, null);
        const propText      = new Text('LOWER', 'NONE', fontReg, 12, null, null);
        const propValue     = new Text('UPPER', 'NONE', fontReg, 12, null, null);

        // Is anything selected?
        if (currentSelection && currentSelection.length > 0) {

            const toDocument        = [];   // Define array needed for documentation
            const doNotDocument     = [];   // Define array for items not to document

            // Get each selected item and find properties and children
            currentSelection.forEach(selectedItem => {

                // Is this a component?
                if (selectedItem.type === 'COMPONENT' || selectedItem.type === 'COMPONENT_SET') {

                    const componentChildren     = [];                                           // Define array for children;
                    const componentProps        = [];                                           // Define array for component properties;
                    const properties            = selectedItem.componentPropertyDefinitions;    // Define properties

                    // Get properties for component
                    for (let key in properties) {

                        let property = null;

                        // Loop thru properties if they exist
                        if (properties.hasOwnProperty(key)) {
                            
                            let name      = key.split('#');                                   // Clean name
                            let type      = properties[key].type;                             // Get type
                            let value     = properties[key].defaultValue;                     // Get default value
                            
                            let options     = [];                                             // Define array for options
                            
                            // Check if options are available
                            if (properties[key].variantOptions && properties[key].variantOptions.length > 0) {

                                properties[key].variantOptions.forEach(o => {

                                    // Check if property is a "fake boolean"
                                    if (o === 'true' || o === 'false') {

                                        type = 'BOOLEAN';

                                        options = null;

                                    }

                                    else {

                                        options.push(o);

                                    }

                                });

                            } else { options = null }

                            //
                            property = new Property(name[0], type, options);

                        }

                        componentProps.push(property);
                        
                    }

                    // Get all children and get their properties
                    selectedItem.findAll(i => {

                        if (i.type === 'component') {



                        }
    
                        // Ignore a child if it is an instance as we do not document instances
                        if (i.type === 'INSTANCE' || i.parent.type === 'INSTANCE') {
    
                            doNotDocument.push(i);
    
                        }
                        // Otherwise get a child's properties
                        else {
                            
                            const currentProps      = getAllProperties(i);      // Get the required props for this item
                            const currentHierarchy  = defineHierarchy(i, 0);    // Define the hierarchy of this node
    
                            // Create property and push to nodeArray
                            const selectedProperty = new Child(cleanName(i.name, i.type), i.id, currentHierarchy, currentProps, i.parent.id, i.type);
                            
                            componentChildren.push(selectedProperty);
    
                        }
                        
                    });
    
                    const component = new Component(cleanName(selectedItem.name), selectedItem.id, componentProps, componentChildren, selectedItem.description, selectedItem.documentationLinks);

                    toDocument.push(component);

                }

            });

            console.log(toDocument);

            toDocument.forEach(i => {

                i.properties.forEach(p => {

                    if (i.children) {

                        i.children.forEach(c => {

                            if (p.name === c.name) { console.log('MATCH: ', p.name, c.name) };

                        })

                    }

                })

            });

            // Check if there is anything to document
            // if (toDocument && toDocument.length > 0) {


            //     // Create main frame (lol)
            //     const docContStroke             = baseStroke;
            //     const docContToken              = new Visual(null, docContStroke, null, null);
            //     const docContProps              = new Frame('HORIZONTAL', 24, 24, 5, docContToken);
            //     const docCont                   = createFrame(docContProps, 'documentation');

            //     // Document all selected items and their children (if any)

            //     toDocument.forEach(i => {

            //         // Configure padding
            //         // let padding;

            //         // i.level > 0 ? padding = [16, 16, 16, 16 * i.level] : padding = 16;

            //         // Create frame for component
            //         const componentCont = createFrame(new Frame('VERTICAL', 16, 0, 0),`component: ${i.name}`);

            //         // Create label
            //         const componentHeading = createText(`component: ${i.name}`, compHead, 'component-heading');
                    
            //         componentCont.appendChild(componentHeading);

            //         // Display information & links

            //         // Display information if available
            //         if (i.docs !== '') {

            //             // Create information frame
            //             const infoCont = createSection('information', baseFrame, sectHead);

            //             // Insert information
            //             const infoText = createText(i.docs, regCopy, 'documentation-content');

            //             infoCont.appendChild(infoText);

            //             // Check if there are any links
            //             if (i.link && i.link.length > 0) {

            //                 // Insert link
            //                 const infoLinkText  = createText(i.link[0].uri, propText, 'documentation-link');

            //                 infoLinkText.hyperlink = {type: 'URL', value: i.link[0].uri};
            //                 infoCont.appendChild(infoLinkText);

            //             }

            //             componentCont.appendChild(infoCont);
            //             infoCont.layoutSizingHorizontal = 'FILL';

            //         }

            //         // Display component properties
            //         if (i.properties && i.properties.length > 0) {

            //             sortArray(i.properties, 'type');

            //             // Create component props frame
            //             const propsCont         = createSection('properties', baseFrame, sectHead);
            //             const propsInnerCont    = createFrame(innerFrame, 'properties');

            //             // Loop thru component props
            //             i.properties.forEach(p => {

            //                 // Create property frame
            //                 const propCont = createFrame(new Frame('HORIZONTAL', 16, 0, 0, null, {p:'MIN', s:'CENTER'}, null), `property: ${cleanName(p.name)}`);

            //                 // Create type frame
            //                 const typeCont = createFrame(propFrame, 'type');
                            
            //                 // Create property label & type
            //                 const propLabel = createText(cleanName(p.name), propText, 'label');
            //                 const propType  = createText(p.type, propValue, 'label');

            //                 typeCont.appendChild(propType);
            //                 propCont.appendChild(propLabel);

            //                 // Create and list variants if available
            //                 if (p.options && p.options.length > 0) {

            //                     // Create options frame
            //                     const optionsCont = createFrame(new Frame('HORIZONTAL', 8, 0, 0), 'variant');

            //                     // Loop thru variants
            //                     p.options.forEach(o => {

            //                         // Create option frame
            //                         const valueCont = createFrame(valueFrame, 'variant');

            //                         // Create option label
            //                         const valueLabel = createText(o, propValue, 'label');

            //                         // Append
            //                         valueCont.appendChild(valueLabel);
            //                         optionsCont.appendChild(valueCont);
            //                         propCont.appendChild(optionsCont);

            //                     })

            //                 }

            //                 propCont.appendChild(typeCont);
            //                 propLabel.layoutSizingHorizontal = 'FILL';
            //                 propsInnerCont.appendChild(propCont);
            //                 propCont.layoutSizingHorizontal = 'FILL';

            //             });

            //             propsCont.appendChild(propsInnerCont);
            //             componentCont.appendChild(propsCont);
            //             propsInnerCont.layoutSizingHorizontal = 'FILL';
            //             propsCont.layoutSizingHorizontal = 'FILL';

            //         }

            //         // Display component variants if applicable


            //         // Display component children, styles and tokens

            //     //     let label;

            //     //     !i.parent ? label = createText(i.name, labelProps) : label = createText(`↳ ${i.name}`, labelProps);

            //     //     // Create property

            //     //     // Check fills
            //     //     if (i.props.fill) {

            //     //         // console.log(i.props.fill);

            //     //     }


            //     //     let propertyLabel   = new Text('LOWER', 'NONE', fontReg, 12, null, null);
            //     //         propertyLabel   = createText(i.name, propertyLabel);

            //     //     // console.log(i.props);
                    
                    
                    
            //     //     iCont.appendChild(propertyLabel);
            //         docCont.appendChild(componentCont);

            //     })

            //     // Go to documentation
            //     figma.viewport.scrollAndZoomIntoView([docCont]);

            // }

        }

        // If not, alert!
        else { alert('Nothing selected.') }

    } catch(error) {

        console.error("Error:", error);

    } finally {

        setTimeout(() => {

            figma.closePlugin();
            
        }, 1000);

    }

}

// Run plugin
documentSelected();