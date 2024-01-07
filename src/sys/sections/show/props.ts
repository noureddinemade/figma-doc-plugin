// Import
import { frame, iconVector, text } from "../../data/styles";
import { make, makeItem, makeOptions, makeSection } from "../../functions/create";
import { cleanString, isArray, sortArray } from "../../functions/general";

// Show all the component information like id, description and link
export function showProps(props: any, appendTo: any) {

    // Set up
    let section:    any | null = null;
    let content:    any | null = null;

    // Type checks
    props.text
    props.boolean
    props.variant
    props.instance

    // Check if there is component information
    if (props) {

        section = makeSection('Properties');
        content = make('content', frame.v.md, 'frame');

        // Loop thru properties of each section
        if (isArray(props.text)) {

            const item      = makeItem('Text', props.text);

            content.appendChild(item);
            item.layoutSizingHorizontal = 'FILL';

        }

        // props.forEach((p: any, key: number) => {

        //     // Set up
        //     let pLabel:     any     = cleanString(p.name, 'property');
        //     let last:       boolean = false;
        //     let depends:    any     = null;

        //     // Create property items
        //     const propLabel:    any = make('label', text.section.copy, 'text', pLabel);
        //     const typeLabel:    any = make('label', text.label.type, 'text', `${p.type}`);
        //     const propIcon:     any = make('icon', iconVector[p.type], 'vector');
            
        //     if (key+1 >= props.length)      { last = true };
        //     if (p.type === 'INSTANCE_SWAP') { depends = figma.getNodeById(p.value); depends =  depends.name };

        //     // Create item
        //     const propFrame = makeItem(propLabel, propIcon, typeLabel, p.options, depends, last, p.value);
            
        //     if (propFrame) {

        //         content.appendChild(propFrame);
        //         propFrame.layoutSizingHorizontal = 'FILL';
            
        //     }

        // });

    }

    // Append to component frame if available
    if (section && appendTo) {

        section.appendChild(content);
        appendTo.appendChild(section);
        content.layoutSizingHorizontal = 'FILL';
        section.layoutSizingHorizontal = 'FILL';

    }

}