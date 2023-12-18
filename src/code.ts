// Import classes
import { Item, Stroke, DropShadow, Size, Box, Property, Child, Component, Text, Layout, Visual, Frame, Variant } from "./sys/classes";
import { convertColour, checkSides, setSides, cleanName, sortArray } from "./sys/functions/general";
import { createText, createFrame, createSection } from "./sys/functions/create";
import { defineHierarchy, getToken, getValue, hasText, checkName, getValueType, anyDiff, checkProperty, getProperties, getAllProperties } from "./sys/functions/document";
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
                const props = e.componentPropertyDefinitions;

                let compProps:          any[] | null    = [];
                let compVariants:       any[] | null    = [];
                let compChildren:       any[] | null    = []; 
                let forInstances:       any[] | null    = [];

                let component;
                let compBase;

                // Get properties for component
                for (let key in props) {

                    const p = props[key];

                    let property = null;

                    // Loop thru each property and get its values
                    if (props.hasOwnProperty(key)) {

                        let name:       any | null      = key.split('#');
                        let type:       any | null      = p.type;
                        let value:      any | null      = p.defaultValue;
                        let options:    any[] | null    = [];

                        // Check if there are options available for this property
                        if (p.variantOptions && p.variantOptions.length > 0) {

                            p.variantOptions.forEach(v => {

                                if (v === 'true' || v === 'false') {

                                    type    = 'BOOLEAN';
                                    options = null;

                                }

                                else {

                                    options.push(v);

                                }

                            })

                        }
                        
                        else { options = null }

                        property = new Property(cleanName(name[0], null), type, options);
                        compProps.push(property);

                        if (p.type === 'VARIANT') { forInstances.push(property) };

                    }

                    sortArray(compProps, 'type'); // Sort component properties by type

                }

                // Loop through all children and get base values
                if (e.children && e.children.length > 0) {

                    e.findAll(c => {

                        const props     = getAllProperties(c);
                        const heirachy  = defineHierarchy(c, 0);
                        const parent    = c.parent ? c.parent.id : null;

                        const child = new Child(cleanName(c.name, null), c.id, heirachy, props, parent, c.type);

                        compChildren.push(child);

                    });

                }

                // Loop thru props and create an instance for each variant, then add the values, the children and their values
                if (forInstances && forInstances.length > 0) {

                    forInstances.forEach(i => {

                        const variantOptions: any[] = [];

                        // Loop thru each option in a variant
                        if (i.options && i.options.length > 0) {

                            i.options.forEach(o => {

                                let instChildren: any[] | null = [];

                                const instance = e.children[0].createInstance();

                                instance.name = `${i.name}=${o}`;

                                instance.setProperties({[i.name]: o});

                                // Get properties and values for this instance
                                const instanceProps = getAllProperties(instance);

                                // Get children and their properties if available
                                if (instance.children && instance.children.length > 0) {

                                    instance.findAll(c => {

                                        if (c.type !== 'COMPONENT' || c.type !== 'INSTANCE' || c.parent.type !== 'INSTANCE') {

                                            const cProps    = getAllProperties(c);
                                            const cHeirachy = defineHierarchy(c, 0);

                                            // Create child
                                            const child = new Child(cleanName(c.name, null), c.id, cHeirachy, cProps, c.parent.id, c.type);

                                            instChildren.push(child);

                                        }

                                    });

                                }

                                variantOptions.push(new Component(null, null, instanceProps, instChildren, null, null));

                                // Remove the instance from the page after we get what we need
                                // instance.remove();

                            })

                        }

                        compVariants.push(new Variant(cleanName(i.name, null), variantOptions));
    
                    })

                }

                toDocument.push(new Component(cleanName(e.name, null), e.id, compProps, compVariants, e.description, e.documentationLinks));

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