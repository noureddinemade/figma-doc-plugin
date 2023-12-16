// Create classes

// Classes for the selected component
class Item {

    constructor(value, token, name) {

        this.value  = value;
        this.token  = token;
        this.name   = name;

    }

}

class Stroke {

    constructor(align, weight, fill, dash) {

        this.align      = align;
        this.weight     = weight;
        this.fill       = fill;
        this.dash       = dash;

    }

}

class DropShadow {

    constructor(fill, offset, radius, spread, opacity) {

        this.fill       = fill;
        this.offset     = offset;
        this.radius     = radius;
        this.spread     = spread;
        this.opacity    = opacity

    }

}

class Size {

    constructor(width, minWidth, maxWidth, height, minHeight, maxHeight) {

        this.width      = width;
        this.minWidth   = minWidth;
        this.maxWidth   = maxWidth;
        this.height     = height;
        this.minHeight  = minHeight;
        this.maxHeight  = maxHeight;

    }

}

class Box {

    constructor(top, right, bottom, left) {

        this.top        = top;
        this.right      = right;
        this.bottom     = bottom;
        this.left       = left;

    }

}

class Property {

    constructor(name, type, options) {

        this.name       = name;
        this.type       = type;
        this.options    = options;

    }

}

class Child {

    constructor(name, id, level, properties, parent, type) {

        this.name           = name; 
        this.id             = id;
        this.level          = level;
        this.properties     = properties;
        this.parent         = parent;
        this.type           = type;

    }

}

class Component {

    constructor(name, id, properties, children, docs, link) {

        this.name       = name;
        this.id         = id;
        this.properties = properties;
        this.children   = children;
        this.docs       = docs;
        this.link       = link;

    }

}

// Classes to create documentation
class Text {

    constructor(textCase, decoration, font, size, weight, style) {

        this.textCase       = textCase;
        this.decoration     = decoration;
        this.font           = font;
        this.size           = size;
        this.weight         = weight;
        this.style          = style;

    }

}

class Layout {

    constructor(size, padding, gap, radius) {

        this.size       = size;
        this.padding    = padding;
        this.gap        = gap;
        this.radius     = radius;

    }

}

class Visual {

    constructor(fill, stroke, style, layout) {

        this.fill       = fill;
        this.stroke     = stroke;
        this.style      = style;
        this.layout     = layout;

    }

}

class Frame {

    constructor(direction, gap, padding, radius, token, align, size) {

        this.direction      = direction;
        this.gap            = gap;
        this.padding        = padding;
        this.radius         = radius;
        this.size           = size;
        this.token          = token;
        this.align          = align;

    }

}


// Get selection
const currentSelection      = figma.currentPage.selection;
const properties            = [];

