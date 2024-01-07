// Import
import { isArray } from "../../functions/general";

// Get all properties and their type, value and options
export function getProps(component: any) {

    // Set up
    let props:      any[] | null    = component.componentPropertyDefinitions;
        props                       = props ? Object.entries(props).map(([key, value]) => ({ key, ...value })) : null;
    let compProps:  any[]           = [];

    // Check if there are any properties
    if (isArray(props)) {

        // Loop thru properties
        props?.forEach((p: any) => {

            // Get key information for property
            let name:       any | null  = p.key ? p.key : null;
            let type:       any | null  = p.type ? p.type : null;
            let value:      any | null  = p.defaultValue;
            let options:    any | null  = p.variantOptions ? p.variantOptions : null;

            // Specify display order
            let order:      number      = 3 ;
                order                   = type === 'TEXT' ? 0 : order;
                order                   = type === 'BOOLEAN' ? 1 : order;
                order                   = type === 'INSTANCE_SWAP' ? 2 : order;

            // Generate options if type is boolean
            if (String(value) === 'true' || String(value) === 'false') {

                type = 'BOOLEAN';
                options = [false, true];
                value = Boolean(eval(value));
    
            }

            // Check if there are options
            if (isArray(p.variantOptions)) {

                // Set up temp array
                const temp: any[] = [];

                // Loop thru options
                options.forEach((o: string) => temp.push(o));

                // Move to options
                options = temp;

            }

            compProps.push({ name: name, type: type, value: value, options: options, order: order });

        });

    }

    //
    return isArray(compProps) ? compProps : false;

}