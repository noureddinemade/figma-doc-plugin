// Imports
import { sectionFrame, sectionTitle } from "../helpers/styles";
import { isArray  } from "./general";

// Create instance
export function makeInstance(base: any, name: string, props: any, array: any[]) {

    // Clone from base
    const instance = base.clone();

    // Set properties if available
    if (isArray(props)) { props.forEach((p: any) => instance.setProperties(p) ) };

    // Set name
    instance.name = name;

    // Add to array
    array.push(instance);

    // Return instance
    return instance;

}

// Create Figma frame
export function create(name: string, props: any, text: any, type: any) {

    // Setup response
    let response: any | null;

    // Create based on type
    if (type === 'frame')   { response = figma.createFrame();   }
    if (type === 'text')    { response = figma.createText();    }
    if (type === 'vector')  { response = figma.createVector();  }

    // Assign name
    response.name = name;

    // Check if there are any props and then loop thru them and assign them to the frame
    if (isArray(props)) {

        props.forEach((p: any) => {

            if (isArray(p)) { p.forEach((i: { key: string | number; value: any; }) => response[i.key] = i.value ) }
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
    const frame: any = create(`section: ${text}`, sectionFrame, null, 'frame');
    const title: any = create('section-title', sectionTitle, text, 'text');

    // Append heading and set to fill
    frame.appendChild(title);
    title.layoutSizingHorizontal = 'FILL';

    return frame;

}