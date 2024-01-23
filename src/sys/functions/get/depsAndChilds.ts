// Import
import { anyChildren, belongsToComponentSet } from "../component";
import { inArray, isArray } from "../general";

// Get any dependencies from the component
export function getDependenciesAndChildren(component: any) {

    // Set up
    const children:     any = anyChildren(component);
    const dependencies: any = children.filter((a: any) => a.type === 'INSTANCE');
    
    let compDsAndCs: any = { d: null, c: null };

    // Check if there are dependencies
    if (isArray(dependencies)) {

        // Set up temp array
        let temp: any[] = [];

        // Loop thru dependencies
        dependencies.forEach((d: any) => {

            // Does this dependency belong to a COMPONENT_SET?
            let mainName:   any = d.mainComponent;
                mainName        = mainName.parent;
                mainName        = belongsToComponentSet(mainName) ? mainName.name : d.mainComponent.name;

            // Create dependency object
            const object = { name: d.name, mainName: mainName, mainId: d.mainComponent.id };

            // Check if it exists in temp array and then add if it doesn't
            const duplicate = inArray(object, temp);

            if (!duplicate) { temp.push(object) };

        });

        // Move to compDsAndCs
        compDsAndCs.d = temp;

        // Clean children
        if (isArray(temp) && isArray(children)) {

            // Set up
            compDsAndCs.c = [];

            // Loop thru children
            children.forEach((c: any) => {

                // Set up
                const match: any = temp.filter((a: any) => a.name === c.name);

                if (!isArray(match)) { compDsAndCs.c.push(c) };

            });

        }

    }

    console.log(compDsAndCs)

    //
    return isArray(compDsAndCs.c) ? compDsAndCs : null;

}