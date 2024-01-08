// Import
import { frame, text } from "../../data/styles";
import { generateColours } from "../../functions/colours";
import { make, makeItem, makeSection } from "../../functions/create";
import { cleanString, convertColour } from "../../functions/general";
import { getChildren } from "../get/children";

// Show all the component information like id, description and link
export function showAnatomy(anatomy: any, appendTo: any) {

    // Set up
    let section: any | null = null;
    let content: any | null = null;

    // Check if there is anatomy
    if (anatomy) {

        // Create the anatomy frame and title
        section = makeSection('Anatomy');
        content = make('content', frame.h.md, 'frame');

        // Create diagram frame and append diagram instance to it
        const diagramFrame = make('diagram', frame.diagram, 'frame');
        
        diagramFrame.appendChild(anatomy);

        // Create an overlay for the the diagram frame
        const diagramOverlay = make('overlay', null, 'rect');

        diagramFrame.appendChild(diagramOverlay);

        diagramOverlay.layoutPositioning = 'ABSOLUTE';
        diagramOverlay.x = 0;
        diagramOverlay.y = 0;
        diagramOverlay.resize(diagramFrame.width, diagramFrame.height);
        diagramOverlay.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
        diagramOverlay.fills = [{ type: 'SOLID', color: convertColour('FFFFFF'), opacity: .7 }];

        // Create an overlay frame to house all the keys and resize it to match anatomy instance then append to diagramFrame
        const keysOverlay = make('keysOverlay', frame.h.sm, 'frame');

        keysOverlay.resize(anatomy.width, anatomy.height);
        keysOverlay.x = anatomy.x;
        keysOverlay.y = anatomy.y;
        keysOverlay.clipsContent = false;
        
        diagramFrame.appendChild(keysOverlay);
        keysOverlay.layoutPositioning = 'ABSOLUTE';
        keysOverlay.constraints = { horizontal: 'CENTER', vertical: 'CENTER' };

        let children: any   = getChildren(anatomy);
            children        = children.filter((a: any) => a.name.includes('forAnatomy==='));

        // Create a frame to house keys
        const keys = make('keys', frame.v.md, 'frame');

        // Unique colour set
        const keyColours: Set<string> = new Set();

        // Loop thru children
        children.forEach((c: any, key: number) => {

            // Create needed objects for item
            const cleanName = cleanString(c.name, 'anatomy');
            const keyFrame  = make('key', null, 'circle');

            let keyColour: any  = generateColours(1, keyColours);
                keyColour       = keyColour[0];
                keyColour       = [{ type: 'SOLID', color: convertColour(keyColour) }]

            // Edit item's properties
            keyFrame.fills  = keyColour;
            
            // Set up dependency text
            let depends:    any | null  = null;

            if (c.type === 'INSTANCE') { depends = c.mainComponent.name };

            // Create item
            const itemFrame = makeItem(cleanName, [{ name: c.type, instance: depends }], keyColour);

            // Append
            keysOverlay.appendChild(keyFrame);
            keys.appendChild(itemFrame);

            keyFrame.layoutPositioning = 'ABSOLUTE';
            itemFrame.layoutSizingHorizontal = 'FILL';

            // Adjust dot
            keyFrame.x = c.x;
            keyFrame.y = key % 2 === 0 ? c.y + 6 : c.y - 6;
            keyFrame.resize(10,10);

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