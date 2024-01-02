// Import
import { defineHierarchy, getChildren } from "../document"
import { cleanName, isArray, isDependent } from "../general";

// Get anatomy from selected component/s
export function getAnatomy(baseInstance: any, compAnatomy: any, compProps: any) {

    if (baseInstance) {

        // Get all boolean properties for this component so we can turn them on
        const booleanProps = compProps.filter((a: any) => a.type === 'BOOLEAN');

        // Get all dependency properties for this component
        const dependProps = compProps.filter((a: any) => a.type === 'DEPENDENCY');

        if (isArray(booleanProps)) { booleanProps.forEach((b: any) => baseInstance.setProperties({[b.defaultName]: true})) };

        // Get children
        const children: any | any[] = baseInstance.findAll();

        // Check if there are any children
        if (isArray(children)) {

            let number: number = 0;

            // Loop thru children
            children.forEach((c: any) => {

                // Set up 
                let dependency: boolean = false;
                let name:       any     = cleanName(c.name, null);
                let heirachy:   any     = defineHierarchy(c, 0);

                // Check if this child is a dependency or not
                let response = isDependent(c, dependProps);

                if (response) { dependency = true };

                if (response && heirachy < 2 || !response) {

                    // Set up anatomy object
                    const child = { name: name, number: number = number +1, id: c.id, dependency: dependency };

                    // Add to compAnatomy
                    compAnatomy.push(child);

                }
                
            });

        } else { console.log('No children found.') }

    } else { console.log('No anatomy to get.') };

}