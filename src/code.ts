// Import

import { handleError, isArray, notifyAndClose } from "./sys/functions/general";
import { runPlugin } from "./sys/runPlugin";
import { fonts } from "./sys/data/fonts";

// Get the user current selection
const selection: any = figma.currentPage.selection;

// Check if the user has selected anything and that if what they selected is a component
if (isArray(selection)) {

    console.log(selection[0]);

    // Load fonts
    if (isArray(fonts)) { for (const f of fonts) { await figma.loadFontAsync(f) } };

    // Run the plugin
    try { runPlugin(selection); notifyAndClose('All done baby!'); }

    // Catch any errors, log in the console and close plugin
    catch(error: any) { handleError('😢😢 Something went wrong', error) }

}

// If nothing is selected close the plugin
else { notifyAndClose('"If nothing has been selected, how can anything be documented?" - An ancient design system proverb') };