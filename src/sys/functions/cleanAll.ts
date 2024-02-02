// Import

import { isArray } from "./general";

// Clean up everything before the plugin closes
export function cleanAll(selection: any, toBeDocumented: any) {

    // Check selection
    if (isArray(selection)) {

        // Loop thru selection
        selection.forEach((i: any) => {

            const itemsToClean:  any = i.findAllWithCriteria({ pluginData: { keys: ['baseComponent'] } });

            // Check if there is a result
            if (isArray(itemsToClean)) {

                // Loop thru results
                itemsToClean.forEach((c: any) => {

                    c.setPluginData('baseComponent', '');

                });

            }
            

        })


    }

}