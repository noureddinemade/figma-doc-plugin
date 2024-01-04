// Import
import { anyChildren } from "../../functions/component";
import { inArray, isArray } from "../../functions/general";


// Get the anatomy of the component
export function getChildren(component: any) {

    // Set up
    let compChildren: any[] = [];

    // Get all children
    const allChildren = anyChildren(component);

    // Check if there are any children
    if (isArray(allChildren)) {

        // Loop thru all children
        allChildren.forEach((c: any) => {

            // Check if it exists in compChildren array and then add if it doesn't
            const duplicate = inArray(c, compChildren);

            if (!duplicate) { compChildren.push(c) };

        });

    }

    //
    return isArray(compChildren) ? compChildren : null;

}