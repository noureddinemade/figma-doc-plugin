// Import
import { frame, text } from "../../data/styles";
import { make, makeInstance, makeItem, makeSection } from "../../functions/create";
import { isArray } from "../../functions/general";

// Show all the component styles for each variant and child
export function showStyles(styles: any, appendTo: any) {

    // Set up
    let section:    any | null = null;
    let content:    any | null = null;

    // Check if there is component information
    if (styles) {

        // Set up
        const shared:           any = { p: styles.shared.parent, c: styles.shared.child}
        const def:              any = styles.default;
        const defChildren:      any = def.filter((a: any) => a.parent);

        let defParent:  any = def.filter((a: any) => !a.parent);
            defParent       = isArray(defParent, 1, 'e') ? defParent[0] : null; 

        section     = makeSection('styles');
        content     = make('content', frame.v.md, 'frame');

        // Show base styles
        // Check to see if we have everything we need to document base styles
        if (def && defParent && isArray(defChildren)) {

            // Set up
            const block:    any = make('block', frame.h.md, 'frame');
            const item:     any = makeItem('Static');
            const diagram:  any = make('diagram', frame.diagram, 'frame');

            // Check if there are shared parent styles
            if (isArray(defParent.styles)) {

                // Loop thru shared parent styles
                defParent.styles.forEach((s: any) => {

                    // Check if style is shared or not
                    const match: any = shared.p.filter((a: any) => a === s.name);

                    if (isArray(match) && s.category !== 'layout') {

                        // Create required
                        let styleItem:  any = make('property', frame.h.sm, 'frame');
                        let styleLabel: any = make('label', text.label.value, 'text', String(s.name));
                        let valueLabel: any = s.value ? make('value', text.label.value, 'text', String(s.value)) : null;
                        let tokenLabel: any = s.token ? make('token', text.label.strong, 'text', String(s.token)) : null;

                        // Customise
                        styleItem.paddingLeft = 28;

                        // Append
                        styleItem.appendChild(styleLabel);
                        if (valueLabel) { styleItem.appendChild(valueLabel) };
                        if (tokenLabel) { styleItem.appendChild(tokenLabel) };
                        item.appendChild(styleItem);

                        styleLabel.layoutSizingHorizontal = 'FILL';
                        styleItem.layoutSizingHorizontal = 'FILL';

                    }

                });

            };

            // Append
            block.appendChild(item);
            block.appendChild(diagram);
            content.appendChild(block);

        }

    }

    // Append & adjust if available
    if (section && appendTo) {

        section.appendChild(content);
        appendTo.appendChild(section);

        content.layoutSizingHorizontal   = 'FILL';

    }

}