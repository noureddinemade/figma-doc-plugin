// Imports
import { convertColour, setSides  } from "./general";

// Create Figma text
export function createText(string: string, p: any, label: string) {

    // Create text
    const textNode = figma.createText();

    // Style text
    textNode.fontName           = p.font;
    textNode.textCase           = p.textCase;
    textNode.textDecoration     = p.decoration;
    textNode.fontSize           = p.size;
    textNode.name               = label;

    // Fill text
    textNode.characters = string;

    return textNode;

}

// Create Figma frame
export function createFrame(p: any, name: string) {

    // Create frame
    const frameNode = figma.createFrame();

    // Set base properties
    frameNode.primaryAxisSizingMode     = 'AUTO';
    frameNode.counterAxisSizingMode     = 'AUTO';

    // Set dynamic properties
    frameNode.layoutMode                = p.direction;
    frameNode.itemSpacing               = p.gap;
    frameNode.name                      = name;
    frameNode.cornerRadius              = p.radius;

    // Set alignment
    let align;

    p.align ? align = p.align : align = {p:'MIN', s:'MIN'};

    frameNode.primaryAxisAlignItems     = align.p;
    frameNode.counterAxisAlignItems     = align.s;

    // Set sizes
    let size;

    p.size ? size = p.size : size = { minWidth: null, maxWidth: null, minHeight: null, maxHeight: null }

    frameNode.minWidth                  = size.minWidth;
    frameNode.maxWidth                  = size.maxWidth;
    frameNode.minHeight                 = size.minHeight;
    frameNode.maxHeight                 = size.maxHeight;

    // Set padding
    setSides('padding',frameNode,p.padding);

    // Set dynamic styling

    // Check if there is a style token
    if (p.token) {

        // Is there a fill token? Ok apply it!
        if (p.token.fill) { 
            
            if (p.token.fill.value !== null) { frameNode.fills = [{ type: 'SOLID', color: convertColour(p.token.fill.value) }] }
            else { frameNode.fills = [] }
        
        } else { frameNode.fills = [] }

        // Is there a stroke token? Ok apply it!
        if (p.token.stroke) {

            if (p.token.stroke.value !== null) {

                frameNode.strokes = [{ type: 'SOLID', color: convertColour(p.token.stroke.fill.value) }];     // Set stroke fill

            } else { frameNode.strokes = [] }

            if (p.token.stroke.dash !== null) {

                frameNode.dashPattern = p.token.stroke.dash;                                                  // Set stroke dash

            }

            if (p.token.stroke.weight !== null) {

                setSides('stroke', frameNode, p.token.stroke.weight);                                         // Set stroke weight

            }

        } else { frameNode.strokes = [] }

    }

    else {

        frameNode.fills     = [];
        frameNode.strokes   = [];

    }

    return frameNode;

}

// Create Section
export function createSection(name: string, frame: any, text: any) {

    // Create section frame
    const sectionFrame = createFrame(frame, `component-${name}`);

    // Create section heading
    const sectionHeading = createText(name, text, 'section-heading');

    // Append heading and set to fill
    sectionFrame.appendChild(sectionHeading);
    sectionHeading.layoutSizingHorizontal = 'FILL';

    return sectionFrame;

}