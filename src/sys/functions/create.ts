import { frame, text } from "../data/styles";
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
export function makeItem(label: any = null, icon: any = null, type: any = null, options: any = null, dependency: any = null, last: boolean = false, value: any = null) {

    // Set up
    const itemFrame:    any = make('item', frame.property, 'frame');
    const itemHeader:   any = make('header', frame.h.md, 'frame');
    const itemInfo:     any = make('info', frame.h.sm, 'frame');
    const itemIcon:     any = make('icon', frame.h.sm, 'frame');
    const typeFrame:    any = make('type', frame.type, 'frame');

    // Append properties if available
    if (icon) {

        itemIcon.appendChild(icon);
        itemHeader.appendChild(itemIcon);
        icon.resize(10, 10);

    };
    
    if (label) { 
        
        itemHeader.appendChild(label);
    };

    if (type) {
        
        typeFrame.appendChild(type);
        itemInfo.appendChild(typeFrame);
    
    };
    
    if (isArray(options)) { 

        // Create options frame
        const optionsFrame = make('options', frame.options, 'frame');

        // Loop thru options
        options.forEach((o: any) => {

            // Create frame and label
            const frameprops    = o === value ? frame.default : frame.value;
            const optionFrame   = make('option', frameprops, 'frame');
            const optionLabel   = make('label', text.label.value, 'text', String(o));

            // Append
            optionFrame.appendChild(optionLabel);
            optionsFrame.appendChild(optionFrame);

        });
        
        itemInfo.appendChild(optionsFrame);
    };

    if (dependency) {
    
        // Create frame and label
        const depends   = make('dependency', frame.dependency, 'frame');
        const depLabel  = make('label', text.label.dependency, 'text', `Dependency: ${dependency}`);

        // Append
        depends.appendChild(depLabel);
        
        itemInfo.appendChild(depends);
    
    };

    // Append header and info to main frame (lol)
    itemFrame.appendChild(itemHeader);
    itemFrame.appendChild(itemInfo);

    // Edit properties
    itemInfo.paddingLeft = 28;
    itemHeader.counterAxisAlignItems = 'CENTER';
    if (last) { itemFrame.strokes = [] };


    //
    return label ? itemFrame : null;

}