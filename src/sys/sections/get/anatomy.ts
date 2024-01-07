// Import
import { anyChildren, isInstance } from "../../functions/component";
import { makeInstance } from "../../functions/create";
import { isArray } from "../../functions/general";

// Get the anatomy of the component
export function getAnatomy(props: any) {

    // Set up
    let compAnatomy: any | null = null;

    // Get all boolean props from component
    const booleanProps:     any     = isArray(props) ? props.filter((a: any) => a.type === 'BOOLEAN') : null;
    const propsForInstance: any[]   = [];

    // Check if there are any booleans props
    if (isArray(booleanProps)) {

        // Loop thru props and turn them on for the instance
        booleanProps.forEach((b: any) => propsForInstance.push({[b.name]: b.value === true ? false : true }));

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

            // Find out if this child or it's parent is an instance
            const c1 = isInstance(c);
            const c2 = c.parent.name === instance.name;
            const c3 = c.parent.type === 'INSTANCE';

            if (c1 && c2 || !c1 && c2 && c3 || !c1 && !c2 && !c3 || c1 && c3 && !c2) { 

                // Update name to be able to find later
                c.name = `forAnatomy===${c.name}`;
            
            };

        });

        // Add diagram instance
        compAnatomy = instance;

    }

    //
    return compAnatomy ? compAnatomy : null;

}