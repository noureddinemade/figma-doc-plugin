// Imports
import { DropShadow } from "../classes";
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
export function getAllProperties(i: any) {

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