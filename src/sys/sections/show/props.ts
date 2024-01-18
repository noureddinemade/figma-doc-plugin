// Import
import { frame } from "../../data/styles";
import { make, makeInstance, makeItem, makeSection } from "../../functions/create";
import { isArray } from "../../functions/general";

// Show all the component information like id, description and link
export function showProps(props: any, appendTo: any) {

    // Set up
    let section:    any | null = null;
    let content:    any | null = null;

    // Check if there is component information
    if (props) {

        section     = makeSection('properties');
        content     = make('content', frame.v.md, 'frame');

        // Add each type of property
        // TEXT
        if (isArray(props.text)) {

            const item = makeItem('Text', props.text);

            content.appendChild(item);
            item.layoutSizingHorizontal = 'FILL';

        };
        // BOOLEAN
        if (isArray(props.boolean)) {

            const item = makeItem('Boolean', props.boolean);

            content.appendChild(item);
            item.layoutSizingHorizontal = 'FILL';

        };
        // VARIANT
        if (isArray(props.variant)) {

            const item = makeItem('Variant', props.variant);

            content.appendChild(item);
            item.layoutSizingHorizontal = 'FILL';

        };
        // INSTANCE_SWAP
        if (isArray(props.instance)) {

            const item = makeItem('Instance', props.instance);

            content.appendChild(item);
            item.layoutSizingHorizontal = 'FILL';

        };

    }

    // Append & adjust if available
    if (section && appendTo) {

        section.appendChild(content);
        appendTo.appendChild(section);

        content.layoutSizingHorizontal   = 'FILL';

    }

}