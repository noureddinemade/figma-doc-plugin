import { frame, text, iconVector } from "../data/styles";
import { findBaseComp } from "./component";
import { isArray } from "./general";

// Create Figma frame
export function make(name: string, props: any, type: any, text: any = null) {

    // Setup response
    let response: any | null;

    // Create based on type
    if (type === 'frame')   { response = figma.createFrame();       };
    if (type === 'text')    { response = figma.createText();        };
    if (type === 'vector')  { response = figma.createVector();      };
    if (type === 'circle')  { response = figma.createEllipse();     };
    if (type === 'rect')    { response = figma.createRectangle();   };

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

// Make item
export function makeItem(type: any, properties: any = null) {

    // Set up
    const item:             any = make('item', frame.property, 'frame');
    const itemLabel:        any = make('label', text.section.copy, 'text', String(type));
    const itemIconFrame:    any = make('icon', frame.h.sm, 'frame');
    const itemIcon:         any = make(type, iconVector[type], 'vector');
    const itemHeader:       any = make('header', frame.h.md, 'frame');
    const itemOptions:      any = properties ? makeProperties(properties) : null;

    // Append
    itemIconFrame.appendChild(itemIcon);
    itemHeader.appendChild(itemIconFrame);
    itemHeader.appendChild(itemLabel);
    item.appendChild(itemHeader);

    // Add options if available
    if (isArray(itemOptions)) { itemOptions.forEach((i: any) => item.appendChild(i) ) };

    return item;

}

// Make Options
export function makeProperties(properties: any[]) {

    // Set up
    const items: any[] = [];

    // Loop thru options and create a label and frame for each one
    properties.forEach((o: any) => {

        // Create required items
        const property: any = make('options', frame.options, 'frame');

        // Append
        // optionFrame.appendChild(optionLabel);
        // item.appendChild(optionFrame);

        // Check if there are option for this item
        if (isArray(o.options)) {
            
        }

        // Add to items
        items.push(property);

    });

    // 
    return items;

}