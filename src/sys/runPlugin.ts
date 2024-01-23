// Import
import { getAll } from "./functions/getAll";
import { showAll } from "./functions/showAll";

// Run the plugin
export function runPlugin(selection: any) {

    // Get what's needed from what has been selected
    const toBeDocumented: any[] = getAll(selection);

    // Document everything that was gathered
    const doneDocument: any = showAll(toBeDocumented);

    // Go to documentation
    figma.viewport.scrollAndZoomIntoView([doneDocument]);

    // Clean up custom data, return names to normal etc.

}