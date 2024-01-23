// Import
import { setBaseComp } from "./component";
import { getAnatomy } from "./get/anatomy";
import { getDependenciesAndChildren } from "./get/depsAndChilds";
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

            // Set up base component
            setBaseComp(c);

            // Get component information
            const compInfo: any = getInfo(c);

            // Get component dependencies
            const compDandC:        any = getDependenciesAndChildren(c);
            const compDependencies: any = compDandC.d;
            const compChildren:     any = compDandC.c;

            // Get component properties
            const compProps: any = getProps(c, compChildren);

            // Get component anatomy
            const compAnatomy: any = getAnatomy(compProps, compChildren);

            // Get component style
            const compStyles: any = getStyles(compProps.variant, compDependencies);

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

    console.log(response);

    //
    return response;

}