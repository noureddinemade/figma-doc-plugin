// Import
import { getChildren, getAllStyles, getSharedAndUnique, removeDuplicates, cleanAllStyles, compareStyles } from "../document";
import { isArray, linkToChildren, sortArray } from "../general";

// Get styles from selected component/s
export function getStyles(compInstances: any, compProps: any, baseComp: any, compStyles: any) {

    // Set up
    let response:   any | null  = null;
    let tempArray:  any         = [];

    // If component has properties that affect the component
    if (isArray(compProps) && isArray(compInstances)) {

        // Set up
        response = [];

        // Loop thru component instances
        compInstances.forEach((p: any) => {

            // Create temp frame and add instance to it
            const tempFrame = figma.createFrame();
            tempFrame.appendChild(p);

            // Check instance name
            let name = p.name.includes('=') ? p.name.split('=') : p.name;
                name = isArray(name) ? name[0] : name;

            // Get instance children
            const children: any = getChildren(tempFrame);

            // Move instances and Remove temp frame
            figma.currentPage.appendChild(p);
            tempFrame.remove();

            // Match with comp props unless they are a dependency
            const matchedProps = compProps.filter((a: any) => { return a.name === name && a.type !== 'DEPENDENCY' });
            
            // Find linked children
            const linkedChildren: any = linkToChildren(matchedProps, children);

            // Check if there are any linked children
            if (isArray(linkedChildren)) {

                // Loop thru linked children
                linkedChildren.forEach((c: any) => {

                    const styles = getAllStyles(c);
                    tempArray.push({name: c.name, styles: styles, match: name});

                })

            }

        });

        // Check if temp array is suitable
        if (isArray(tempArray)) {

            // Loop thru temp array
            tempArray.forEach((i: any) => {

                // Check name
                let name = i.name.includes('=') ? i.name.split('=') : i.name;
                    name = isArray(name) ? name[0] : name;

                // Find matches
                const matches = tempArray.filter((a: any) => a.match === name);

                // Check if there is more than 1 match
                if (isArray(matches, 1)) {

                    let cleaned = compareStyles(matches);
                    let shared  = removeDuplicates(cleaned.shared);
                    let unique  = removeDuplicates(cleaned.unique);

                    response.push({ name: i.name, styles: {shared, unique} });

                } else { response.push({name: i.name, styles: {shared: i.styles}}) };

            });

        }

        // Clean up response
        if (isArray(response)) {

            // console.log(response);

            let toClean: any = { shared: [], unique: [] };
            let cleaned: any = { shared: [], unique: [] };

            // Loop thru response and add to toClean array
            response.forEach((i: any) => {

                const styles = i.styles;

                // Check if shared styles exist
                if (isArray(styles.shared)) {

                    // Loop thru shared styles
                    styles.shared.forEach((s: any) => { toClean.shared.push(s) });
                
                }

                // Check if shared styles exist
                if (isArray(styles.unique)) {

                    // Loop thru shared styles
                    styles.unique.forEach((s: any) => { toClean.unique.push(s) });
                
                }

            });

            // Remove duplicates
            cleaned.shared = removeDuplicates(toClean.shared, 'item');
            cleaned.unique = removeDuplicates(toClean.unique, 'item');

            // Clean response
            response = cleaned;

        }

    }

    // If it's a basic component that doesn't have properties
    else if (isArray(baseComp)) {

        // Set up
        response = [];

    } 
    
    // No styles
    else { console.log('No styles to get') };

    // if (isArray(compInstances)){

    //     // Set up
    //     let styles:         any | null  = { shared: { top: [], all: [] }, unique: { top: [], all: [] } };
    //     let shared:         any | null  = styles.shared ? styles.shared : null;
    //     let unique:         any | null  = styles.unique ? styles.unique : null;

    //     // Get dependencies list
    //     const dependencies: any = compProps.filter((a: { type: string; }) => a.type === 'DEPENDENCY');

    //     const baseChildren: any  = getChildren(baseComp, null);
    //     const baseStyles:   any  = getAllStyles(baseComp);

    //     // Sort instances by alphabetical order
    //     sortArray(compInstances, 'name');

    //     // Loop thru instances
    //     compInstances.forEach((i: { name: any; }) => {

    //         const anyDependencies = dependencies.filter((a: { name: any; }) => a.name === i.name);

    //         if (!isArray(anyDependencies)) {

    //             // Set up
    //             const instChildren: any  = getChildren(i, null);
    //             const instStyles:   any  = getAllStyles(i);

    //             // Compare instance frame styles with base frame styles
    //             const topStyles = getSharedAndUnique(instStyles, baseStyles)

    //             // Add styles to 
    //             shared.top.push(topStyles.shared);
    //             unique.top.push(topStyles.unique);

    //             // Compare instance children styles with base children styles
    //             if (isArray(instChildren)) {

    //                 instChildren?.forEach((c: { name: any; }) => {

    //                     let baseChild               = baseChildren.filter((a: { name: any; }) => a.name === c.name);
    //                     let baseChildStyle          = getAllStyles(baseChild[0]);
    //                     let childStyle              = getAllStyles(c);
    //                     let childSharedAndUnique    = getSharedAndUnique(childStyle, baseChildStyle);

    //                     if (childSharedAndUnique) { shared.all.push(childSharedAndUnique.shared) }
    //                     if (childSharedAndUnique) { unique.all.push(childSharedAndUnique.unique) }

    //                 })


    //             }

    //         }

    //     })

    //     // Clean styles and add to compStyles
    //     if (isArray(shared.top)) { compStyles.shared.top = (removeDuplicates(shared.top)) };
    //     if (isArray(shared.all)) { compStyles.shared.all = (cleanAllStyles(shared.all, dependencies)) };
    //     if (isArray(unique.top)) { compStyles.unique.top = (unique.top.filter((item: string | any[]) => item.length > 0 )) };
    //     if (isArray(unique.all)) { compStyles.unique.all = (unique.all.filter((item: string | any[]) => item.length > 0 )) };
        
    // } else { console.log('No styles to get.') };

    console.log(response);
    // Return response
    return response;

}