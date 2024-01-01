// Import
import { create, createSection } from "../functions/create";
import { isArray } from "../functions/general";
import { defValueFrame, dependFrame, mdVFrame, propFrame, propTitle, smHFrame, typeFrame, valueFrame, valueLabel, iconVector } from "../helpers/styles";

// Show properties related to component
export function showProperties(i: any, compWrap: any) {

    if (isArray(i.properties)) {

        // Set up dependencies array
        const dependArray: any = [];

        // Create section & inner wrap
        const section:  any = createSection('Properties');
        const inner:    any = create('content', mdVFrame, null, 'frame');

        i.properties.forEach((p: any) => {

            if (p.type === 'DEPENDENCY') { dependArray.push(p) }

            else {

                // Create frame, title and icon for each property
                const frame:    any = create('property', propFrame, null, 'frame');
                const title:    any = create('title', propTitle, p.name, 'text');
                const icon:     any = create('icon', iconVector[p.type], null, 'vector');

                // Resize icon & then append icon & title to frame
                icon.rescale(.5);
                frame.appendChild(icon);
                frame.appendChild(title);
                title.layoutSizingHorizontal = 'FILL';

                // Display options for this property IF they exist
                if (isArray(p.options)) {

                    // Create frame for options
                    const oFrame: any = create('options', smHFrame, null, 'frame');

                    p.options.forEach((o: any) => {

                        // Create frame & label for each option
                        let bg:     any;
                        let text:   any;

                        o === p.defaultValue ? bg = defValueFrame : bg = valueFrame;
                        o === true || o === false ? text = String(o) : text = o;

                        const option    = create('option', bg, null, 'frame');
                        const label     = create('label', valueLabel, text, 'text');

                        // Append option to options
                        option.appendChild(label);
                        oFrame.appendChild(option);

                    });

                    // Append frame to property
                    frame.appendChild(oFrame);

                };


                // Display type for this proerty
                if (p.type) {

                    // Create frame and label for type
                    const tFrame = create('type', typeFrame, null, 'frame');
                    const tlabel = create('label', valueLabel, p.type, 'text');

                    // Append type label to type frame
                    tFrame.appendChild(tlabel);
                    frame.appendChild(tFrame);

                };

                // Append frame to section
                inner.appendChild(frame);
                frame.layoutSizingHorizontal = 'FILL';

            };

        });

        // Display dependencies if available
        if (isArray(dependArray)) {

            dependArray.forEach((d: any) => {

                // Create frame & title for each dependency
                const frame:    any = create('property', propFrame, null, 'frame');
                const title:    any = create('title', propTitle, d.name, 'text');
                const icon:     any = create('icon', iconVector[d.type], null, 'vector');

                // Resize icon & then append icon & title to frame
                icon.rescale(.5);
                frame.appendChild(icon);
                frame.appendChild(title);
                title.layoutSizingHorizontal = 'FILL';

                // Display type for this proerty
                if (d.type) {

                    // Create frame and label for type
                    const tFrame = create('type', dependFrame, null, 'frame');
                    const tlabel = create('label', valueLabel, d.type, 'text');

                    // Append type label to type frame
                    tFrame.appendChild(tlabel);
                    frame.appendChild(tFrame);

                };

                // Append frame to section
                inner.appendChild(frame);
                frame.layoutSizingHorizontal = 'FILL';

            });

        };

        // Append
        section.appendChild(inner);
        compWrap.appendChild(section);
        inner.layoutSizingHorizontal = 'FILL';
        section.layoutSizingHorizontal = 'FILL';

    } else { console.log('No properties to show.') };

}