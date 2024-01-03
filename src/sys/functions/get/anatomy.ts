// Import
import { defineHierarchy, getChildren } from "../document"
import { cleanName, isArray, isDependent } from "../general";

// Get anatomy from selected component/s
export function getAnatomy(baseInstance: any, compAnatomy: any, compProps: any) {

    if (baseInstance && isArray(compProps)) {

        // Get all boolean properties for this component so we can turn them on
        const booleanProps = compProps.filter((a: any) => a.type === 'BOOLEAN');

        // Get all dependency properties for this component
        const dependProps = compProps.filter((a: any) => a.type === 'DEPENDENCY');

        if (isArray(booleanProps)) { booleanProps.forEach((b: any) => baseInstance.setProperties({[b.defaultName]: true})) };

        // Get children
        const children: any | any[] = baseInstance.findAll();

        // Check if there are any children
        if (isArray(children)) {

            let number:     number  = 0;
            let tempList:   any[]   = [];

            // Loop thru children
            children.forEach((c: any) => {

                // Set up
                let dependency: boolean     = false;
                let name:       any         = cleanName(c.name, null);
                let child:      any | null  = null;

                // Check if this child is a dependency or not
                let response = isDependent(c, dependProps);

                if (response) {
                    
                    const b = c.getPluginData('isDependent');

                    dependency = true;

                    // Check if linked node already exists in the linkedNodes array
                    const exists = tempList.filter((a: any) => a === b);

                    if (!isArray(exists)) { 
                        
                        tempList.push(b);

                        // Set up anatomy object
                        child = { name: name, number: number = number +1, id: c.id, dependency: dependency };
                    
                    };
                
                } else { 
                    
                    // Set up anatomy object
                    child = { name: name, number: number = number +1, id: c.id, dependency: dependency }; 
                
                }

                // Add to compAnatomy
                if (child) { compAnatomy.push(child) }
                
            });

        } else { console.log('No children found.') }

    } else { console.log('No anatomy to get.') };

}