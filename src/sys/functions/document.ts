// Imports
import { Child, DropShadow, Item, Style } from "../classes";
import { cleanName, convertColour } from "./general";

// Define hierarchy
export function defineHierarchy(i: any, level: any) {

    if (i.parent && i.parent.type !== 'PAGE') {

        level = level + 1;

        return defineHierarchy(i.parent, level);

    }

    else { return level }

} 

// Get a token
export function getToken(id: any) {

    let string;

    if (id) {

        const token         = figma.variables.getVariableById(id);
        const collection    = figma.variables.getVariableCollectionById(token.variableCollectionId);        
    
        string = `${collection.name}/${token.name}`;

    }

    else { string = null; }

    return cleanName(string, null);

}

// Get a value
export function getValue(i: any) {

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
export function hasText(i: any) {

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
export function checkName(p: any, i: any) {

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
export function getValueType(p: any, i: any) {

    let response;

    if (Array.isArray(i[p]) && i[p].length > 0) { response = true }
    else { response = false }

    return response;

}

// Check if a property exists
export function checkProperty(p: any, i: any, t: any) {

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
export function getProperties(array: any, i: any) {

    let response: any = [];

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

// Get properties of an item
export function getAllProperties(i: any) {

    let response: any | null = null;

    if (i) {

        // Define arrays
        const layoutArray   = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight', 'itemSpacing', 'topRightRadius'];
        const fillsArray    = ['fills'];
        const strokesArray  = ['strokes'];
        const effectsArray  = ['effects'];
        const textArray     = ['fontName', 'fontSize', 'fontWeight', 'textAlignHorizontal', 'textAlignVertical', 'textAutoResize', 'textCase', 'textDecoration', 'textTruncation', 'lineHeight', 'letterSpacing']

        // Get base property sets
        const layout    = getProperties(layoutArray, i);
        const fills     = getProperties(fillsArray, i);
        const strokes   = getProperties(strokesArray, i);
        const effects   = getProperties(effectsArray, i);
        const text      = getProperties(textArray, i);

        response = new Style(layout, fills, strokes, effects, text);

    }

    return response;

}

// Get the children of an item
export function getChildren(i: any, name: any) {

    let response: any[] | null = null;

    // Check if there are any children
    if (i.children && i.children.length > 0) {

        // Set the response to be an array
        response = [];

        // Get all children
        const array = name ? i.findAll(n => n.name === name) : i.findAll();

        if (array && array.length > 0) {

            array.forEach(c => {

                let child;

                // Get child properties
                const name      = cleanName(c.name, null);
                const id        = c.id;
                const parentID  = c.parent.id;
                const level     = defineHierarchy(c, 0);
                const styles    = getAllProperties(c);
    
                response?.push(new Child(name, id, parentID, level, styles));
    
            })

        }

    }

    return response;

}

// Clean coomponent
export function cleanComponent(i: any, base: any) {

    // console.log(i);
    // console.log(base);

    let response: any | null = null;

    // Compare Styles



}