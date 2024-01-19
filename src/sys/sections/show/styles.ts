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
        const variantProps:     any = styles.variantProps;

        let defParent:  any = def.filter((a: any) => !a.parent);
            defParent       = isArray(defParent, 1, 'e') ? defParent[0] : null; 

        section     = makeSection('styles');
        content     = make('content', frame.v.md, 'frame');

        // Show base styles
        // Check to see if we have everything we need to document base styles
        if (def && defParent && isArray(defChildren)) {

            // Set up
            const block:    any = make('block', frame.v.md, 'frame');
            const diagram:  any = make('diagram', frame.diagram, 'frame');
            const instance: any = makeInstance('diagram');

            // Append diagram first
            block.appendChild(diagram);

            // Don't include these styles
            const doNotInclude: any = ['constraints', 'layoutSizingHorizontal', 'layoutSizingVertical', 'visible'];

            // Check if there are shared parent styles
            if (isArray(defParent.styles)) {
                
                // Do not include certain styles
                defParent.styles = defParent.styles.filter((a: any) => !doNotInclude.includes(a.name));

                // Set up item
                const item: any = makeItem('Base');

                // Loop thru shared parent styles
                defParent.styles.forEach((s: any) => {
                    
                    // Check if style is shared or not
                    let matches:  any = shared.p.filter((a: any) => a === s.name);

                    if (isArray(matches)) {

                        // Create required
                        let styleItem:  any = make(`property: ${s.name}`, frame.h.sm, 'frame');
                        let styleLabel: any = make('label', text.label.style, 'text', String(s.name));
                        let valueFrame: any = s.value ? make('value', frame.value, 'frame') : null;
                        let tokenFrame: any = s.token ? make('token', frame.type, 'frame') : null;

                        // Customise
                        styleItem.paddingLeft = 28;

                        // Append
                        styleItem.appendChild(styleLabel);

                        if (tokenFrame) { 

                            tokenFrame.appendChild(make('label', text.label.value, 'text', String(s.token)));
                            styleItem.appendChild(tokenFrame);

                        };

                        if (valueFrame) { 
                            
                            valueFrame.appendChild(make('label', text.label.value, 'text', String(s.value)));
                            styleItem.appendChild(valueFrame);
                        
                        };

                        item.appendChild(styleItem);

                        styleLabel.layoutSizingHorizontal = 'FILL';
                        styleItem.layoutSizingHorizontal = 'FILL';

                    }

                });

                // Append
                block.appendChild(item);
                item.layoutSizingHorizontal = 'FILL';

            };

            // Check if there are shared children styles
            if (isArray(defChildren)) {

                // Loop thru children
                defChildren.forEach((c: any, k: any) => {

                    // Check if there are styles for this child
                    if (isArray(c.styles)) {

                        // Create child item
                        let childItem:  any = makeItem(`child: ${c.name}`);

                        // Edit
                        if (k + 1 >= defChildren.length) {

                            childItem.paddingBottom = 0;
                            childItem.strokes = [];

                        }

                        // Check styles
                        c.styles = c.styles.filter((a: any) => !doNotInclude.includes(a.name));

                        // Loop thru styles for this child
                        c.styles.forEach((cs: any) => {

                            // Check if style is shared or not
                            const matches: any = shared.c.filter((a: any) => a === cs.name);

                            if (isArray(matches)) {

                                // Create required
                                let styleItem:  any = make(`property: ${cs.name}`, frame.h.sm, 'frame');
                                let styleLabel: any = make('label', text.label.style, 'text', String(cs.name));
                                let valueFrame: any = cs.value ? make('value', frame.value, 'frame') : null;
                                let tokenFrame: any = cs.token ? make('token', frame.type, 'frame') : null;

                                // Customise
                                styleItem.paddingLeft = 42;

                                // Append
                                styleItem.appendChild(styleLabel);

                                if (tokenFrame) { 

                                    tokenFrame.appendChild(make('label', text.label.value, 'text', String(cs.token)));
                                    styleItem.appendChild(tokenFrame);

                                };

                                if (valueFrame) { 
                                    
                                    valueFrame.appendChild(make('label', text.label.value, 'text', String(cs.value)));
                                    styleItem.appendChild(valueFrame);
                                
                                };

                                childItem.appendChild(styleItem);

                                styleLabel.layoutSizingHorizontal = 'FILL';
                                styleItem.layoutSizingHorizontal = 'FILL';

                            };

                        });

                        // Append
                        block.appendChild(childItem);
                        childItem.layoutSizingHorizontal = 'FILL';

                    };

                });

            };

            // Append
            diagram.appendChild(instance);
            content.appendChild(block);

            diagram.layoutSizingHorizontal = 'FILL';
            block.layoutSizingHorizontal = 'FILL';

        }

        // Loop thru variant styles
        // Check if there are any variant props
        if (isArray(variantProps)) {

            // Loop thru variant props
            variantProps.forEach((prop: any) => {

                // Check if there are any variants
                if (isArray(prop.variants)) {

                    // Only display these properties
                    if (prop.unique) { const propsToDisplay: any = { p: prop.unique.parent ? prop.unique.parent : null, c: prop.unique.child ? prop.unique.child : null } };

                    // Loop thru prop variants
                    prop.variants.forEach((v: any) => {

                        // Set up items for this variant
                        const block:    any = make('block', frame.v.md, 'frame');
                        const diagram:  any = make('diagram', frame.diagram, 'frame');
                        const instance: any = makeInstance('diagram', { [prop.name]: v });

                        // Append items
                        diagram.appendChild(instance);
                        block.appendChild(diagram);
                        content.appendChild(block);

                        diagram.layoutSizingHorizontal = 'FILL';
                        block.layoutSizingHorizontal = 'FILL';

                    });

                };

            });

        }


    }

    // Append & adjust if available
    if (section && appendTo) {

        section.appendChild(content);
        appendTo.appendChild(section);

        content.layoutSizingHorizontal   = 'FILL';

    }

}