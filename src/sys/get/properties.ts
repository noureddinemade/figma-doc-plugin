// Import
import { isArray, cleanName } from "../functions/general";
import { Property } from "../helpers/classes";

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
                name                            = isArray(name) ? cleanName(name[0], null) : null;
            let type:           any | null      = p.type === 'INSTANCE_SWAP' ? 'DEPENDENCY' : p.type;
            let value:          any | null      = p.defaultValue;
            let options:        any | null      = [];
    
            // Check if there are dependencies
            if (type === 'DEPENDENCY') { dependencies.push(figma.getNodeById(value)) };
    
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
    
                options.forEach((o: any) => {
    
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
            const property  = new Property(name, type, value, options, defaultName);
    
            // Add property and style objects to the component
            compProps.push(property);
    
        })
    
    } else { console.log('No properties to get.') };

}