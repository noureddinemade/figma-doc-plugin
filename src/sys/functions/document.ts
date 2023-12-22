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
export function getStyles(array: any, i: any) {

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
export function getAllStyles(i: any) {

    let response: any | null = null;

    if (i) {

        // Define arrays
        const layoutArray   = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight', 'itemSpacing', 'topRightRadius'];
        const fillsArray    = ['fills'];
        const strokesArray  = ['strokes'];
        const effectsArray  = ['effects'];
        const textArray     = ['fontName', 'fontSize', 'fontWeight', 'textAlignHorizontal', 'textAlignVertical', 'textAutoResize', 'textCase', 'textDecoration', 'textTruncation', 'lineHeight', 'letterSpacing'];

        // Check if it is an array or not
        if (i.length > 0) {

            response = []

            i.forEach(p => {

                // Get base property sets
                const layout    = getStyles(layoutArray, p);
                const fills     = getStyles(fillsArray, p);
                const strokes   = getStyles(strokesArray, p);
                const effects   = getStyles(effectsArray, p);
                const text      = getStyles(textArray, p);

                response.push(new Style(p.name, layout, fills, strokes, effects, text));

            })

        }

        else {

            // Get base property sets
            const layout    = getStyles(layoutArray, i);
            const fills     = getStyles(fillsArray, i);
            const strokes   = getStyles(strokesArray, i);
            const effects   = getStyles(effectsArray, i);
            const text      = getStyles(textArray, i);

            response = new Style(i.name, layout, fills, strokes, effects, text);

        }

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

        if (array && array.length > 0) { array.forEach(c => response?.push(c) )}

    }

    return response;

}

// Find out if a single item is shared or unique
export function sharedOrUnique(a: any, b: any) {

    let response: string = '';

    if (a.name === b.name) {

        // Set up conditions
        const c1 = a.value === b.value;
        const c2 = a.token === b.token;

        if (c1 || c2) { response = 'shared'}
        else { response = 'unique' }

    }

    return response;

}

// Get all shared or unique for a style
export function getSharedAndUnique(a: any, b: any, key: string) {

    let response = { shared: [], unique: [] };

    if (a[key] && b[key]) {

        a.layout.forEach(x => {

            b.layout.forEach(y => {

                const result = sharedOrUnique(x, y);

                if (result === 'shared') { response.shared.push(x) }
                if (result === 'unique') { response.unique.push(x) }
                
            });
            
        });

    }

    return response;
    
}

// Clean coomponent
export function getAllSharedAndUnique(item: any, array: any, key: any) {

    let response: any;

    // Start getting shared and unique
    if (item.length > 0) {

        response = [];

        item.forEach(p => {

            // Prep response
            let r: any = {

                name: item.name,
                
                shared: {

                    layout:     [],
                    fills:      [],
                    strokes:    [],
                    effects:    [],
                    text:       []

                }, 
                
                unique: {

                    layout:     [],
                    fills:      [],
                    strokes:    [],
                    effects:    [],
                    text:       []

                } 
            
            };

            //

            array.forEach((base: any) => {

                const i = p[key];
                const b = base[key];
    
                if (i && b) {
    
                    if (i.name !== b.name) {
    
                        const layout    = getSharedAndUnique(i, b, 'layout');
                        const fills     = getSharedAndUnique(i, b, 'fills');
                        const strokes   = getSharedAndUnique(i, b, 'strokes');
                        const effects   = getSharedAndUnique(i, b, 'fills');
                        const text      = getSharedAndUnique(i, b, 'fills');
    
                        r.shared.layout.push(layout.shared);
                        r.shared.fills.push(fills.shared);
                        r.shared.strokes.push(strokes.shared);
                        r.shared.effects.push(effects.shared);
                        r.shared.text.push(text.shared);
    
                        r.unique.layout.push(layout.unique);
                        r.unique.fills.push(fills.unique);
                        r.unique.strokes.push(strokes.unique);
                        r.unique.effects.push(effects.unique);
                        r.unique.text.push(text.unique);
                    
                    }
    
                }
    
            });

            response.push(r);


        })

    }

    else {

        // Prep response
        response = {

            name: item.name,
            
            shared: {

                layout:     [],
                fills:      [],
                strokes:    [],
                effects:    [],
                text:       []

            }, 
            
            unique: {

                layout:     [],
                fills:      [],
                strokes:    [],
                effects:    [],
                text:       []

            } 
        
        };

        //

        array.forEach((base: any) => {

            const i = item[key];
            const b = base[key];

            if (i && b) {

                if (i.name !== b.name) {

                    const layout    = getSharedAndUnique(i, b, 'layout');
                    const fills     = getSharedAndUnique(i, b, 'fills');
                    const strokes   = getSharedAndUnique(i, b, 'strokes');
                    const effects   = getSharedAndUnique(i, b, 'fills');
                    const text      = getSharedAndUnique(i, b, 'fills');

                    response.shared.layout.push(layout.shared);
                    response.shared.fills.push(fills.shared);
                    response.shared.strokes.push(strokes.shared);
                    response.shared.effects.push(effects.shared);
                    response.shared.text.push(text.shared);

                    response.unique.layout.push(layout.unique);
                    response.unique.fills.push(fills.unique);
                    response.unique.strokes.push(strokes.unique);
                    response.unique.effects.push(effects.unique);
                    response.unique.text.push(text.unique);
                
                }

            }

        })

    }

    return response;

}