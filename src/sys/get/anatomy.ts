// Import
import { getChildren } from "../functions/document"
import { cleanName, isArray } from "../functions/general";

// Get anatomy from selected component/s
export function getAnatomy(baseInstance: any, compAnatomy: any, compProps: any) {

    if (baseInstance) {

        // Get all boolean properties for this component so we can turn them on
        const booleanProps = compProps.filter((a: any) => a.type === 'BOOLEAN');

        if (isArray(booleanProps)) { booleanProps.forEach((b: any) => baseInstance.setProperties({[b.defaultName]: true})) };

        // Get children
        const children: any | any[] = baseInstance.children;

        // Check if there are any children
        if (isArray(children)) {

            let number: number = 0;

            // Loop thru children
            children.forEach((c: any) => {

                // Set up anatomy object
                const child = { name: cleanName(c.name, null), number: number = number +1, id: c.id };

                // Add to compAnatomy
                compAnatomy.push(child);
                
            })

        } else { console.log('No children found.') }

    } else { console.log('No anatomy to get.') };

}