// Import
import { getChildren, getAllStyles, getSharedAndUnique, removeDuplicates, cleanAllStyles } from "../document";
import { isArray, sortArray } from "../general";

// Get styles from selected component/s
export function getStyles(compInstances: any, compProps: any, baseComp: any, compStyles: any) {

    if (isArray(compInstances)){

        // Set up
        let styles:         any | null  = { shared: { top: [], all: [] }, unique: { top: [], all: [] } };
        let shared:         any | null  = styles.shared ? styles.shared : null;
        let unique:         any | null  = styles.unique ? styles.unique : null;

        // Get dependencies list
        const dependencies: any = compProps.filter((a: { type: string; }) => a.type === 'DEPENDENCY');

        const baseChildren: any  = getChildren(baseComp, null);
        const baseStyles:   any  = getAllStyles(baseComp);

        // Sort instances by alphabetical order
        sortArray(compInstances, 'name');

        // Loop thru instances
        compInstances.forEach((i: { name: any; }) => {

            const anyDependencies = dependencies.filter((a: { name: any; }) => a.name === i.name);

            if (!isArray(anyDependencies)) {

                // Set up
                const instChildren: any  = getChildren(i, null);
                const instStyles:   any  = getAllStyles(i);

                // Compare instance frame styles with base frame styles
                const topStyles = getSharedAndUnique(instStyles, baseStyles)

                // Add styles to 
                shared.top.push(topStyles.shared);
                unique.top.push(topStyles.unique);

                // Compare instance children styles with base children styles
                if (isArray(instChildren)) {

                    instChildren?.forEach((c: { name: any; }) => {

                        let baseChild               = baseChildren.filter((a: { name: any; }) => a.name === c.name);
                        let baseChildStyle          = getAllStyles(baseChild[0]);
                        let childStyle              = getAllStyles(c);
                        let childSharedAndUnique    = getSharedAndUnique(childStyle, baseChildStyle);

                        if (childSharedAndUnique) { shared.all.push(childSharedAndUnique.shared) }
                        if (childSharedAndUnique) { unique.all.push(childSharedAndUnique.unique) }

                    })


                }

            }

        })

        // Clean styles and add to compStyles
        if (isArray(shared.top)) { compStyles.shared.top = (removeDuplicates(shared.top)) };
        if (isArray(shared.all)) { compStyles.shared.all = (cleanAllStyles(shared.all, dependencies)) };
        if (isArray(unique.top)) { compStyles.unique.top = (unique.top.filter((item: string | any[]) => item.length > 0 )) };
        if (isArray(unique.all)) { compStyles.unique.all = (unique.all.filter((item: string | any[]) => item.length > 0 )) };
        
    } else { console.log('No styles to get.') };

}