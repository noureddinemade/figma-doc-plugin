// Import
import { anyChildren } from "../component";
import { makeInstance } from "../create";
import { isArray } from "../general";

// Get the anatomy of the component
export function getAnatomy(props: any, children: any) {

    // Set up
    let compAnatomy: any | null = null;

    // Check if there are children
    if (isArray(children)) {

        // Get all boolean props from component
        const booleanProps:     any     = isArray(props.boolean) ? props.boolean : null;
        const propsForInstance: any[]   = [];

        // Check if there are any booleans props
        if (isArray(booleanProps)) {

            // Loop thru props and turn them on for the instance
            booleanProps.forEach((b: any) => propsForInstance.push({[b.name]: b.value === true ? true : true }));

        }

        // Create an instance
        let instance: any   = makeInstance('anatomyInstance', propsForInstance);
            instance        = instance ? instance : null;

        // Get all instance and component children
        const instChildren: any = anyChildren(instance);

        // Check if there are any component children
        if (isArray(instChildren)) {

            // Loop thru children
            instChildren.forEach((c: any) => {

                // Label eligible children
                const eligible: any = children.filter((a: any) => a.name === c.name);

                if (isArray(eligible)) { 

                    // Update name to be able to find later
                    c.name = `forAnatomy===${c.name}`;
                
                };

            });

            // Add diagram instance
            compAnatomy = instance;

        }

    }

    //
    return compAnatomy ? compAnatomy : null;

}