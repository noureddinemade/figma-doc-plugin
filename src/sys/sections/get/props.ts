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
                type                    = type === 'INSTANCE_SWAP' ? 'DEPENDENCY' : type;
            let value:      any | null  = p.defaultValue ? p.defaultValue : null;
            let options:    any | null  = p.variantOptions ? p.variantOptions : null;

            // Check if there are options
            if (isArray(options)) {

                // Set up temp array
                const temp: any[] = [];

                // Loop thru options
                options.forEach((o: string) => temp.push(o));

                // Move to options
                options = temp;

            }

            compProps.push({ name: name, type: type, value: value, options: options });

        });

    }

    //
    return isArray(compProps) ? compProps : false;

}