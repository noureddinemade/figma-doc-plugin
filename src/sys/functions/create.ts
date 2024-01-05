import { frame, text } from "../data/styles";
import { findBaseComp } from "./component";
import { isArray } from "./general";

// Create Figma frame
export function make(name: string, props: any, type: any, text: any = null) {

    // Setup response
    let response: any | null;

    // Create based on type
    if (type === 'frame')   { response = figma.createFrame();   }
    if (type === 'text')    { response = figma.createText();    }
    if (type === 'vector')  { response = figma.createVector();  }
    if (type === 'line')    { response = figma.createLine();    }

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
export function makeSection(name: string) {

    // Create section frame and heading
    const section: any = make(`section: ${text}`, frame.section, 'frame');
    const title: any = make('section-title', text.title.section, 'text', name);

    // Append heading and set to fill
    section.appendChild(title);
    title.layoutSizingHorizontal = 'FILL';

    return section;

}

// Create instance
export function makeInstance(name: string, props: any = null, pluginData: any = null) {

    // Clone from base
    let instance: any   = findBaseComp();
        instance        = instance.createInstance();

    // Set properties if available
    if (isArray(props)) { props.forEach((p: any) => instance.setProperties(p) ) };

    // Set plugin data if avilable
    if (isArray(pluginData)) { pluginData.forEach((p:any) => instance.setPluginData(p.label, p.value)) }

    // Set name
    instance.name = name;

    // Return instance
    return instance;

}