// Imports
import { showInformation } from "./functions/show/information";
import { showProperties } from "./functions/show/properties";
import { showStyles } from "./functions/show/styles";
import { create } from "./functions/create";
import { isArray } from "./functions/general";
import { mainFrame, compFrame, compTitle } from "./helpers/styles";
import { showAnatomy } from "./functions/show/anatomy";

// Document function
export function showAll(array: any[]) {

    if (isArray(array)) {

        // Create main frame (lol)
        const document: any = create('documentation', mainFrame, null, 'frame');

        array.forEach(i => {

            // Set up
            const compWrap: any     = create(`component: ${i.name}`, compFrame, null, 'frame');
            const compHead: any     = create('component-title', compTitle, `component: ${i.name}`, 'text');

            // Append
            compWrap.appendChild(compHead);

            // Show documentation info and links if available
            showInformation(i, compWrap);

            // Show properties
            showProperties(i, compWrap);

            // Show anatomy
            showAnatomy(i, compWrap);

            // Show styles
            showStyles(i, compWrap);

            // Append
            document.appendChild(compWrap);
            compWrap.layoutSizingHorizontal = 'FILL';

        })

        // Go to documentation
        figma.viewport.scrollAndZoomIntoView([document]);

        console.log('--------------');
        console.log('Finished documenting selected components.');
        console.log('--------------');


    } else { console.clear(); figma.closePlugin(`There's nothing to document!`); }

}