// Import classes
import { Component, Property, Visual, Frame } from "./sys/classes";
import { cleanName, sortArray } from "./sys/functions/general";
import { createText, createFrame, createSection } from "./sys/functions/create";
import { getAllStyles, sharedOrUnique, getChildren } from "./sys/functions/document";
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
            if (e.type === 'COMPONENT_SET') {

                // Set up component props
                const compName              = cleanName(e.name, null);
                const compID                = e.id;
                const compURL               = e.documentationLinks && e.documentationLinks.length > 0 ? e.documentationLinks[0].uri : null;
                const compDesc              = e.description ? e.description : null;
                const compDocs              = { description: compDesc, link: compURL };
                const compProps:    any     = [];
                const compStyles:   any     = { shared: null, individual: null };
                const compChildren          = e.children ? getChildren(e, null) : null;

                // Set up base
                const baseComp              = e.children.find((a) => a.type === 'COMPONENT');
                const baseInstance          = baseComp ? baseComp.createInstance() : null;
                const styles:       any     = [];

                // Get properties and styles for component
                if (e.componentPropertyDefinitions && baseComp) {

                    let props:      any             = e.componentPropertyDefinitions;
                        props                       = Object.entries(props).map(([key, value]) => ({ key, ...value }));

                    // Loop thru properties
                    props.forEach(p => {

                        // Get key information
                        const defaultName = p.key;
                        
                        let name:           any | null      = p.key.split('#');
                            name                            = name && name.length > 0 ? cleanName(name[0], null) : null;
                        let type:           any | null      = p.type;
                        let value:          any | null      = p.defaultValue;
                        let options:        any | null      = [];

                        // Fix the type and options if it's a variant boolean
                        if ((value === 'true' || value === 'false') || (value === true || value === false)) {

                            type = "BOOLEAN"; 
                            options = [true, false]; 
                            value = Boolean(eval(value));

                        }

                        // Set conditions
                        const c1 = p.variantOptions && p.variantOptions.length > 0;
                        const c2 = options && options.length > 0;

                        // Loop thru variants options if available and add them to properties
                        if (c1 || c2) { if (c1) { p.variantOptions.forEach(o => options.push(o) ) } } 
                        else { options = null }

                        // Get styles from variants
                        if (options && options.length > 0) {
                            
                            // Loop thru variant options
                            options.forEach(o => {

                                // Create instance for each size
                                const instance = baseInstance.clone();

                                // Customise each instance
                                instance.setProperties({[defaultName]: o});
                                instance.name = `${name}=${o}`;

                                // Get styles from each size
                                const topStyles         = getAllStyles(instance);
                                const instanceChildren  = getChildren(instance, null);
                                const allStyles         = [];
                            
                                instanceChildren?.forEach(c => allStyles.push(getAllStyles(c)));

                                // Add to array to clean and sort
                                styles.push({name: `${name}=${o}`, top: topStyles, all: allStyles});

                                // Remove instance once it has outlived it's purpose
                                instance.remove();

                            })

                        } 
                        
                        else {

                            // Create instance for each size
                            const instance = baseInstance.clone();

                            // Customise each instance
                            instance.name = `${name}`;

                            // Get styles from each size
                            const topStyles         = getAllStyles(instance);
                            const instanceChildren  = getChildren(instance, null);
                            const allStyles         = [];
                            
                            instanceChildren?.forEach(c => allStyles.push(getAllStyles(c)));

                            // Add to array to clean and sort
                            styles.push({name: name, top: topStyles, all: allStyles});

                            // Remove instance once it has outlived it's purpose
                            instance.remove();

                        }

                        // Create property and style objects
                        const property  = new Property(name, type, value, options);
                        const style     = {shared: null, individual: []};

                        // Add property and style objects to the component
                        compProps.push(property);

                        compStyles.individual   = style.individual;
                        compStyles.shared       = style.shared;

                    })


                }

                // Get unique and shared styles

                // Clean and sort styles
                console.log(sharedOrUnique(styles));

                // Sort component properties by type
                sortArray(compProps, 'type');

                // Remove base instance once it's done it's job
                if (baseInstance) { baseInstance.remove() }

                // Create raw component object
                const rawComponent = new Component(compName, compID, compDocs, compProps, compStyles);
                
                toDocument.push(rawComponent);

            }

            else { console.log(e.name, ': Not a component') } // Skip if not any type of component

        });

        console.log('--------------');
        console.log('Finished prepping components for documentating:', toDocument);

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