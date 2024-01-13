// Import
import { frame, text } from "../data/styles";
import { make } from "../functions/create";
import { isArray } from "../functions/general";
import { showAnatomy } from "./show/anatomy";
import { showInfo } from "./show/info";
import { showProps } from "./show/props";

// Get everything required for documentation from a component
export function showAll(toBeDocumented: any[]) {

    // Set up
    let document: any | null = null;

    // Check if there is anything to document
    if (isArray(toBeDocumented)) {

        // Set up the main frame (lol) for documentation
        document = make('Documentation', frame.main, 'frame');

        // Loop thru each item to document
        toBeDocumented.forEach((i: any) => {

            // console.log(i);

            // Prep component
            const info:     any = i.information;
            const props:    any = i.properties;
            const anatomy:  any = i.anatomy;
            const styles:   any = i.styles;
            const deps:     any = i.dependencies;

            let name:   any = info.name;

            // Create component frame & title
            const cFrame:       any = make(`component`, frame.comp, 'frame');
            const cTitle:       any = make('label', text.title.comp, 'text', name);

            // Add title to component and component to main frame (lol)
            cFrame.appendChild(cTitle);

            // Show component information
            showInfo(info, cFrame);

            // Show component properties
            showProps(props, cFrame);

            // Show component anatomy
            showAnatomy(anatomy, cFrame);

            // Show component styles

            // Show component dependencies

            // Append to document
            document.appendChild(cFrame);
            cFrame.layoutSizingHorizontal = 'HUG';

        });

        //
        document.layoutSizingHorizontal = 'HUG';

    }

    //
    return document;

}