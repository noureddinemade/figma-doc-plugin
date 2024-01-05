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
            const itemFrame = make('item', frame.h.md, 'frame');
            const textFrame = make('labels', frame.v.xs, 'frame');
            const itemLabel = make('name', text.section.copy, 'text', c.name);
            const typeLabel = make('type', text.label.value, 'text', c.type);
            const keyFrame  = make('number', frame.key, 'frame');
            const keyNumber = key+1
            const keyLabel  = make('label', text.label.key, 'text', String(keyNumber));
            
            let depends: any | null = null;

            if (c.type === 'INSTANCE') {

                depends = make('dependency', text.label.dependency, 'text', `Dependency: ${c.mainComponent.name}`);

            } 
            

            // Append
            keyFrame.appendChild(keyLabel);
            itemFrame.appendChild(keyFrame);
            textFrame.appendChild(itemLabel);
            textFrame.appendChild(typeLabel);
            if (depends) { textFrame.appendChild(depends) };
            itemFrame.appendChild(textFrame);
            keys.appendChild(itemFrame);
            itemFrame.layoutSizingHorizontal = 'FILL';

        });

        // Append
        content.appendChild(keys);
        content.appendChild(diagramFrame);
        keys.layoutSizingHorizontal = 'FILL';
        diagramFrame.layoutSizingHorizontal = 'FILL';
        diagramFrame.layoutSizingVertical = 'FILL';

    }

    // Append to component frame if available
    if (section && appendTo) {

        section.appendChild(content);
        appendTo.appendChild(section);
        content.layoutSizingHorizontal = 'FILL';
        section.layoutSizingHorizontal = 'FILL';

    }

}