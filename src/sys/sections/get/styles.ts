// Import
import { getStylesFromInstance, resetToDefault } from "../../functions/component";
import { makeInstance } from "../../functions/create";
import { isArray } from "../../functions/general";

// Get styles from component, which includes any variants, children and variant children
export function getStyles(compVariants: any, compDependencies: any) {

    // Set up
    let response: any = [];

    // Check if there is any variants to get styles from
    if (isArray(compVariants)) {

        // Loop thru variant properties
        compVariants.forEach((p: any) => {

            // Set up
            let toCompare: any = { defaults: [], variants: [] };

            // Check if there options
            if (isArray(p.options)) {

                // Loop thru options
                p.options.forEach((o: any) => {

                    const def:              any = p.value === o ? true : false;
                    const variant:          any = makeInstance(`${p.name}=${o}`, [{[p.name]: o}]);
                    const variantStyles:    any = getStylesFromInstance(variant, compDependencies, def);

                    // Check where to add styles to
                    def
                    ? toCompare.defaults = [...toCompare.defaults, ...variantStyles] 
                    : toCompare.variants = [...toCompare.variants, ...variantStyles]

                });

            };

            // Compare styles for each variant property
            if (isArray(toCompare.defaults) && isArray(toCompare.variants)) {

                // Sort and filter
                let defaults:           any = toCompare.defaults;
                let defaultsParent:     any = defaults.filter((a: any) => !a.parent);
                    defaultsParent          = defaultsParent[0].styles;
                let defaultsChilds:     any = defaults.filter((a: any) => a.parent);
                let variants:           any = toCompare.variants;
                let variantsParent:     any = variants.filter((a: any) => !a.parent);
                let variantsChilds:     any = variants.filter((a: any) => a.parent);

                // Compare default parent with variants parent
                if (isArray(variantsParent)) {

                    // Loop thru variants parent
                    variantsParent.forEach((p: any) => {

                        // Check if styles exist
                        if (isArray(p.styles)) {

                            let styles: any = { property: p.name, static: [], changes: [] };

                            p.styles.forEach((s: any) => {

                                // Match with parent
                                let match: any  = defaultsParent.filter((a: any) => a.name === s.name);
                                    match       = match[0];
                                    match       = JSON.stringify(match) === JSON.stringify(s);

                                if (!match) { styles.changes.push(s.name) }
                                else        { styles.static.push(s.name) };

                            });

                            console.log(styles);

                        };

                    });

                };

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