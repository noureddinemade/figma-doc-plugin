// Import
import { mainFrame } from "../data/styles";
import { make } from "../functions/create";
import { isArray } from "../functions/general";

// Get everything required for documentation from a component
export function showAll(toBeDocumented: any[]) {

    // Set up
    let document: any | null = null;

    // Check if there is anything to document
    if (isArray(toBeDocumented)) {

        // Set up the main frame (lol) for documentation
        document = make('Documentation', mainFrame, 'frame');

        // Loop thru each item to document
        toBeDocumented.forEach((i: any) => {

            console.log(i);

            // Prep component
            const info:     any = i.information;
            const props:    any = i.properties;
            const anatomy:  any = i.anatomy;
            const styles:   any = i.styles;
            const deps:     any = i.dependencies;

            let name:   any = info.name;
                // name        = 

            // Create component frame & title
            // const compFrame: any = make(`Component: ${i.information.name}`)

            // Show component information

            // Show component properties

            // Show component anatomy

            // Show component styles

            // Show component dependencies

        });

    }

    //
    return document;

}