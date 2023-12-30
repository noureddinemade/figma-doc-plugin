// Import classes
import { Component, Property, Visual, Frame } from "./sys/classes";
import { cleanName, isArray, sortArray, convertColour } from "./sys/functions/general";
import { createText, createFrame, createSection, create } from "./sys/functions/create";
import { cleanAllStyles, getAllStyles, getChildren, getSharedAndUnique, removeDuplicates } from "./sys/functions/document";
import { compFrame, compTitle, mainFrame, sectionCopy, sectionLink } from "./sys/styles";

// Set base constructs
const cs                            = figma.currentPage.selection;
const toDocument:       any[]       = [];
const doNotDocument:    any[]       = [];

// Check if a user has selected anything
if (isArray(cs)) {

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
                const compURL               = isArray(e.documentationLinks) ? e.documentationLinks[0].uri : null;
                const compDesc              = e.description ? e.description : null;
                const compDocs              = { description: compDesc, link: compURL };
                const compChildren          = e.children ? getChildren(e, null) : null;
                const compInstances         = [];
                
                // Set up base
                const baseComp              = e.children.find((a) => a.type === 'COMPONENT');
                const baseInstance          = baseComp ? baseComp.createInstance() : null;

                // Set up dynamics
                let compProps:              any | null = [];
                let compStyles:             any | null = { shared: { top: null, all: null }, unique: { top: null, all: null } };
                let compDependencies:       any | null = [];

                // Get properties and styles for component
                if (e.componentPropertyDefinitions && baseComp) {

                    let props:      any             = e.componentPropertyDefinitions;
                        props                       = Object.entries(props).map(([key, value]) => ({ key, ...value }));

                    // Loop thru properties
                    props.forEach(p => {

                        // Get key information
                        const defaultName = p.key;
                        
                        let name:           any | null      = p.key.split('#');
                            name                            = isArray(name) ? cleanName(name[0], null) : null;
                        let type:           any | null      = p.type === 'INSTANCE_SWAP' ? 'DEPENDENCY' : p.type;
                        let value:          any | null      = p.defaultValue;
                        let options:        any | null      = [];

                        // Check if there are dependencies
                        if (type === 'DEPENDENCY') { compDependencies.push(figma.getNodeById(value)) };

                        // Fix the type and options if it's a variant boolean
                        if ((value === 'true' || value === 'false') || (value === true || value === false)) {

                            type = "BOOLEAN"; 
                            options = [true, false]; 
                            value = Boolean(eval(value));

                        }

                        // Loop thru variants options if available and add them to properties
                        if (isArray(p.variantOptions) || isArray(options)) { if (isArray(p.variantOptions)) { p.variantOptions.forEach(o => options.push(o) ) } } 
                        else { options = null }

                        if (isArray(options)) {

                            options.forEach(o => {

                                // Create instance for each size
                                const instance = baseInstance.clone();

                                // Customise each instance
                                instance.setProperties({[defaultName]: o});
                                instance.name = `${name}=${o}`;

                                // Push to compInstances array
                                compInstances.push(instance);

                            })

                        }
                        
                        else {

                            // Create instance for each size
                            const instance = baseInstance.clone();

                            // Customise each instance
                            instance.name = `${name}`;

                            // Push to compInstances array
                            compInstances.push(instance);

                        }

                        // Create property and style objects
                        const property  = new Property(name, type, value, options);

                        // Add property and style objects to the component
                        compProps.push(property);

                    })


                }

                // Sort styles into uniue and shared
                if (isArray(compInstances)){

                    // Set up
                    let styles:         any | null  = { shared: { top: [], all: [] }, unique: { top: [], all: [] } };
                    let shared                      = styles.shared ? styles.shared : null;
                    let unique                      = styles.unique ? styles.unique : null;

                    // Get dependencies list
                    const dependencies = compProps.filter(a => a.type === 'DEPENDENCY');

                    const baseChildren  = getChildren(baseComp, null);
                    const baseStyles    = getAllStyles(baseComp);

                    // Sort instances by alphabetical order
                    sortArray(compInstances, 'name');

                    // Loop thru instances
                    compInstances.forEach(i => {

                        const anyDependencies = dependencies.filter(a => a.name === i.name);

                        if (!isArray(anyDependencies)) {

                            // Set up
                            const instChildren  = getChildren(i, null);
                            const instStyles    = getAllStyles(i);

                            // Compare instance frame styles with base frame styles
                            const topStyles = getSharedAndUnique(instStyles, baseStyles)

                            // Add styles to 
                            shared.top.push(topStyles.shared);
                            unique.top.push(topStyles.unique);

                            // Compare instance children styles with base children styles
                            if (isArray(instChildren)) {

                                instChildren?.forEach(c => {

                                    let baseChild               = baseChildren.filter(a => a.name === c.name);
                                    let baseChildStyle          = getAllStyles(baseChild[0]);
                                    let childStyle              = getAllStyles(c);
                                    let childSharedAndUnique    = getSharedAndUnique(childStyle, baseChildStyle);

                                    if (childSharedAndUnique) { shared.all.push(childSharedAndUnique.shared) }
                                    if (childSharedAndUnique) { unique.all.push(childSharedAndUnique.unique) }

                                })


                            }

                        }

                    })

                    // Clean styles and add to compStyles
                    if (isArray(shared.top)) { compStyles.shared.top = (removeDuplicates(shared.top)) };
                    if (isArray(shared.all)) { compStyles.shared.all = (cleanAllStyles(shared.all, dependencies)) };
                    if (isArray(unique.top)) { compStyles.unique.top = (unique.top.filter(item => item.length > 0 )) };
                    if (isArray(unique.all)) { compStyles.unique.all = (unique.all.filter(item => item.length > 0 )) };
                    
                }

                // Sort component properties by type
                sortArray(compProps, 'type');

                // Remove base instance once it's done it's job
                if (baseInstance) { baseInstance.remove() }

                // Create raw component object
                const rawComponent = new Component(compName, compID, compDocs, compProps, compStyles, compDependencies, compInstances);
                
                toDocument.push(rawComponent);

            }

            else { console.log(e.name, ': Not a component') } // Skip if not any type of component

        });

        console.log('--------------');
        console.log('Finished prepping components for documentating:', toDocument);

        // Loop thru toDocument array and start documenting
        if (isArray(toDocument)) {

            // Create main frame (lol)
            const document = create('documentation', mainFrame, null, 'frame');

            toDocument.forEach(i => {

                // Set up
                const compWrap  = create(`component: ${i.name}`, compFrame, null, 'frame');
                const compHead  = create('component-title', compTitle, i.name, 'text');

                // Append
                compWrap.appendChild(compHead);

                // Display documentation info and links if available
                if (i.documentation) {

                    // Create frame
                    const compDocs = createSection('documentation');

                    // Display info
                    if (i.documentation.description) {

                        const desc = create('component-description', sectionCopy, i.documentation.description, 'text');
                        compDocs.appendChild(desc);

                    }

                    // Display link
                    if (i.documentation.link) {

                        const link = create('component-description', sectionLink, i.documentation.link, 'text');
                        link.hyperlink = {type: 'URL', value: i.documentation.link};
                        compDocs.appendChild(link);

                    }

                    // Display properties

                    // Loop thru styles

                    // Append
                    compWrap.appendChild(compDocs);
                    compDocs.layoutSizingHorizontal = 'FILL';

                }

                // Append
                document.appendChild(compWrap);
                compWrap.layoutSizingHorizontal = 'FILL';

            })

            // Go to documentation
            figma.viewport.scrollAndZoomIntoView([document]);


        } else { console.clear(); figma.closePlugin(`There's nothing to document!`); }

    }

    catch(error) {

        console.log('Error: ', error);

    }

    finally {

        // console.clear();
        figma.closePlugin(`Wow, look at all that documentation!`);

    }

}

else { console.clear(); figma.closePlugin('"If nothing is selected, how can anything be documented?" — An ancient design system proverb') }