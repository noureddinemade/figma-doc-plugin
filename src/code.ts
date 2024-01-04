// Import

import { handleError, isArray, notifyAndClose } from "./sys/functions/general";
import { runPlugin } from "./sys/runPlugin";
import { fonts } from "./sys/data/fonts";

// Get the user current selection
const selection: any = figma.currentPage.selection;

// Check if the user has selected anything and that if what they selected is a component
if (isArray(selection)) {

    // Load fonts
    if (isArray(fonts)) { for (const f of fonts) { await figma.loadFontAsync(f) } };

    // Run the plugin
    try { runPlugin(selection) }

    // Catch any errors, log in the console and close plugin
    catch(error: any) { handleError('😢😢 Something went wrong', error) }

    // Close plugin and clear console once all is done
    finally { notifyAndClose('All done baby!') }

}

// If nothing is selected close the plugin
else { notifyAndClose('"If nothing has been selected, how can anything be documented?" - An ancient design system proverb') };