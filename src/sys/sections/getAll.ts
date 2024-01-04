// Import
import { sortArray } from "../functions/general";
import { getAnatomy } from "./get/anatomy";
import { getChildren } from "./get/children";
import { getDependencies } from "./get/dependencies";
import { getInfo } from "./get/info";
import { getProps } from "./get/props";
import { getStyles } from "./get/styles";

// Get everything required for documentation from a component
export function getAll(selection: any) {

    // Set up
    let response: any[] = [];

    // Loop thru selection and get what is needed from each selected item
    selection.forEach((c: any) => {

        if (c.type === 'COMPONENT' || c.type === 'COMPONENT_SET' ) {

            // Set up
            let baseComp: any;

            if (c.type === 'COMPONENT_SET') { baseComp = c.children[0].createInstance() }
            if (c.type === 'COMPONENT')     { baseComp = c.createInstance()             }

            baseComp.setPluginData('baseComponent', 'true');

            // Get component information
            const compInfo: any = getInfo(c);

            // Get component properties
            const compProps: any = getProps(c);
            sortArray(compProps, 'type');

            // Get component children
            const compChildren: any = getChildren(c);

            // Get component dependencies
            const compDependencies: any = getDependencies(compChildren);

            // Get component anatomy
            const compAnatomy: any = getAnatomy(compProps, compChildren);

            // Get component style
            const compStyles: any = getStyles

            // console.log(compInfo);
            // console.log(compProps);
            // console.log(compChildren);
            // console.log(compDependencies);
            // console.log(compAnatomy);
            // console.log(compStyles);

            // Add each component to response
            response.push({

                information: compInfo,
                properties: compProps,
                children: compChildren,
                dependencies: compDependencies,
                anatomy: compAnatomy,
                styles: compStyles
            
            })

        }

    });

    //
    return response;

}