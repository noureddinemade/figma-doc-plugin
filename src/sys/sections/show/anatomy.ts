// Import
import { frame, text } from "../../data/styles";
import { make, makeSection } from "../../functions/create";
import { isArray } from "../../functions/general";
import { getChildren } from "../get/children";

// Show all the component information like id, description and link
export function showAnatomy(anatomy: any, appendTo: any) {

    // Set up
    let section: any | null = null;
    let content: any | null = null;

    // Check if there is anatomy
    if (anatomy && anatomy.instance && anatomy.diagram && isArray(anatomy.children)) {

        // Create the anatomy frame and title
        section = makeSection('Anatomy');
        content = make('content', frame.h.md, 'frame');

        // Create diagram frame and append diagram instance to it
        const diagramFrame = make('diagram', frame.diagram, 'frame');
        
        diagramFrame.appendChild(anatomy.instance);
        diagramFrame.appendChild(anatomy.diagram);
        anatomy.diagram.layoutPositioning = 'ABSOLUTE';
        anatomy.diagram.constraints = { horizontal: 'CENTER', vertical: 'CENTER' };
        anatomy.diagram.x = anatomy.instance.x;
        anatomy.diagram.y = anatomy.instance.y;

        // Get children from diagram instance
        const diagramChildren: any = getChildren(anatomy.instance);

        // Check if there are any children
        if (isArray(diagramChildren)) {

            // Loop thru children and add custom ID
            diagramChildren.forEach((c: any) => {

                let newId = c.id;
                    newId = c.id.split(';');
                    newId = isArray(newId) ? newId[1] : newId;
                
                c.setPluginData('anatomyId', newId);
            
            })

        }

        // Create a frame to house keys
        const keys = make('keys', frame.v.md, 'frame');

        // Loop thru children
        anatomy.children.forEach((c: any, key: number) => {

            // Create needed objects for item
            const itemFrame = make('key', frame.h.sm, 'frame');
            const itemLabel = make('label', text.title.prop, 'text', c.name);
            const keyFrame  = make('number', frame.key, 'frame');
            const keyNumber = key+1
            const keyLabel  = make('label', text.label.key, 'text', String(keyNumber));

            // Append
            keyFrame.appendChild(keyLabel);
            itemFrame.appendChild(keyFrame);
            itemFrame.appendChild(itemLabel);
            keys.appendChild(itemFrame);

        });

        // Append
        content.appendChild(keys);
        content.appendChild(diagramFrame);
        keys.layoutSizingHorizontal = 'FILL';
        diagramFrame.layoutSizingVertical = 'FILL';

    }

    // To produce the anatomy, the plugin traverses the node’s layers to itemize and mark text, instances, and other shapes as elements.
    // Each itemized component is enumerated in the content, with instances highlighting dependency name and relevant prop values and other nodes reflecting visual attributes and styles. In the artwork, markers are placed on the periphery, prioritizing the left edge and finding a location on any edge that hasn’t already been used.

    // Append to component frame if available
    if (section && appendTo) {

        section.appendChild(content);
        appendTo.appendChild(section);
        content.layoutSizingHorizontal = 'FILL';
        section.layoutSizingHorizontal = 'FILL';

    }

}