async function documentSelected() {

    try {

        // Load fonts
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Regular" });
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Bold" });

        // Setup weights
        const fontReg   = { family: "IBM Plex Mono", style: "Regular" };
        const fontBold  = { family: "IBM Plex Mono", style: "Bold" };

        // Create default styles
        const baseStroke    = new Stroke('INSIDE', 1, {token: null, value: '9747FF'}, [10,5]);
        const baseFill      = new Item('FFFFFF');
        const baseToken     = new Visual(baseFill, null, null ,null);
        const baseFrame     = new Frame('VERTICAL', 16, 24, 5, baseToken);
        const innerFrame    = new Frame('VERTICAL', 8, 0, 0, null);
        const propFill      = new Item('F5F5F6');
        const propToken     = new Visual(propFill, null, null, null);
        const propFrame     = new Frame('VERTICAL', 0, [4,8], 4, propToken);
        const valueFill     = new Item('FAF4F2');
        const valueToken    = new Visual(valueFill, null, null, null);
        const valueFrame    = new Frame('VERTICAL', 0, [4,8], 4, valueToken);
        const compHead      = new Text('LOWER', 'NONE', fontBold, 16, null, null);
        const sectHead      = new Text('LOWER', 'UNDERLINE', fontBold, 14, null, null);
        const regCopy       = new Text('ORIGINAL', 'NONE', fontReg, 12, null, null);
        const propText      = new Text('LOWER', 'NONE', fontReg, 12, null, null);
        const propValue     = new Text('UPPER', 'NONE', fontReg, 12, null, null);

        // Is anything selected?
        if (currentSelection && currentSelection.length > 0) {

            const toDocument        = [];   // Define array needed for documentation
            const doNotDocument     = [];   // Define array for items not to document

            // Get each selected item and find properties and children
            currentSelection.forEach(selectedItem => {

                // Is this a component?
                if (selectedItem.type === 'COMPONENT' || selectedItem.type === 'COMPONENT_SET') {

                    const componentChildren     = [];                                           // Define array for children;
                    const componentProps        = [];                                           // Define array for component properties;
                    const properties            = selectedItem.componentPropertyDefinitions;    // Define properties

                    // Get properties for component
                    for (let key in properties) {

                        let property = null;

                        // Loop thru properties if they exist
                        if (properties.hasOwnProperty(key)) {
                            
                            let name      = key.split('#');                                   // Clean name
                            let type      = properties[key].type;                             // Get type
                            let value     = properties[key].defaultValue;                     // Get default value
                            
                            let options     = [];                                             // Define array for options
                            
                            // Check if options are available
                            if (properties[key].variantOptions && properties[key].variantOptions.length > 0) {

                                properties[key].variantOptions.forEach(o => {

                                    // Check if property is a "fake boolean"
                                    if (o === 'true' || o === 'false') {

                                        type = 'BOOLEAN';

                                        options = null;

                                    }

                                    else {

                                        options.push(o);

                                    }

                                });

                            } else { options = null }

                            //
                            property = new Property(name[0], type, options);

                        }

                        componentProps.push(property);
                        
                    }

                    // Get all children and get their properties
                    selectedItem.findAll(i => {

                        if (i.type === 'component') {



                        }
    
                        // Ignore a child if it is an instance as we do not document instances
                        if (i.type === 'INSTANCE' || i.parent.type === 'INSTANCE') {
    
                            doNotDocument.push(i);
    
                        }
                        // Otherwise get a child's properties
                        else {
                            
                            const currentProps      = getAllProperties(i);      // Get the required props for this item
                            const currentHierarchy  = defineHierarchy(i, 0);    // Define the hierarchy of this node
    
                            // Create property and push to nodeArray
                            const selectedProperty = new Child(cleanName(i.name, i.type), i.id, currentHierarchy, currentProps, i.parent.id, i.type);
                            
                            componentChildren.push(selectedProperty);
    
                        }
                        
                    });
    
                    const component = new Component(cleanName(selectedItem.name), selectedItem.id, componentProps, componentChildren, selectedItem.description, selectedItem.documentationLinks);

                    toDocument.push(component);

                }

            });

            console.log(toDocument);

            toDocument.forEach(i => {

                i.properties.forEach(p => {

                    if (i.children) {

                        i.children.forEach(c => {

                            if (p.name === c.name) { console.log('MATCH: ', p.name, c.name) };

                        })

                    }

                })

            });

            // Check if there is anything to document
            // if (toDocument && toDocument.length > 0) {


            //     // Create main frame (lol)
            //     const docContStroke             = baseStroke;
            //     const docContToken              = new Visual(null, docContStroke, null, null);
            //     const docContProps              = new Frame('HORIZONTAL', 24, 24, 5, docContToken);
            //     const docCont                   = createFrame(docContProps, 'documentation');

            //     // Document all selected items and their children (if any)

            //     toDocument.forEach(i => {

            //         // Configure padding
            //         // let padding;

            //         // i.level > 0 ? padding = [16, 16, 16, 16 * i.level] : padding = 16;

            //         // Create frame for component
            //         const componentCont = createFrame(new Frame('VERTICAL', 16, 0, 0),`component: ${i.name}`);

            //         // Create label
            //         const componentHeading = createText(`component: ${i.name}`, compHead, 'component-heading');
                    
            //         componentCont.appendChild(componentHeading);

            //         // Display information & links

            //         // Display information if available
            //         if (i.docs !== '') {

            //             // Create information frame
            //             const infoCont = createSection('information', baseFrame, sectHead);

            //             // Insert information
            //             const infoText = createText(i.docs, regCopy, 'documentation-content');

            //             infoCont.appendChild(infoText);

            //             // Check if there are any links
            //             if (i.link && i.link.length > 0) {

            //                 // Insert link
            //                 const infoLinkText  = createText(i.link[0].uri, propText, 'documentation-link');

            //                 infoLinkText.hyperlink = {type: 'URL', value: i.link[0].uri};
            //                 infoCont.appendChild(infoLinkText);

            //             }

            //             componentCont.appendChild(infoCont);
            //             infoCont.layoutSizingHorizontal = 'FILL';

            //         }

            //         // Display component properties
            //         if (i.properties && i.properties.length > 0) {

            //             sortArray(i.properties, 'type');

            //             // Create component props frame
            //             const propsCont         = createSection('properties', baseFrame, sectHead);
            //             const propsInnerCont    = createFrame(innerFrame, 'properties');

            //             // Loop thru component props
            //             i.properties.forEach(p => {

            //                 // Create property frame
            //                 const propCont = createFrame(new Frame('HORIZONTAL', 16, 0, 0, null, {p:'MIN', s:'CENTER'}, null), `property: ${cleanName(p.name)}`);

            //                 // Create type frame
            //                 const typeCont = createFrame(propFrame, 'type');
                            
            //                 // Create property label & type
            //                 const propLabel = createText(cleanName(p.name), propText, 'label');
            //                 const propType  = createText(p.type, propValue, 'label');

            //                 typeCont.appendChild(propType);
            //                 propCont.appendChild(propLabel);

            //                 // Create and list variants if available
            //                 if (p.options && p.options.length > 0) {

            //                     // Create options frame
            //                     const optionsCont = createFrame(new Frame('HORIZONTAL', 8, 0, 0), 'variant');

            //                     // Loop thru variants
            //                     p.options.forEach(o => {

            //                         // Create option frame
            //                         const valueCont = createFrame(valueFrame, 'variant');

            //                         // Create option label
            //                         const valueLabel = createText(o, propValue, 'label');

            //                         // Append
            //                         valueCont.appendChild(valueLabel);
            //                         optionsCont.appendChild(valueCont);
            //                         propCont.appendChild(optionsCont);

            //                     })

            //                 }

            //                 propCont.appendChild(typeCont);
            //                 propLabel.layoutSizingHorizontal = 'FILL';
            //                 propsInnerCont.appendChild(propCont);
            //                 propCont.layoutSizingHorizontal = 'FILL';

            //             });

            //             propsCont.appendChild(propsInnerCont);
            //             componentCont.appendChild(propsCont);
            //             propsInnerCont.layoutSizingHorizontal = 'FILL';
            //             propsCont.layoutSizingHorizontal = 'FILL';

            //         }

            //         // Display component variants if applicable


            //         // Display component children, styles and tokens

            //     //     let label;

            //     //     !i.parent ? label = createText(i.name, labelProps) : label = createText(`↳ ${i.name}`, labelProps);

            //     //     // Create property

            //     //     // Check fills
            //     //     if (i.props.fill) {

            //     //         // console.log(i.props.fill);

            //     //     }


            //     //     let propertyLabel   = new Text('LOWER', 'NONE', fontReg, 12, null, null);
            //     //         propertyLabel   = createText(i.name, propertyLabel);

            //     //     // console.log(i.props);
                    
                    
                    
            //     //     iCont.appendChild(propertyLabel);
            //         docCont.appendChild(componentCont);

            //     })

            //     // Go to documentation
            //     figma.viewport.scrollAndZoomIntoView([docCont]);

            // }

        }

        // If not, alert!
        else { alert('Nothing selected.') }

    } catch(error) {

        console.error("Error:", error);

    } finally {

        setTimeout(() => {

            figma.closePlugin();
            
        }, 1000);

    }

}

