// Import
import { getBaseStyles } from "../../functions/component";
import { isArray } from "../../functions/general";

// Get styles from component, which includes any variants, children and variant children
export function getStyles(component: any) {

    // Set up
    let response: any[] | null = null;

    // Check if there is anything to get styles from
    if (component) {

        // Set up
        response = [];

        // Get default styles
        const baseStyles = getBaseStyles();

        console.log(baseStyles);

    }

    //
    return response;

}