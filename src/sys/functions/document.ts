// Imports
import { styleAreas, styles } from "../arrays";
import { DropShadow, Item, Style } from "../classes";
import { cleanName, convertColour, isArray } from "./general";

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
    if (p === 'strokes')            { response = 'border' }

    // Check type then adjust name
    if (i.type === 'TEXT') { if (p === 'fills') { response = 'color' } }
    else { if (p === 'fills') { response = 'backgroundColor' } }

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
export function getAllStyles(item: any) {

    let response: any | null = null;

    if (item) {

        response = [];

        // Define arrays

        const array = ['general', 'layout', 'fills', 'strokes', 'effects', 'text'];

        // Loop thru style arrays
        array.forEach(a => {

            const propArray = getStyles(styles[a], item);

            let result: any | null = null;

            if (propArray && propArray.length > 0) {

                result = [];
                result.push(propArray);
                response.push(new Style(a, result));

            };

        })

    }

    response && response.length > 0 ? response = response : response = null;

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

// Get shared and unique styles
export function sharedOrUnique(array: any) {

    const allStyles         = {};
    
    let response : any | null = [];
      
    // Loop through each object in componentStyles
    array.forEach(i => {

        const topStyles = i.top;
        const item      = { name: i.name, styles: { shared: [], unique: [] } }
    
        // Loop through style areas in the 'top' property
        Object.values(topStyles).forEach((ts) => {

            const styles        = ts.styles;
            const styleShared   = { name: ts.name, styles:[] };
            const styleUnique   = { name: ts.name, styles:[] };
    
            // Loop through styles in the current style area
            styles.forEach((s) => {

                const styleKey = JSON.stringify(s);
        
                // Check if the style is already in allStyles
                if (allStyles[styleKey]) {

                    if (!styleShared.styles.some((sharedStyle) => JSON.stringify(sharedStyle) === styleKey)) {

                        styleShared.styles.push({element: i.name, style: s });

                    }

                } else {

                    // If no, add it to the allStyles object and the unique array
                    allStyles[styleKey] = s;

                    const existingUniqueStyleArea = styleUnique.styles.find(
                        (uniqueStyleArea) => uniqueStyleArea.ts.name === ts.name
                    );

                    if (existingUniqueStyleArea) {

                        existingUniqueStyleArea.ts.styles.push(s);

                    } else {
                        styleUnique.styles.push(s);
                    }

                }
            });

            if (styleShared.styles && styleShared.styles.length > 0) { item.styles.shared.push(styleShared) }
            if (styleUnique.styles && styleUnique.styles.length > 0) { item.styles.unique.push(styleUnique) }

        });

        response.push(item);

    })

    return response;

}

// Clean styles
export function cleanStyles(array: any) {

    let response: any = { shared: null, unique: [] };

    const allStrings    = [];
    const allShared     = [];
    const stylesArray   = styleAreas;

    // Add unique items
    array.forEach(i => {

        let item: any | null = { name: i.name, styles: [] }

        const unique = i.styles.unique;

        // Loop thru unique if available and add styles to the response.unique array
        if (unique && unique.length > 0) { unique.forEach(u => { item.styles.push(u) }) };

        // Check item
        item.styles && item.styles.length > 0 ? item.styles = item.styles : item = null;

        // Add to response
        response.unique.push(item);

    })

    // Sort and clean shared items
    stylesArray.forEach(s => {

        const inArray   = [];
        const allArray  = [];

        console.log(s);
        console.log('-----------');

        array.forEach(i => {

            const shared        = i.styles.shared;
            const stylesInArea  = shared.filter(a => a.name === s);

            let item: any | null = { name: i.name, styles: [], styleArea: '' }

            if (stylesInArea && stylesInArea.length > 0) { 
                
                stylesInArea.forEach(s2 => {

                    if (s2.styles && s2.styles.length > 0) {

                        s2.styles.forEach(s3 => {

                            item.styles.push(s3.style);
                            item.styleArea = s2.name;

                            inArray.push(item);

                        })

                    }
                
                }) 
            
            }

        })

        if (inArray && inArray.length > 0) {

            inArray.forEach(i => {

                const getStyle = JSON.stringify(i.styles);

                console.log(getStyle);

                if (!allArray[getStyle]) {

                    allArray.push(getStyle);
                    allShared.push(i);

                }

            })

        }

    })

    // Clean array
    const newArray = response.unique.filter(a => a !== null);
    response.unique = newArray;

    console.log(response);

    if (allShared && allShared.length > 0) { response.shared = allShared };

    return response;

}