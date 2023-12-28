// Imports
import { styleAreas, styles } from "../arrays";
import { DropShadow, Item } from "../classes";
import { cleanName, convertColour, isArray } from "./general";

// Define hierarchy
function defineHierarchy(i: any, level: any) {

    if (i.parent && i.parent.type !== 'PAGE') {

        level = level + 1;

        return defineHierarchy(i.parent, level);

    }

    else { return level }

}

// Get a token
function getToken(id: any) {

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
function getValue(i: any) {

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
function hasText(i: any) {

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
function checkName(p: any, i: any) {

    let response = p;

    if (p === 'itemSpacing')        { response = 'gap' }
    if (p === 'topRightRadius')     { response = 'radius' }
    if (p === 'strokes')            { response = 'border' }

    // Check type then adjust name
    if (i.type === 'TEXT') { if (p === 'fills') { response = 'color' } }
    else { if (p === 'fills') { response = 'backgroundColor' } }

    return response;

}

// Is it a fill or stroke?
function getValueType(p: any, i: any) {

    let response;

    if (Array.isArray(i[p]) && i[p].length > 0) { response = true }
    else { response = false }

    return response;

}

// Check if a property exists
function checkProperty(p: any, i: any, t: any) {

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
function getStyles(array: any, i: any, cat: any) {

    let response: any = [];

    // Loop thru layout properties
    array.forEach(p => {
        
        const token     = checkProperty(p, i, 'token');
        const value     = checkProperty(p, i, 'value');
        const name      = checkName(p, i);
        const parent    = i.parent.type === 'PAGE' ? null : i.parent.name

        if (value || token) {

            const prop = {name: i.name, parent: parent, style: new Item(value, token, name, cat)};

            if (!Array.isArray(value)) { response.push(prop) }
            else { response = null }

        }

    })

    return response;

}

// Match item
function matchItem(i: any, array: any) {

    const c1 = array.filter(a => a.name === i.name);
    const c2 = c1.filter(a => a.style.name === i.style.name);

    return isArray(c2) ? true : false

}

// Match styles
function matchStyle(i: any, base: any) {

    const c1 = base.filter(a => a.style.category === i.style.category);
    const c2 = c1.filter(a => a.style.name === i.style.name);
    const c3 = c2.filter(a => a.style.value === i.style.value);
    const c4 = c2.filter(a => a.style.token === i.style.token);

    return isArray(c3) || isArray(c4) ? true : false;

}

//

// Get properties of an item
export function getAllStyles(item: any) {

    let response: any | null = null;

    if (item) {

        response = [];

        // Loop thru style arrays
        styleAreas.forEach(a => {

            const propArray = getStyles(styles[a], item, a);

            let result: any | null = null;

            if (isArray(propArray)) { propArray.forEach(p => response.push(p) ) };

        })

    }

    isArray(response) ? response = response : response = null;

    return response;

}

// Get the children of an item
export function getChildren(i: any, parent: any) {

    let response: any[] | null = null;

    // Check if there are any children
    if (isArray(i.children)) {

        // Set the response to be an array
        response = [];

        // Get all children
        let array = parent ? i.findAll(n => n.name !== parent) : i.findAll();
            array = parent ? array.filter(n => n.parent !== parent) : array;

        if (isArray(array)) { array.forEach(c => { response?.push(c) }) }

    }

    return response;

}

// Get shared and unique styles
export function getSharedAndUnique(item: any, base: any) {

    // Set up
    let response: any | null  = null;

    if (isArray(item)) {

        response = { shared: [], unique: [] };

        item.forEach(i => matchStyle(i, base) ? response.shared.push(i) : response.unique.push(i) );

    }

    // Return response
    return response;

}

// Remove duplicate styles
export function removeDuplicates(array: any) {

    // Set up response
    let response:   any | null = null;
    let tempArray:  any | null = null;

    // Loop thru array
    if (isArray(array)) {

        response    = [];
        tempArray   = []; 

        // Add contents of array into response
        array.forEach(item => { if (isArray(item)) { item.forEach(i => tempArray.push(i)) } });

        // Clean up duplicates
        if (isArray(tempArray)) {

            tempArray.forEach(i => {

                let matched = response.filter(a => a.style.name === i.style.name);

                if (!isArray(matched)) { response.push(i) };

            })

        }
        

    }

    // Return response
    return response;

}

// Clean all styles
export function cleanAllStyles(array:any, dependencies: any) {
    
    // Set up response
    let response:   any | null = null;

    if (isArray(array)) {

        response = [];

        array.forEach(item => {

            if (isArray(item)) {

                item.forEach(i => {

                    if (!isArray(dependencies.filter(a => a.name === i.name))) {

                        if (!isArray(dependencies.filter(a => a.name === i.parent))) {

                            const match = matchItem(i, response);

                            if (!match) { response.push(i) }

                        }

                    }
                    
                });

            }

        })

    }

    // Return response
    return response;

}