// Import
import { getAll } from "./sections/getAll";
import { showAll } from "./sections/showAll";

// Run the plugin
export function runPlugin(selection: any) {

    // Get what's needed from what has been selected
    const toBeDocumented: any[] = getAll(selection);

    // Document everything that was gathered
    const doneDocument: any = showAll(toBeDocumented)

    // Go to documentation
    // figma.viewport.scrollAndZoomIntoView([doneDocument]);

}