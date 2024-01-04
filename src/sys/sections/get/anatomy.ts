// Import
import { belongsToInstance, anyChildren, isInstance, findBaseComp } from "../../functions/component";
import { makeInstance } from "../../functions/create";
import { isArray } from "../../functions/general";

// Get the anatomy of the component
export function getAnatomy(props: any, children: any) {

    // Set up
    let compAnatomy: any[] = [];

    // Get all boolean props from component
    const booleanProps:     any     = props.filter((a: any) => a.type === 'BOOLEAN');
    const propsForInstance: any[]   = [];

    // Check if there are any booleans props
    if (isArray(booleanProps)) {

        // Loop thru props and turn them on for the instance
        booleanProps.forEach((b: any) => propsForInstance.push({[b.name]: b.value === true ? false : true }));

    }

    // Create an instance
    let instance: any   = makeInstance('anatomyInstance', propsForInstance, [{ label: 'forAnatomy', value: 'true' }]);
        instance        = instance ? instance : null;

    // Get all instance and component children
    const baseChildren: any = anyChildren(findBaseComp());
    const instChildren: any = anyChildren(instance);

    // Check if there are any component children
    if (isArray(baseChildren)) {

        // Set up temp arrau
        const temp: any[] = [];

        // Loop thru children
        baseChildren.forEach((c: any) => {

            // Find out if this child or it's parent is an instance
            const childIsAnInstance         = isInstance(c);
            const childBelongsToInstance    = belongsToInstance(c);

            if (childIsAnInstance && !childBelongsToInstance)  { temp.push(c) };
            if (!childIsAnInstance && !childBelongsToInstance) { temp.push(c) };

        });

        // Match children in temp with instance children
        // Check if there are any temp children
        if (isArray(temp) && isArray(instChildren)) {

            // Loop thru each child in temp
            temp.forEach((c: any) => {

                // Find matches
                const matches: any = instChildren.filter((a: any) => JSON.stringify(a) === JSON.stringify(c));

                // Check if anything matched
                if (matches) { compAnatomy.push(c) };

            });

        }

        // To produce the anatomy, the plugin traverses the node’s layers to itemize and mark text, instances, and other shapes as elements.
        // Each itemized component is enumerated in the content, with instances highlighting dependency name and relevant prop values and other nodes reflecting visual attributes and styles. In the artwork, markers are placed on the periphery, prioritizing the left edge and finding a location on any edge that hasn’t already been used.

    }

    //
    return isArray(compAnatomy) ? compAnatomy : null;

}