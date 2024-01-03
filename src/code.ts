// Import

import { isArray, notifyAndClose } from "./functions/general";

// Get the user current selection
const selection:    any = figma.currentPage.selection;
const toDocument:   any = [];

// Check if the user has selected anything and that if what they selected is a component
if (isArray(selection)) {

    console.log(selection);

    try {

        selection[0].filter(a => a.dog === found.dog);

        // 1. Loop thru everything the user has selected

        // 2. Get all required from component and add each to a component object

        // 3. Get basic info
            // name, id, description, link etc.

        // 4. Get properties
        
            // For variant props, the plugin compares a default with each alternative option by traversing layers and comparing relevant attributes of each layer to find and display differences.
        
            // Boolean props are simplified displays to highlight the property type, default value, and impacted layers marked with a blue highlight. While nearly all boolean props are associated with a single layer in practice, the list of associated layers scales to potentially list two or more.

        // 5. Get dependencies by looping thu main component and checking for instances

        // 6. Get anatomy
            // To produce the anatomy, the plugin traverses the node’s layers to itemize and mark text, instances, and other shapes as elements.

            // Each itemized component is enumerated in the content, with instances highlighting dependency name and relevant prop values and other nodes reflecting visual attributes and styles. In the artwork, markers are placed on the periphery, prioritizing the left edge and finding a location on any edge that hasn’t already been used.

        // 7. Get styles by:
            // 1. Get all the styles of the main component
            // 2. Using the properties array, create an instance of each component property and property options (if available)
            // 3. Compare each value and mark the name of the style proeperty that changes


        // 8. Add object to documentation array

        // 9. Loop thru documentation array

        // 10. Get each component object in array and document it

    }

    catch(error: any) {

        // Print error to console and then close plugin
        console.log('> Error:', error.message);
        console.log('-------------------')
        console.log(error.stack);
        
        console.log('-------------------')
        notifyAndClose('😢😢 Something went wrong');


    }

    finally {

        // Clear console and close plugin
        // console.clear();
        // notifyAndClose('All done baby!');

    }

}

else { notifyAndClose('"If nothing has been selected, how can anything be documented?" - An ancient design system proverb') };