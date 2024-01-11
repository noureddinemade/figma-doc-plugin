// Import
import { getStylesFromInstance, resetToDefault } from "../../functions/component";
import { makeInstance } from "../../functions/create";
import { isArray } from "../../functions/general";

// Get styles from component, which includes any variants, children and variant children
export function getStyles(compVariants: any, compDependencies: any) {

    // Set up
    let response: any;

    // Check if there is any variants to get styles from
    if (isArray(compVariants)) {

        response = [];

        compVariants.forEach((p: any) => {

            // Check if there options
            if (isArray(p.options)) {

                // Loop thru options
                p.options.forEach((o: any) => {

                    const def:              any = p.value === o ? '(DEFAULT) ' : '';
                    const variant:          any = makeInstance(`${def}${p.name}=${o}`, [{[p.name]: o}]);
                    const variantStyles:    any = getStylesFromInstance(variant, compDependencies);

                    response.push(variantStyles);

                });

            };

        });

    }
    // Otherwise make a base instance and get styles from that
    else {

        const baseInstance: any = makeInstance('defaultInstance');
        const baseStyles:   any = getStylesFromInstance(baseInstance, compDependencies);

        resetToDefault(baseInstance);
        baseInstance.name = 'defaultInstance';

        response = baseStyles;

    }

    //
    return response;

}