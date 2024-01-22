// Import
import { frame, text } from "../../data/styles";
import { make, makeInstance, makeItem, makeSection, makeStyleProp } from "../../functions/create";
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

                    if (isArray(matches)) { makeStyleProp(s, item) };

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

                            if (isArray(matches)) { makeStyleProp(cs, childItem, 42) };

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

                    // Set up
                    let propsToDisplay: any;

                    // Only display these properties
                    if (prop.unique) { propsToDisplay = { p: prop.unique.parent ? prop.unique.parent : null, c: prop.unique.child ? prop.unique.child : null } };

                    // Loop thru prop variants
                    prop.variants.forEach((v: any) => {

                        // Set up items for this variant
                        const block:    any = make('block', frame.v.md, 'frame');
                        const diagram:  any = make('diagram', frame.diagram, 'frame');
                        const instance: any = makeInstance('diagram', [{ [prop.name]: v.name }]);

                        let item: any;

                        // Append diagram
                        block.appendChild(diagram);

                        // Don't include these styles
                        const doNotInclude: any = ['constraints', 'layoutSizingHorizontal', 'layoutSizingVertical', 'visible'];

                        // Check if there are unique parent styles or children
                        if (isArray(v.styles) || isArray(v.children)) {

                            // Create an item for this variant
                            item = makeItem('Variant');
                            
                            // Update label
                            let label: any  = item && item.children ? item.children.filter((a: any) => a.name === 'header') : null;
                                label       = label && isArray(label) ? label[0].children.filter((a: any) => a.name === 'label' ) : null;

                            if (isArray(label)) { label[0].characters = `${prop.name}: ${v.name}` };

                        }

                        // Check if there are unique parent styles
                        if (isArray(v.styles)) {

                            // Do not include some styles
                            v.styles = v.styles.filter((a: any) => !doNotInclude.includes(a.name));

                            // Loop thru styles
                            v.styles.forEach((s: any) => {

                                // Check if style is unique or not
                                let matches:  any = propsToDisplay.p.filter((a: any) => a === s.name);

                                if (isArray(matches)) { makeStyleProp(s, item) }

                            });
                            
                        }

                        // Append
                        block.appendChild(item);

                        // Check if there are unique children styles
                        if (isArray(v.children)) {

                            // Loop thru children
                            v.children.forEach((c: any, k: any) => {

                                // Check if there are styles for this child
                                if (isArray(c.styles)) {

                                    // Create child item
                                    let childItem:  any = makeItem(`child: ${c.name}`);

                                    // Edit
                                    if (k + 1 >= v.children.length) {

                                        childItem.paddingBottom = 0;
                                        childItem.strokes = [];

                                    }

                                    // Check styles
                                    c.styles = c.styles.filter((a: any) => !doNotInclude.includes(a.name));

                                    // Loop thru styles for this child
                                    c.styles.forEach((cs: any) => {

                                        // Check if style is shared or not
                                        const matches: any = propsToDisplay.c.filter((a: any) => a === cs.name);

                                        if (isArray(matches)) { makeStyleProp(cs, childItem, 42) };

                                    });

                                    // Append
                                    block.appendChild(childItem);
                                    childItem.layoutSizingHorizontal = 'FILL';

                                };

                            });

                        };

                        // Append items
                        diagram.appendChild(instance);
                        content.appendChild(block);

                        item.layoutSizingHorizontal = 'FILL';
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