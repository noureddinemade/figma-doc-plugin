// Import classes
import { Component, Property, Visual, Frame } from "./sys/classes";
import { cleanName, sortArray } from "./sys/functions/general";
import { createText, createFrame, createSection } from "./sys/functions/create";
import { getAllProperties, getAllChildren, getUniques } from "./sys/functions/document";
import { baseStroke, baseFill, baseToken, baseFrame, innerFrame, propFill, propToken, propFrame, valueFill, valueToken, valueFrame, compHead, sectHead, regCopy, propText, propValue, compFrame, itemFrame, innerFrameAlt } from "./sys/styles";

// Set base constructs
const cs                            = figma.currentPage.selection;
const toDocument:       any[]       = [];
const doNotDocument:    any[]       = [];

// Check if a user has selected anything
if (cs && cs.length > 0) {

    try {
        
        // Load fonts
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Regular" });
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Medium" });

        // Loop thru selected items
        cs.forEach(e => {

            // Check if the selected item is a component
            if (e.type === 'COMPONENT_SET' || e.type === 'COMPONENT') {

                // Set up component props
                const props         = e.componentPropertyDefinitions;
                const compName      = cleanName(e.name, null);
                const compID        = e.id;
                const compURL       = e.documentationLinks && e.documentationLinks.length > 0 ? e.documentationLinks[0].uri : null;
                const compDesc      = e.description ? e.description : null;
                const compDocs      = { description: compDesc, link: compURL };
                const compStyles    = null;

                // Set up base
                const baseComp      = e.children.find((a) => a.type === 'COMPONENT');
                const baseInstance  = baseComp ? baseComp.createInstance() : null;

                let compProps: any[] | null = [];

                // Get properties for component
                for (let key in props) {

                    const p = props[key];

                    let property = null;

                    // Loop thru each property and get its values
                    if (props.hasOwnProperty(key)) {

                        let name:           any | null      = key.split('#');
                            name                            = name && name.length > 0 ? cleanName(name[0], null) : null;
                        let type:           any | null      = p.type;
                        let value:          any | null      = p.defaultValue;
                        let styles:         any | null      = null;
                        let baseStyles:     any | null      = null;
                        let options:        any | null      = null;
                        let children:       any | null      = null;
                        let baseChildren:   any | null      = null;

                        // Create an instance based on this property and then get it's styles
                        const instance = baseComp ? baseComp.createInstance() : null;
                        
                        instance.name = `${name}=${value}`;
                        instance.setProperties({[key]: value});

                        // Check if instance exists
                        if (instance) {

                            // If it's a boolean
                            if (type === 'BOOLEAN') { 
                                
                                instance.name = `${name}=true`;
                                
                                instance.setProperties({[key]: true});
                            
                            }

                            // If it's an instance swap
                            if ( type === 'INSTANCE_SWAP' ) {}

                            // If it's a variant
                            if ( type === 'VARIANT' ) {

                                // Check if there are options available for this property
                                if (p.variantOptions && p.variantOptions.length > 0) {

                                    options = [];
    
                                    p.variantOptions.forEach(v => {
    
                                        const clone = instance.clone();
                                
                                        clone.name = `${name}=${v}`;
    
                                        // Check if this is a "fake" boolean
                                        if (v === 'true' || v === 'false') { type = 'BOOLEAN'; clone.setProperties({[key]: 'true'}); }
    
                                        else { clone.setProperties({[key]: v}) }

                                        // Get styles and children
                                        const variantStyles     = getAllProperties(clone);
                                        const variantChildren   = getAllChildren(clone)

                                        //
                                        options.push(new Property(v, 'OPTION', variantStyles, null, variantChildren))
    
                                        // Get rid instance once it has outlived its usefulness
                                        clone.remove();
    
                                    })
    
                                }
    
                            }
                            
                            // Set styles and children
                            styles          = getAllProperties(instance);
                            baseStyles      = getAllProperties(baseInstance);
                            children        = getAllChildren(instance);
                            baseChildren    = getAllChildren(baseInstance);

                            // Compare top level styles
                            // if (styles && baseStyles) {

                            //     // Compare layout
                            //     if (styles.layout && styles.layout.length > 0) {

                            //         // Loop thru layout items
                            //         styles.layout.forEach(i => {

                            //             baseStyles.layout.forEach(b => {

                            //                 // Check if the same property is being compared
                            //                 if (i.name === b.name) {
                                                
                            //                     // Compare
                            //                     const value = anyDiff(i, b, 'value');
                            //                     const token = anyDiff(i, b, 'token');

                            //                     if (value && token) {

                            //                         console.log(name, i.name, ': is a shared property', i.value, b.value, '/', i.token, b.token);

                            //                     }

                            //                     else {

                            //                         console.log(name, i.name, ': is a unique property', i.value, b.value, '/', i.token, b.token);

                            //                     }

                            //                 }

                            //             })

                            //         })

                            //     }

                            // }

                            // Compare children styles


                            // Set children for property
                            children = children && children.length > 1 ? children : null;

                            // Get rid instance once it has outlived its usefulness
                            instance.remove();

                        }

                        property = new Property(name, type, styles, options, children);
                        compProps.push(property);

                    }

                    sortArray(compProps, 'type'); // Sort component properties by type

                }

                // Remove base instance once it's done it's job
                if (baseInstance) { baseInstance.remove() }

                // Create component object
                const component = new Component(compName, compID, compDocs, compProps, compStyles);
                
                toDocument.push(component);

            }

            else { console.log(e.name, ' is not a component') } // Skip if not any type of component

        });
        
        // Check if there is anything to document
        if (toDocument && toDocument.length > 0) {

            // Create the main frame (lol)
            // const mainFrameStroke   = baseStroke;
            // const mainFrameVisual   = new Visual(null, mainFrameStroke, null, null);
            // const mainFrameProps    = new Frame('HORIZONTAL', 24, 24, 5, mainFrameVisual, null, {minWidth: 980, maxWidth: 980, minHeight: 100, maxHeight: null});
            // const mainFrame         = createFrame(mainFrameProps, 'documentation');

            // Loop thru components to document
            toDocument.forEach(i => {

                const props     = i.properties;
                const styles    = i.styles;
                const docs      = i.documentation;
                const name      = i.name;
                const seen      = new Set();

                let items: any | null = null;

                // Clean up styles
                if (props && props.length > 0) {

                    items = [];

                    props.forEach(p => {

                        const style = p.styles

                        // Check if styles exist
                        if (style) {

                            //
                            const layout    = style.layout;
                            const fills     = style.fills;
                            const strokes   = style.strokes;
                            const effects   = style.effects;
                            const text      = style.text;

                            // Layout
                            if (layout && layout.length > 0) {

                                layout.forEach(l => {

                                    const uLayout = getUniques(layout, seen);
                                
                                    console.log(uLayout);

                                    items.push(uLayout);

                                })

                            }

                        }
                        
                    });

                }

                // // Create frame & heading for each component
                // const componentDocs = createFrame(compFrame, `component: ${cleanName(i.name, null)}`);
                // const componentHead = createText(`component: ${cleanName(i.name, null)}`, compHead, 'component-heading');

                // componentDocs.appendChild(componentHead);

                // // Check if there is information available
                // if (docs && docs.description) {

                //     let link: any | null = null;

                //     // Create information frame
                //     const frame = createSection('information', baseFrame, sectHead);

                //     // Add to information frame
                //     const info = createText(docs.description, regCopy, 'information-text');

                //     // Add link if available
                //     if (docs.link) {

                //         link = createText(`🔗 ${docs.link}`, regCopy, 'information-link');
                //         link.hyperlink = {type: 'URL', value: docs.link};
                        
                //     }

                //     // Append everything
                //     frame.appendChild(info);
                //     if (link) { frame.appendChild(link) }
                //     componentDocs.appendChild(frame);

                //     info.layoutSizingHorizontal = 'FILL';
                //     if (link) { link.layoutSizingHorizontal = 'FILL' }
                //     frame.layoutSizingHorizontal = 'FILL';

                // }

                // // Check if there are properties available
                // if (props) {

                //     // Create properties frame
                //     const frame = createSection('properties', baseFrame, sectHead);
                //     const inner = createFrame(innerFrame, 'content');

                //     props.forEach(p => {

                //         // Create property and type frames and labels
                //         const property      = createFrame(itemFrame, 'property');
                //         const label         = createText(p.name, regCopy, 'property-label');
                //         const type          = createFrame(propFrame, 'type');
                //         const typeLabel     = createText(p.type, propValue, 'type-label');

                //         let options: any | null = null;

                //         // // Check if there are any options
                //         if (p.options && p.options.length > 0) {

                //             // Create options frame
                //             options = createFrame(innerFrameAlt, 'options');

                //             p.options.forEach(o => {

                //                 // Create option frame & label
                //                 const option        = createFrame(valueFrame, 'option');
                //                 const optionLabel   = createText(o.name, propValue, 'option-label');

                //                 option.appendChild(optionLabel);
                //                 options.appendChild(option);

                //             })

                //         }

                //         // Append to inner
                //         type.appendChild(typeLabel);
                //         property.appendChild(label);

                //         if (options) { property.appendChild(options) } // Append options if available

                //         property.appendChild(type);
                //         inner.appendChild(property);
                        
                //         property.layoutSizingHorizontal     = 'FILL';
                //         label.layoutSizingHorizontal        = 'FILL';

                //     })

                //     // Append everything
                //     frame.appendChild(inner);
                //     componentDocs.appendChild(frame);

                //     inner.layoutSizingHorizontal = 'FILL';
                //     frame.layoutSizingHorizontal = 'FILL';

                // }

                // // Document the layout
                // console.log(i);

                // // Add to main frame (lol)
                // mainFrame.appendChild(componentDocs);

                // componentDocs.layoutSizingHorizontal = 'FILL';

            })
            
            // Go to documentation created
            // figma.viewport.scrollAndZoomIntoView([mainFrame]);

        }

    }

    catch(error) {

        console.log('Error: ', error);

    }

    finally {

        // console.clear();
        figma.closePlugin(`Wow, look at all that we've documented, we make a good team!`);

    }

}

else { console.clear(); figma.closePlugin('"If nothing is selected, how can anything be documented?" — An ancient design system proverb') }