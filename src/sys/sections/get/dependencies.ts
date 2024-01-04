// Import
import { inArray, isArray } from "../../functions/general";

// Get any dependencies from the component
export function getDependencies(children: any) {

    // Set up
    const dependencies: any = children.filter((a: any) => a.type === 'INSTANCE');
    
    let compDependencies: any[] = [];

    // Check if there are dependencies
    if (isArray(dependencies)) {

        // Set up temp array
        const temp: any[] = [];

        // Loop thru dependencies
        dependencies.forEach((d: any) => {

            // Create dependency object
            const object = { name: d.name, mainName: d.mainComponent.name, mainId: d.mainComponent.id };

            // Check if it exists in temp array and then add if it doesn't
            const duplicate = inArray(object, temp);

            if (!duplicate) { temp.push(object) };

        });

        // Move to compDependencies
        compDependencies = temp;

    }

    //
    return isArray(compDependencies) ? compDependencies : null;

}