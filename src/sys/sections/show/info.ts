// Import
import { frame, text } from "../../data/styles";
import { make, makeSection } from "../../functions/create";

// Show all the component information like id, description and link
export function showInfo(info: any, appendTo: any) {

    // Set up
    let section: any | null = null;
    let content: any | null = null;

    // Check if there is component information
    if (info && info.description) {

        // Create the information frame and title
        section = makeSection('information');
        content = make('content', frame.v.md, 'frame');

        // Check if description is available
        if (info.description) {

            // Make description
            const description = make('description', text.section.copy, 'text', info.description);

            // Append
            content.appendChild(description);

        }

        // Check if link is available
        if (info.link) {

            // Make link
            const link = make('link', text.section.link, 'text', info.link);

            // Add link
            link.hyperlink = {type: 'URL', value: info.link};

            // Append
            content.appendChild(link);

        }

    }

    // Append to component frame if available
    if (section && appendTo) {

        section.appendChild(content);
        appendTo.appendChild(section);
        content.layoutSizingHorizontal = 'FILL';
        section.layoutSizingHorizontal = 'FILL';

    }

}