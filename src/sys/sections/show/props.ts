// Import
import { frame, iconVector, text } from "../../data/styles";
import { make, makeSection } from "../../functions/create";
import { cleanString, isArray, sortArray } from "../../functions/general";

// Show all the component information like id, description and link
export function showProps(props: any, appendTo: any) {

    // Set up
    let section: any | null = null;
    let content: any | null = null;
    let options: any | null = null;

    // Check if there is component information
    if (isArray(props)) {

        sortArray(props, 'order');

        section = makeSection('Properties');
        content = make('content', frame.v.md, 'frame');

        // Loop thru properties
        props.forEach((p: any, key: number) => {

            // Create property frame
            let pFrame: any;

            if (key+1 >= props.length)  { pFrame = make('property', frame.property.last, 'frame') }
            else                        { pFrame = make('property', frame.property.reg, 'frame') };

            // Create property header frame
            const ptFrame = make('header', frame.h.sm, 'frame');

            // Create icon, rescale it and append it
            const iconFrame  = make('icon', frame.icon, 'frame');
            const optionIcon = make('icon', iconVector[p.type], 'vector');
            
            optionIcon.rescale(.5);
            
            iconFrame.appendChild(optionIcon)
            ptFrame.appendChild(iconFrame);

            // Clean property label, create it then append it
            let pLabel = cleanString(p.name, 'property');
                pLabel = make('label', text.title.prop, 'text', pLabel);

            ptFrame.appendChild(pLabel);

            // Append property header frame
            pFrame.appendChild(ptFrame);
            ptFrame.layoutSizingHorizontal = 'FILL';

            // Check if there are any options for this property
            if (isArray(p.options)) {

                // Create options frame
                options = make('options', frame.options, 'frame');

                // Loop thru options
                p.options.forEach((o: any) => {

                    // Create frame and label
                    const frameProps    = o === p.value ? frame.default : frame.value; 
                    const optionFrame   = make('option', frameProps, 'frame');
                    const optionLabel   = make('label', text.label.value, 'text', o);

                    // Append
                    optionFrame.appendChild(optionLabel);
                    options.appendChild(optionFrame);

                });

                // Append
                pFrame.appendChild(options)

            }

            // Check if property is a dependency
            if (p.type === 'INSTANCE_SWAP') {

                // Find component it's dependend on
                let dependName: any = figma.getNodeById(p.value);
                    dependName      = dependName.name
                
                // Create frame and label
                const depFrame = make('dependency', frame.dependency, 'frame');
                const depLabel = make('label', text.label.value, 'text', `depends on component: ${dependName}`);

                // Append
                depFrame.appendChild(depLabel);
                pFrame.appendChild(depFrame);

            }

            // Create type frame, label it then append it
            const tFrame = make('type', frame.type, 'frame');
            const tLabel = make('label', text.label.value, 'text', p.type);
            
            tFrame.appendChild(tLabel);
            pFrame.appendChild(tFrame);

            // Append
            content.appendChild(pFrame);
            pFrame.layoutSizingHorizontal = 'FILL';

        });

    }

    // Append to component frame if available
    if (section && appendTo) {

        section.appendChild(content);
        appendTo.appendChild(section);
        content.layoutSizingHorizontal = 'FILL';
        section.layoutSizingHorizontal = 'FILL';

    }

}