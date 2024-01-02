// Import
import { isArray, cleanName, isDependent } from "../general";
import { Property } from "../../helpers/classes";
import { makeInstance } from "../create";
import { getAllStyles, getChildren, matchStyle } from "../document";
import { styleAreas, styles } from "../../helpers/arrays";
import { getStyles } from "./styles";

// Get all properties and their options from selected component
export function getProperties(i: any, baseComp: any, baseInstance: any, dependencies: any, compInstances: any, compProps: any) {

    if (i.componentPropertyDefinitions && baseComp) {

        let props:  any[]   = i.componentPropertyDefinitions;
            props           = Object.entries(props).map(([key, value]) => ({ key, ...value }));
    
        // Loop thru properties
        props.forEach((p: { key: string; type: string; defaultValue: any; variantOptions: any[]; }) => {
    
            // Get key information
            const defaultName = p.key;
            
            let name:           any | null      = p.key.split('#');
            let id:             any | null      = name[1];
                name                            = isArray(name) ? cleanName(name[0], null) : name;
            let type:           any | null      = p.type === 'INSTANCE_SWAP' ? 'DEPENDENCY' : p.type;
            let value:          any | null      = p.defaultValue;
            let options:        any | null      = [];
            let linkedNodes:    any | null      = [];
    
            // Fix the type and options if it's a variant boolean
            if ((value === 'true' || value === 'false') || (value === true || value === false)) {
    
                type = "BOOLEAN"; 
                options = [false, true]; 
                value = Boolean(eval(value));
    
            }
    
            // Loop thru variants options if available and add them to properties
            if (isArray(p.variantOptions) || isArray(options)) { if (isArray(p.variantOptions)) { p.variantOptions.forEach(o => options.push(o) ) } } 
            else { options = null }

            // If type has options but is not a boolean
            if (isArray(options) && type !== 'BOOLEAN') {
    
                options.forEach((o: any) => {

                    // Create and customise each instance, then add to compInstances array
                    const instance = makeInstance(baseInstance, `${name}=${o}`, [{[defaultName]: o}], compInstances);

                    // Check if linked node already exists in the linkedNodes array
                    const exists = linkedNodes.filter((a: any) => a === instance.name);

                    if (!isArray(exists)) { linkedNodes.push(instance.name) };
    
                });
    
            }

            // If type is a boolean
            if (type === 'BOOLEAN') {

                // Set up
                let state = value ? false : true;

                // Create and customise each instance, then add to compInstances array
                const instance = makeInstance(baseInstance, name, [{[defaultName]: state}], compInstances);

                // Find out which node is affected by this property
                const instC: any | null = getChildren(instance, null);
                const baseC: any | null = getChildren(baseInstance, null);

                // Check if instance and base have children
                if (isArray(instC) && isArray(baseC)) {

                    // Loop thru instance children
                    instC.forEach((c: any) => {

                        // Match base children with instance children
                        const matched: any | null = baseC.filter((a: any) => a.name === c.name);

                        // Check if there are matches
                        if (isArray(matched)) {

                            // Loop thru matches
                            matched.forEach((m: any) => {

                                // Check if instance child visibility doesn't match base child visibility
                                if (JSON.stringify(c['visible']) !== JSON.stringify(m['visible'])) {

                                    // Check if linked node already exists in the linkedNodes array
                                    const exists = linkedNodes.filter((a: any) => a === c.name);

                                    if (!isArray(exists)) { linkedNodes.push(c.name) }

                                }

                            });

                        }

                    });

                }

            }

            // If type is text
            if (type === 'TEXT') {

                // Set up
                const string = 'changed';

                // Create and customise each instance, then add to compInstances array
                const instance = makeInstance(baseInstance, name, [{[defaultName]: string}], compInstances);
                
                // Find out which node is affected by this property
                const children: any = instance.findAll((n: any) => n.type === "TEXT");

                if (isArray(children)) { children.forEach((c: any) => { if (c.characters === string) { 

                    // Check if linked node already exists in the linkedNodes array
                    const exists = linkedNodes.filter((a: any) => a === c.name);

                    if (!isArray(exists)) { linkedNodes.push(c.name) }
                
                } }) }

                // Change text back to defaultValue
                instance.setProperties({[defaultName]: value});

            }
            
            // If type is dependency
            if (type === 'DEPENDENCY') {

                // Find main component
                const mainComp: any = figma.getNodeById(value);

                // Add custom data to each instance of that mainComp
                if (mainComp) {

                    const depCompInstances: any = mainComp.instances;

                    depCompInstances.forEach((di: any) => {

                        di.setPluginData('isDependent', `dependentOn=${name}`);

                        const diChildren: any = di.findAll();

                        if (isArray(diChildren)) { diChildren.forEach((dic: any) => { dic.setPluginData('isDependent', `dependentOn=${name}`); }) };

                    })

                }

                // Add to comp dependencies
                dependencies.push({name: defaultName, component: figma.getNodeById(value)})
    
                // Create and customise each instance, then add to compInstances array
                const instance = makeInstance(baseInstance, name, null, compInstances);
    
            }
    
            // Create property and style objects
            const property  = new Property(name, type, value, options, defaultName, id ? id : null, linkedNodes);
    
            // Add property and style objects to the component
            compProps.push(property);
    
        })
    
    } else { console.log('No properties to get.') };

}