// Functions

// Convert RGB value to HEX
function convertColour(value) {

    // Set up internal functions
    const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, "0");

    // Set base result
    let result;

    if (Array.isArray(value)) {

        result = `${toHex(value[0])}${toHex(value[1])}${toHex(value[2])}`;

    }

    else {

        const raw   = parseInt(value, 16);
        const r     = ((raw >> 16) & 255) / 255;
        const g     = ((raw >> 8) & 255) / 255;
        const b     = (raw & 255) / 255;

        result = {r,g,b};

    }

    return result;

}

// Check all sides of a bounding box
function checkSides(v) {

    let result;

    if (v[0] === v[1] && v[1] === v[2] && v[2] === v[3]) { result = v[0] }      // If all sides are equal, set as one value
    else if (v[0] === v[2] && v[1] === v[3]) { result = [ v[0], v[1] ] }        // If all axis are the same set as 2 values
    else { result = [v[0], v[1], v[2], v[3]] }                                  // If all different set as 4 values

    return result;

}

// Set sides
function setSides(type, frame, size) {

    if (type === 'padding') {

        if (Array.isArray(size)) {

            if (size.length > 2) {
    
                frame.paddingTop        = size[0];
                frame.paddingRight      = size[1];
                frame.paddingBottom     = size[2];
                frame.paddingLeft       = size[3];
    
            }
    
            else {
    
                frame.paddingTop        = size[0];
                frame.paddingRight      = size[1];
                frame.paddingBottom     = size[0];
                frame.paddingLeft       = size[1];
    
            }
    
        }
    
        else {
    
            frame.paddingTop        = size;
            frame.paddingRight      = size;
            frame.paddingBottom     = size;
            frame.paddingLeft       = size;
    
        }

    }

    if (type === 'stroke') {

        if (Array.isArray(size)) {

            if (size.length > 2) {
    
                frame.strokeTopWeight        = size[0];
                frame.strokeRightWeight      = size[1];
                frame.strokeBottomWeight     = size[2];
                frame.strokeLeftWeight       = size[3];
    
            }
    
            else {
    
                frame.strokeTopWeight        = size[0];
                frame.strokeRightWeight      = size[1];
                frame.strokeBottomWeight     = size[0];
                frame.strokeLeftWeight       = size[1];
    
            }
    
        }
    
        else {
    
            frame.strokeTopWeight        = size;
            frame.strokeRightWeight      = size;
            frame.strokeBottomWeight     = size;
            frame.strokeLeftWeight       = size;
    
        }

    }

}

