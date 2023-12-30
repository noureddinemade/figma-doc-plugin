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

    let string: any | null = null;

    if (id) {

        const token         = figma.variables.getVariableById(id);
        const collection    = figma.variables.getVariableCollectionById(token.variableCollectionId);        
    
        string = `${collection.name}/${token.name}`;

    }

    return cleanName(string, null);

}

// Get a style
function getStyle(id: any) {

    let string: any | null = null;

    if (id) { 
        
        string = figma.getStyleById(id);
        string = cleanName(string.name, null);

    }

    return string;

}

// Get a value
function getValue(value: any) {

    // Set up response
    let response : any | null = null;

    const hex   = value.color ? convertColour([value.color.r, value.color.g, value.color.b]) : null;
    const alpha = value.color && value.color.a ? Math.round(value.color.a * 10) / 10 : null;

    response = {

        SOLID: hex,
        DROP_SHADOW: new DropShadow(hex, value.offset, value.radius, value.spread, alpha),
        LAYER_BLUR: { blur: value.blur }

    }

    // Return response
    return response[value.type];

}

// Check name
function checkName(p: any, i: any) {

    let response = p;

    if (p === 'itemSpacing')                { response = 'gap'              };
    if (p === 'topRightRadius')             { response = 'radius'           };
    if (p === 'strokes')                    { response = 'borderColor'      };
    if (p === 'fills')                      { response = 'backgroundColor'  };
    if (i.type === 'text' && p === 'fills') { response = 'color'            };

    return response;

}

// Check if a property exists
function checkProperty(p: any, i: any, type: type) {

    // Set up response
    let token       : any | null = null;
    let value       : any | null = null;
    let text        : any | null = null;
    let effect      : any | null = null;
    let response    : any | null = null;

    if (type === 'token')                       { token     = i.boundVariables[p]                       }
    if (type === 'value')                       { value     = i[p]                                      }
    if (type === 'text' && i.type === 'TEXT')   { text      = i.getStyledTextSegments(['textStyleId'])  }
    if (type === 'effect' && i.effects)         { effect    = i.effectStyleId                           }

    // Get token if it exists
    if (token) {

        // Check if there are multiple tokens
        if (token.length === 1) { response = getToken(token[0].id) }

        else if (token.length > 1) {

            const multiple = [];

            token.forEach(t => multiple.push(getToken(t.id)))

            response = multiple;

        }

        else { response = getToken(token.id) }

    }

    // Get value if it exists
    if (value) {

        const valueArray = Array.isArray(value);

        // Check if there are multiple values
        if (valueArray && value.length === 1) { response = getValue(value[0]) }
        else if (valueArray && value.length > 1) {

            const multiple = [];

            value.forEach(v => multiple.push(getValue(v)))

            response = multiple;

        }
        else { response = value }

    }

    // Get text style if it exists
    if (text) {

        // Check if there are multiple values
        if (text.length === 1) { response = getStyle(text[0].textStyleId) }
        else if (text.length > 1) {

            const multiple = [];

            text.forEach(t => multiple.push(getStyle(t.textStyleId)))

            response = multiple;

        }
        else { response = null }

    }

    // Return response
    return response;

}

// Get fill values
function getStyles(array: any, i: any, cat: any) {

    let response: any = [];

    // Loop thru layout properties
    array.forEach(p => {

        if (i[p]) {

            const name      = checkName(p, i);
            const parent    = i.parent.type === 'PAGE' ? null : i.parent.name;
            
            let value       = checkProperty(p, i, 'value');
                value       = value && value.length === 0 ? null : value;
                value       = value && value.length === 1 ? value[0] : value;
            let token       = checkProperty(p, i, 'token');
                token       = token && token.length === 0 ? null : token;
                token       = token && token.length === 1 ? token[0] : token;
            let text        = cat === 'text' ? checkProperty(p, i, 'text') : null;
                text        = text && text.length === 0 ? null : text;
                text        = text && text.length === 1 ? text[0] : text;
            let effect      = cat === 'effects' ? checkProperty(p, i, 'effect') : null;
                effect      = effect && effect.length === 0 ? null : effect;
                effect      = effect && effect.length === 1 ? text[0] : effect;

            const prop = {name: i.name, parent: parent, style: new Item(value, token, text, effect, name, cat)};

            response.push(prop);

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
    const c5 = c2.filter(a => a.style.text === i.style.text);
    const c6 = c2.filter(a => a.style.effect === i.style.effect);

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

            let result: any | null = null;

            const propArray = getStyles(styles[a], item, a);

            if (isArray(propArray)) { 

                propArray.forEach(p => {

                    let s       = p.style;
                    let result: any | null = null;

                    if (s) {

                        if (s.value || s.token || s.text || s.effect) {

                            result = p;

                        }

                        // Fix stroke issue
                        const c1 = propArray.filter(a => a.style.name === 'borderColor');
                        const c2 = c1.filter(a => a.style.value === null);

                        if (isArray(c2)) {

                            c1.forEach(c => {

                                if (p.name === c.name) {

                                    result = null;

                                }

                            })

                        }

                    };

                    if (result) { response.push(result); };
                
                });
            
            };

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