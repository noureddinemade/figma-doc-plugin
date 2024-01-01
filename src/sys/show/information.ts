import { createSection, create } from "../functions/create";
import { sectionCopy, sectionLink } from "../helpers/styles";

export function showInformation(i: any, compWrap: any) {

    // Display documentation info and links if available
    if (i.documentation) {

        // Create section
        const section: any = createSection('Information');

        // Display info
        if (i.documentation.description) {

            const desc = create('component-description', sectionCopy, i.documentation.description, 'text');
            section.appendChild(desc);

        }

        // Display link
        if (i.documentation.link) {

            const link : any = create('component-description', sectionLink, i.documentation.link, 'text');
            link.hyperlink = {type: 'URL', value: i.documentation.link};
            section.appendChild(link);

        }

        // Append
        compWrap.appendChild(section);
        section.layoutSizingHorizontal = 'FILL';

    } else { console.log('No information to display.') };

}