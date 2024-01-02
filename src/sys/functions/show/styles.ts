// Import

import { create, createSection } from "../create";
import { isArray } from "../general";
import { styleAreas } from "../../helpers/arrays";
import { mdVFrame } from "../../helpers/styles";

// Show all styles related to component
export function showStyles(i: any, compWrap: any) {

    if (i.styles) {

        // Loop thru stylea areas and add to 
        styleAreas.forEach((s: any) => {

            // Set up 
            let relatedStyles: any = { shared: { top: [], all: [] }, unique: { top: [], all: [] } };

            // Find related styles
            let shared: any = i.styles.shared;
                shared      = { 
                    top: isArray(shared.top) ? shared.top.filter((a: any) => a.style.category === s) : null, 
                    all: isArray(shared.all) ? shared.all.filter((a: any) => a.style.category === s) : null 
                }
                relatedStyles.shared.top = shared.top;
                relatedStyles.shared.all = shared.all;

            let unique: any = i.styles.unique;

            unique.top.forEach((t: any) => {

                const styleUnique = t.filter((a: any) => a.style.category === s);

                if (isArray(styleUnique)) { styleUnique.forEach((s1: any) => relatedStyles.unique.top.push(s1)) };

            });

            unique.all.forEach((t: any) => {

                const styleUnique = t.filter((a: any) => a.style.category === s);

                if (isArray(styleUnique)) { styleUnique.forEach((s1: any) => relatedStyles.unique.all.push(s1)) };

            });

            // Loop thru related styles
            // Check if there are any related top styles
            if (isArray(relatedStyles.shared.top)) {

                // Loop thru related top styles
                relatedStyles.shared.top.forEach((rs: any) => {

                    // console.log(rs);

                })

            } else { 
                
                // console.log(`No related top shared styles found for ${s}.`) 
            
            };

            // Create a section for each style area
            const section:  any = createSection(s);
            const inner:    any = create('content', mdVFrame, null, 'frame');

            // Append
            section.appendChild(inner);
            compWrap.appendChild(section);
            inner.layoutSizingHorizontal = 'FILL';
            section.layoutSizingHorizontal = 'FILL';

        })

    } else { console.log('No styles to show.') };

}