// Clean name
function cleanName(string, type) {

    let name = string.trim();                                               // Remove trailing spaces

    if (type === 'COMPONENT') {

        name = name.replace(/\,/g, '')                                      // Remove commas
        name = name.replace(/ /g, '/')                                      // Replace space with slash

    }

    else {

        name = name.replace(/\//g, '.');                                    // Replace slashes with dots
        name = name.replace(/ /g, '-');                                     // Replace spaces with dashes
        name = name.toLowerCase();                                          // Convert to lowercase

    }

    return name;

}

// Sort array
function sortArray(array, key) {

    array.sort((a, b) => {

        // Handle the case when the key is a string or an array
        const valueA = Array.isArray(a[key]) ? a[key][0] : a[key];
        const valueB = Array.isArray(b[key]) ? b[key][0] : b[key];

        // Compare the values
        return valueA.localeCompare(valueB);

    });
}

// Create Figma text
function createText(string, p, label) {

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
function createFrame(p, name) {

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
function createSection(name, frame, text) {

    // Create section frame
    const sectionFrame = createFrame(frame, `component-${name}`);

    // Create section heading
    const sectionHeading = createText(name, text, 'section-heading');

    // Append heading and set to fill
    sectionFrame.appendChild(sectionHeading);
    sectionHeading.layoutSizingHorizontal = 'FILL';

    return sectionFrame;

}

// Define hierarchy
function defineHierarchy(i, level) {

    if (i.parent && i.parent.type !== 'PAGE') {

        level = level + 1;

        return defineHierarchy(i.parent, level);

    }

    else { return level }

} 

// Get a token
function getToken(id) {

    let string;

    if (id) {

        const token         = figma.variables.getVariableById(id);
        const collection    = figma.variables.getVariableCollectionById(token.variableCollectionId);        
    
        string = `${collection.name}/${token.name}`;

    }

    else { string = null; }

    return cleanName(string);

}

// Get a value
function getValue(i) {

    let response;

    const value     = i[0];
    const hex       = convertColour([value.color.r, value.color.g, value.color.b]);

    if (value.type === 'SOLID') { response = hex }

    if (value.type === 'DROP_SHADOW') {

        response = new DropShadow(hex, value.offset, value.radius, value.spread, Math.round(value.color.a * 10) / 10);

    }

    return response;

}

// Is there a text style?
function hasText(i) {

    let response;

    if (i.type === 'TEXT') {

        let text = i.getRangeTextStyleId(0, i.characters.length);

        text !== null ? response = getToken(text, 'text') : response = null;

    }

    else {

        response = null;

    }

    return response;

}

// Check name
function checkName(p, i) {

    let response = p;

    if (p === 'itemSpacing')        { response = 'gap' }
    if (p === 'topRightRadius')     { response = 'radius' }
    if (p === 'strokes')            { response = 'around' }

    // Check type then adjust name
    if (i.type === 'TEXT') { if (p === 'fills') { response = 'inner' } }
    else { if (p === 'fills') { response = 'surface' } }

    return response;

}

// Is it a fill or stroke?
function getValueType(p, i) {

    let response;

    if (Array.isArray(i[p]) && i[p].length > 0) { response = true }
    else { response = false }

    return response;

}

// Check if a property exists
function checkProperty(p, i, t) {

    let response;
    
    // Get token if it exists
    if (t === 'token') {

        const tokens = i.boundVariables;

        if (tokens[p]) {

            // Check if fill or stroke
            if (getValueType(p, tokens)) { response = getToken(tokens[p][0].id) }
            else { response = getToken(tokens[p].id) }

        } else { response = null }

    }

    // Get value if it exists
    if (t === 'value') {

        if (i[p]) {

            // Check if fill or stroke
            if (getValueType(p, i)) { response = getValue(i[p])}
            else { response = i[p] }

        } else { response = null}

    }

    // Get style if it exists
    // if (t === 'style') {

    //     if (i[p])

    // }

    // 

    return response;


}

// Get fill values
function getProperties(array, i) {

    let response = [];

    // Loop thru layout properties
    array.forEach(p => {
        
        const token = checkProperty(p, i, 'token');
        const value = checkProperty(p, i, 'value');
        const name  = checkName(p, i);

        if (value || token) {

            const prop = new Item(value, token, name);

            if (!Array.isArray(value)) {

                response.push(prop);

            }

            else {

                response = null;

            }

        }

    })

    return response;

}

// Check properties of an item
function getAllProperties(i) {

    const test = figma.getStyleById(i.effectStyleId);

    if (test) { console.log(test.name) }

    // Define arrays
    const layoutArray   = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight', 'itemSpacing', 'topRightRadius'];
    const fillArray     = ['fills'];
    const strokeArray   = ['strokes'];
    const styleArray    = ['effects'];

    // Get property sets
    const layout    = getProperties(layoutArray, i);
    const fill      = getProperties(fillArray, i);
    const stroke    = getProperties(strokeArray, i);
    const style     = getProperties(styleArray, i);

    const response = {layout: layout, fill: fill, stroke: stroke, style: style};

    return response;

}

// Run plugin
documentSelected();