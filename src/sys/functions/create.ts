import { frame, text, iconVector } from "../data/styles";
import { findBaseComp } from "./component";
import { cleanString, isArray } from "./general";

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
    if (type === 'frame') { response.expanded = false };
    return response;

}

// Create Section
export function makeSection(name: string) {

    // Create section frame and heading
    const section: any = make(`section: ${name}`, frame.section, 'frame');
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
export function makeItem(name: any, properties: any = null, icon: any = null, d: any = 'h') {

    // Dynamic business
    let whichIcon:      any = iconVector[name];
    let hideOptions:    any = name === 'Boolean' ? true : false;
    
    if (icon) { whichIcon = iconVector['Key'] };

    // Set up
    const item:             any = make(`item: ${name}`, frame.property, 'frame');
    const itemLabel:        any = make('label', text.title.prop, 'text', String(name));
    const itemIconFrame:    any = make('icon', frame.h.sm, 'frame');
    const itemIcon:         any = make(name, whichIcon, 'vector');
    const itemHeader:       any = make('header', frame.h.md, 'frame');
    const itemOptions:      any = properties ? makeProperties(properties, d, hideOptions) : null;

    // Make adjustments
    itemIcon.resize(10,10);
    itemHeader.counterAxisAlignItems = 'CENTER';
    if (icon) { itemIcon.fills = icon };

    // Append
    itemIconFrame.appendChild(itemIcon);
    itemHeader.appendChild(itemIconFrame);
    itemHeader.appendChild(itemLabel);
    item.appendChild(itemHeader);

    // Add options if available
    if (itemOptions) { item.appendChild(itemOptions); itemOptions.layoutSizingHorizontal = 'FILL'; };

    return item;

}

// Make Options
export function makeProperties(properties: any[], d: any = 'h', hide: boolean = false) {

    // Set up
    const response: any = make('property', frame[d].sm, 'frame');

    response.paddingLeft            = 28;
    response.layoutWrap             = 'WRAP';
    response.counterAxisSpacing     = 8;

    // Loop thru options and create a label and frame for each one
    properties.forEach((p: any) => {

        // Create required items
        const propertyLabel:    any = make('name', frame.type, 'frame');
        const propertyText:     any = make('label', text.label.type, 'text', cleanString(p.name, 'property'));

        // Append
        propertyLabel.appendChild(propertyText);
        response.appendChild(propertyLabel);

        // Check if there are option for this item
        if (isArray(p.options) && !hide) {

            // Loop thru options
            p.options.forEach((o: any) => {

                // Create required items
                const optionLabel:  any = make('option', o === p.value ? frame.default : frame.value , 'frame');
                const optionText:   any = make('label', text.label.value, 'text', String(o));

                // Append
                optionLabel.appendChild(optionText);
                response.appendChild(optionLabel);

            });
            
        };

        // Check if it is an INSTANCE_SWAP property
        if (p.instance) {

            // Set up
            const depends = p.value ? figma.getNodeById(p.value)?.name : p.instance;

            // Create required items
            const dependencyLabel:  any = make('dependency', frame.dependency, 'frame');
            const dependencyText:   any = make('label', text.label.dependency, 'text', `Dependency: ${depends}`);

            // Append
            dependencyLabel.appendChild(dependencyText);
            response.appendChild(dependencyLabel);

        };

    });

    // 
    return response;

}