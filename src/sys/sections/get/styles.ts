// Import
import { styleAreas, styles } from "../../data/arrays";
import { getStylesFromInstance, resetToDefault } from "../../functions/component";
import { makeInstance } from "../../functions/create";
import { isArray } from "../../functions/general";

// Get styles from component, which includes any variants, children and variant children
export function getStyles(compVariants: any, compDependencies: any) {

    // Set up base instance
    const baseInstance:         any = makeInstance('defaultInstance');
    
    // Reset defaults for base instance
    resetToDefault(baseInstance);
    baseInstance.name = 'defaultInstance';

    // Set up base styles
    const baseStyles:           any = getStylesFromInstance(baseInstance, compDependencies, true);
    const baseChildrenStyles:   any = baseStyles.filter((a: any) => a.parent);
    
    let baseParentStyles: any   = baseStyles.filter((a: any) => !a.parent);
        baseParentStyles        = baseParentStyles[0];
    
    
    // Set up response
    let response:           any = { default: baseStyles, variantProps: false, shared: false };

    // Reset defaults for base instance
    resetToDefault(baseInstance);
    baseInstance.name = 'defaultInstance';

    // Check if there is any variants to get styles from
    if (isArray(compVariants)) {

        // Set up
        response.variantProps   = [];
        response.shared         = [];

        styleAreas.forEach((sa: any) => { response.shared = [...response.shared, ...styles[sa]] });

        response.shared = { top: response.shared, children: response.shared };

        // Loop thru variants
        compVariants.forEach((i: any) => {

            // Set up
            let property: any = { name: i.name, variants: [], unique: [] };

            // Check if there are variants for this property
            if (isArray(i.options)) {

                // Loop thru options
                i.options.forEach((o: any) => {

                    // Set up
                    let isItTheDefault:         any = i.value === o ? true : false;
                    let variantInstance:        any = makeInstance(o, [{[i.name]: o}]);
                    let variantStyles:          any = getStylesFromInstance(variantInstance, compDependencies, isItTheDefault, baseStyles);
                    let variantChildrenStyles:  any = variantStyles.filter((a: any) => a.parent);
                    let variant:                any = variantStyles.filter((a: any) => !a.parent);
                        variant                     = variant[0];
                        variant.children            = variantChildrenStyles;

                    // Push to property
                    property.variants.push(variant);

                });

            };

            // Add to response
            response.variantProps.push(property);

            // Set uniques and shared for property
            if (isArray(property.variants)) {

                // Loop thru variants
                property.variants.forEach((p: any) => {

                    // Check if styles exist and that this is not the default item
                    if (isArray(p.styles) && !p.default) {

                        // Loop thru top styles
                        p.styles.forEach((s: any) => {

                            if (!property.unique.includes(s.name)) { property.unique.push(s.name) };

                            response.shared.top = response.shared.top.filter((a: any) => a !== s.name);

                        });

                        // Check if there are children
                        if (isArray(p.children)) {

                            // Loop thru children
                            p.children.forEach((c: any) => {

                                console.log(c);

                            });

                        };

                    }

                });

                // Clean default styles
                if (isArray(property.unique)) {

                    // Set up
                    const newStyles: any = [];

                    // Find default variant
                    let defVariant: any = property.variants.filter((a: any) => a.default);
                        defVariant      = defVariant[0];

                    // Loop thru uniques
                    property.unique.forEach((u: any) => {

                        let match: any  = defVariant.styles.filter((a: any) => a.name === u);
                            match       = match[0];

                        if (match) { newStyles.push(match) };

                    });

                    // Replace
                    defVariant.styles = newStyles;

                };

            }

        });

    };

    //
    return response;

}