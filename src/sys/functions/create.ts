// Imports
import { sectionFrame, sectionTitle } from "../styles";
import { isArray  } from "./general";

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
export function create(name: string, props: any, text: any, type: any) {

    // Setup response
    let response;

    // Create based on type
    if (type === 'frame')   { response = figma.createFrame(); }
    if (type === 'text')    { response = figma.createText();  }

    // Assign name
    response.name = name;

    // Check if there are any props and then loop thru them and assign them to the frame
    if (isArray(props)) {

        props.forEach(p => {

            if (isArray(p)) { p.forEach(i => response[i.key] = i.value ) }
            else { response[p.key] = p.value }

        })

    }

    // Add text if needed
    if (type === 'text' && text) { response.characters = text };

    // Return frame
    return response;

}

// Create Section
export function createSection(text: string) {

    // Create section frame and heading
    const frame = create(`section: ${text}`, sectionFrame, null, 'frame');
    const title = create('section-title', sectionTitle, text, 'text');

    // Append heading and set to fill
    frame.appendChild(title);
    title.layoutSizingHorizontal = 'FILL';

    return frame;

}