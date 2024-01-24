// Import
import { anyChildren, belongsToComponentSet, belongsToInstance } from "../component";
import { inArray, isArray } from "../general";

// Get any dependencies from the component
export function getDependenciesAndChildren(component: any) {

    // Set up
    const children:     any = anyChildren(component);
    const dependencies: any = children.filter((a: any) => a.type === 'INSTANCE');
    
    let compDsAndCs: any = { d: null, c: null };
    let temp: any[] = [];

    // Check if there are dependencies
    if (isArray(dependencies)) {

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

    }

    // Clean children
    if (isArray(children)) {

        // Set up
        compDsAndCs.c = [];

        // Loop thru children
        children.forEach((c: any) => {

            // Set up
            let match:  any = isArray(temp) ? temp.filter((a: any) => a.name === c.name) : null;
                match       = isArray(match) ? true : belongsToInstance(c, temp);

            if (!match) { compDsAndCs.c.push(c) };

        });

    }

    //
    return isArray(compDsAndCs.c) ? compDsAndCs : null;

}