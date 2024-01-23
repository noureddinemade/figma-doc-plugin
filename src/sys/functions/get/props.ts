// Import
import { isArray } from "../general";

// Get all properties and their type, value and options
export function getProps(component: any, compChildren: any) {

    // Set up
    let props:      any[] | null    = component.componentPropertyDefinitions;
        props                       = props ? Object.entries(props).map(([key, value]) => ({ key, ...value })) : null;
    let compProps:  any | null      = { text: [], boolean: [], variant: [], instance: [] };

    // Check if there are any properties
    if (isArray(props)) {

        // Loop thru properties
        props?.forEach((p: any) => {

            // Get key information for property
            let name:           any | null  = p.key ? p.key : null;
            let type:           any | null  = p.type ? p.type : null;
            let value:          any | null  = p.defaultValue;
            let options:        any | null  = p.variantOptions ? p.variantOptions : null;
            let connections:    any | null  = null;

            // Get connections from children
            // Check if children exist
            if (isArray(compChildren)) {

                connections = [];

                // Loop thru children
                compChildren.forEach((c: any) => {

                    // Set up
                    const ref: any = c.componentPropertyReferences;
                    const inc: any = connections.includes(c.name);

                    if (ref) {

                        if (type === 'TEXT' && ref.characters) { if (!inc && name === ref.characters) { connections.push(c.name) } };
                        if (type === 'BOOLEAN' && ref.visible) { if (!inc && name === ref.visible ) { connections.push(c.name) } };
                        if (type === 'INSTANCE_SWAP' && ref.mainComponent) { if (!inc && name === ref.mainComponent) { connections.push(c.name) } };

                    };

                });

            };

            // Generate options if type is boolean
            if (String(value) === 'true' || String(value) === 'false') {

                type = 'BOOLEAN';
                options = [false, true];
                value = Boolean(eval(value));
    
            };

            // Check if there are options
            if (isArray(p.variantOptions)) {

                // Set up temp array
                const temp: any[] = [];

                // Loop thru options
                options.forEach((o: string) => temp.push(o));

                // Move to options
                options = temp;

            };

            // Create object and push to relevant type
            const property = { name: name, value: value, options: options, instance: type === 'INSTANCE_SWAP' ? true : false, connections: connections };

            if (type === 'TEXT')            { compProps.text.push(property)     };
            if (type === 'BOOLEAN')         { compProps.boolean.push(property)  };
            if (type === 'VARIANT')         { compProps.variant.push(property)  };
            if (type === 'INSTANCE_SWAP')   { compProps.instance.push(property) };

        });

        // Remove type if array is empty
        if (!isArray(compProps.text))       { compProps.text = null     };
        if (!isArray(compProps.boolean))    { compProps.boolean = null  };
        if (!isArray(compProps.variant))    { compProps.variant = null  };
        if (!isArray(compProps.instance))   { compProps.instance = null };

        if (!isArray(compProps.text)    && 
            !isArray(compProps.boolean) && 
            !isArray(compProps.variant) && 
            !isArray(compProps.instance)) { 

            compProps = null;

        };

    };

    //
    return compProps ? compProps : false;

}