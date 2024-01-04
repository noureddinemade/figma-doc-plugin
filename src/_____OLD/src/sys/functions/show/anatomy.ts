// Import
import { create, createSection } from "../create";
import { isArray } from "../general";
import { mdVFrame } from "../../helpers/styles";

// Show anatomy of selected component/s
export function showAnatomy(i: any, compWrap: any) {

    if (isArray(i.anatomy)) {

        // Create section
        const section:  any = createSection('Anatomy');
        const inner:    any = create('content', mdVFrame, null, 'frame');

        // Loop thru anatomy and document
        i.anatomy.forEach((a: any) => {

            console.log(a);

        });

        // Append
        section.appendChild(inner);
        compWrap.appendChild(section);
        inner.layoutSizingHorizontal = 'FILL';
        section.layoutSizingHorizontal = 'FILL';

    } else { console.log('No anatomy to display.') };

}