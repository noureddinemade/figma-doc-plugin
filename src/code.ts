// Import classes
import { Component, Property } from "./sys/classes";
import { cleanName, sortArray } from "./sys/functions/general";
import { createText, createFrame, createSection } from "./sys/functions/create";
import { getAllProperties, getAllChildren } from "./sys/functions/document";
import { baseStroke, baseFill, baseToken, baseFrame, innerFrame, propFill, propToken, propFrame, valueFill, valueToken, valueFrame, compHead, sectHead, regCopy, propText, propValue } from "./sys/styles";

// Set base constructs
const cs                            = figma.currentPage.selection;
const toDocument:       any[]       = [];
const doNotDocument:    any[]       = [];

// Check if a user has selected anything
if (cs && cs.length > 0) {

    try {
        
        // Load fonts
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Regular" });
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Bold" });

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
                const compDocs      = [{ description: compDesc, link: compURL }];
                const baseComp      = e.children.find((a) => a.type === 'COMPONENT');

                let compProps:          any[] | null    = [];

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
                        let styles:         any | null      = [];
                        let options:        any | null      = [];
                        let children:       any | null      = [];

                        // Create an instance based on this property and then get it's styles
                        const instance = baseComp ? baseComp.createInstance() : null;

                        let getFromInstance: any | null = instance;
                        
                        instance.name = `${name}=${value}`;
                        instance.setProperties({[key]: value});

                        // Check if instance exists
                        if (instance) {

                            // If it's a boolean
                            if (type === 'BOOLEAN') { 
                                
                                instance.name = `${name}=true`;
                                
                                instance.setProperties({[key]: true}); 

                                getFromInstance = instance.findAll(x => x.name === name);
                                getFromInstance = getFromInstance && getFromInstance.length > 0 ? getFromInstance[0] : null;
                            
                            }

                            // If it's an instance swap
                            if ( type === 'INSTANCE_SWAP' ) {}

                            // If it's a variant
                            if ( type === 'VARIANT' ) {

                                // Check if there are options available for this property
                                if (p.variantOptions && p.variantOptions.length > 0) {
    
                                    p.variantOptions.forEach(v => {
    
                                        const clone = instance.clone();
                                
                                        clone.name = `${name}=${v}`;
    
                                        // Check if this is a "fake" boolean
                                        if (v === 'true' || v === 'false') { type = 'BOOLEAN'; clone.setProperties({[key]: 'true'}); }
    
                                        else { clone.setProperties({[key]: v}) }

                                        // Get styles and children
                                        const variantStyles     = getAllProperties(clone);
                                        const variantChildren   = getAllChildren(clone, null)

                                        //
                                        options.push(new Property(v, 'OPTION', variantStyles, null, variantChildren))
    
                                        // Get rid instance once it has outlived its usefulness
                                        clone.remove();
    
                                    })
    
                                }
                                
                                else { options = null }
    
                            }

                            styles      = getAllProperties(getFromInstance);
                            children    = getAllChildren(instance, name);

                            // Get rid instance once it has outlived its usefulness
                            instance.remove();

                        }

                        property = new Property(name, type, styles, options, children);
                        compProps.push(property);

                    }

                    sortArray(compProps, 'type'); // Sort component properties by type

                }

                // Create component object
                const component = new Component(compName, compID, compDocs, compProps);
                
                toDocument.push(component);

                // Loop through all children and get base values
                // if (e.children && e.children.length > 0) {

                //     e.findAll(c => {

                //         const props     = getAllProperties(c);
                //         const heirachy  = defineHierarchy(c, 0);
                //         const parent    = c.parent ? c.parent.id : null;

                //         const child = new CompChild(cleanName(c.name, null), c.id, heirachy, props, parent, c.type);

                //         compChildren.push(child);

                //     });

                // }

                // Loop thru props and create an instance for each variant, then add the values, the children and their values
                // if (forInstances && forInstances.length > 0) {

                //     forInstances.forEach(i => {

                //         const variantOptions: any[] = [];

                //         // Loop thru each option in a variant
                //         if (i.options && i.options.length > 0) {

                //             i.options.forEach(o => {

                //                 let instChildren: any[] | null = [];

                //                 const instance = e.children[0].createInstance();

                //                 instance.name = `${i.name}=${o}`;

                //                 instance.setProperties({[i.name]: o});

                //                 // Get properties and values for this instance
                //                 const instanceProps = getAllProperties(instance);

                //                 // Get children and their properties if available
                //                 if (instance.children && instance.children.length > 0) {

                //                     instance.findAll(c => {

                //                         if (c.type !== 'COMPONENT' || c.type !== 'INSTANCE' || c.parent.type !== 'INSTANCE') {

                //                             const cProps    = getAllProperties(c);
                //                             const cHeirachy = defineHierarchy(c, 0);

                //                             // Create child
                //                             const child = new CompChild(cleanName(c.name, null), c.id, cHeirachy, cProps, c.parent.id, c.type);

                //                             instChildren.push(child);

                //                         }

                //                     });

                //                 }

                //                 variantOptions.push(new Component(null, null, instanceProps, null, instChildren, null, null));

                //                 // Remove the instance from the page after we get what we need
                //                 // instance.remove();

                //             })

                //         }

                //         compVariants.push(new CompProp(cleanName(i.name, null), null, variantOptions));
    
                //     })

                // }

                // toDocument.push(new Component(cleanName(e.name, null), e.id, compProps, compVariants, null, e.description, e.documentationLinks));

                // console.log(compProps);
                // console.log(forInstances);

            }

            else { console.log(e.name, ' is not a component') } // Skip if not any type of component

        });

        console.log(toDocument);
        
        // Loop thru components to document if any
        // if (toDocument && toDocument.length > 0) {

        //     // Create the main frame (lol)
        //     const mainFrameStroke   = baseStroke;
        //     const mainFrameVisual   = new Visual(null, mainFrameStroke, null, null);
        //     const mainFrameProps    = new Frame('HORIZONTAL', 24, 24, 5, mainFrameVisual, null, null);
        //     const mainFrame         = createFrame(mainFrameProps, 'documentation');

        //     figma.viewport.scrollAndZoomIntoView([mainFrame]);

        // }

    }

    catch(error) {

        console.log('Error: ', error);

    }

    finally {

        figma.closePlugin(`Wow, look at all that we've documented, we make a good team!`);

    }

}

else { figma.closePlugin('"If nothing is selected, how can anything be documented?" — An ancient design system proverb') }