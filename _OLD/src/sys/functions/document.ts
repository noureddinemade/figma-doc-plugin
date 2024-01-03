// Imports
import { styleAreas, styles } from "../helpers/arrays";
import { DropShadow, Item } from "../helpers/classes";
import { cleanName, convertColour, inArrayAlready, isArray } from "./general";

// Define hierarchy
export function defineHierarchy(i: any, level: any) {

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

        const token:        any = figma.variables.getVariableById(id);
        const collection:   any = figma.variables.getVariableCollectionById(token.variableCollectionId);        
    
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
function checkProperty(p: any, i: any, type: any) {

    // Set up response
    let token       : any | null = null;
    let value       : any | null = null;
    let text        : any | null = null;
    let effect      : any | null = null;
    let response    : any | null = null;

    if (type === 'token')                       { token     = i.boundVariables[p]                           }
    if (type === 'value')                       { value     = i[p]                                          }
    if (type === 'text' && i.type === 'TEXT')   { text      = i.getStyledTextSegments(['textStyleId'])      }
    if (type === 'effect' && i.effects)         { effect    = i.getStyledEffectSegments(['effectStyleId'])  }

    // Get token if it exists
    if (token) {

        // Check if there are multiple tokens
        if (token.length === 1) { response = getToken(token[0].id) }

        else if (token.length > 1) {

            const multiple: any[] = [];

            token.forEach((t: { id: any; }) => multiple.push(getToken(t.id)))

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

            const multiple: any[] = [];

            value.forEach((v: any) => multiple.push(getValue(v)))

            response = multiple;

        }
        else { response = value }

    }

    // Get text style if it exists
    if (text) {

        // Check if there are multiple values
        if (text.length === 1) { response = getStyle(text[0].textStyleId) }
        else if (text.length > 1) {

            const multiple: any[] = [];

            text.forEach((t: { textStyleId: any; }) => multiple.push(getStyle(t.textStyleId)))

            response = multiple;

        }
        else { response = null }

    }

    // Get effect style if it exists
    if (effect) {}

    // Return response
    return response;

}

// Get fill values
function getStyles(array: any, i: any, cat: any) {

    // Set up
    let response: any = [];

    // Loop thru layout properties
    array.forEach((p: any) => {

        // Check if there's anything to get
        if (i[p]) {

            // Set up
            const name:     any = checkName(p, i);
            const parent:   any = i.parent.type === 'PAGE' ? null : i.parent.name;
            
            let token: any | null = [];
            
            // Get properties
            let text        = cat === 'text' ? checkProperty(p, i, 'text') : null;
                text        = isArray(text, 0, 'e') ? null : text;
                text        = isArray(text, 1, 'e') ? text[0] : text;
            let effect      = cat === 'effect' ? checkProperty(p, i, 'effect') : null;
                effect      = isArray(effect, 0, 'e') ? null : effect;
                effect      = isArray(effect, 1, 'e') ? effect[0] : effect;
            let value       = checkProperty(p, i, 'value');
                value       = isArray(value, 0, 'e') ? null : value;
                value       = isArray(value, 1, 'e') ? value[0] : value;
            let variable    = checkProperty(p, i, 'token');
                variable    = isArray(variable, 0, 'e') ? null : variable;
                variable    = isArray(variable, 1, 'e') ? variable[0] : variable;

            // Generate the token
            if (text)       { token.push(text)      };
            if (effect)     { token.push(effect)    };
            if (variable)   { token.push(variable)  };

            if (isArray(token, 1, 'e')) { token = token[0]  };
            if (isArray(token, 0, 'e')) { token = null      };
            
            // Construct the property and add to response
            const prop = {name: i.name, parent: parent, style: new Item(value, token, name, cat)};

            response.push(prop);

        }

    })

    return response;

}

// Match item
function matchItem(i: any, array: any) {

    const c1 = array.filter((a: { name: any; }) => a.name === i.name);
    const c2 = c1.filter((a: { style: { name: any; }; }) => a.style.name === i.style.name);

    return isArray(c2) ? true : false

}

// Match styles
export function matchStyle(i: any, base: any) {

    // Set up
    let response : any | null = null;

    // Check if there is anything to match
    if (i && base) {

        let condition = base
            condition = condition.filter((a: any) => { return a.style.category === i.style.category && a.style.name === i.style.name });
            condition = condition.filter((a: any) => { return a.style.token === i.style.token || a.style.value === i.style.value});

        if (isArray(condition)) { response = i.style.name }

    }

    // Return response
    return response;

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

                propArray.forEach((p: { style: any; name: any; }) => {

                    let s       = p.style;
                    let result: any | null = null;

                    if (s) {

                        if (s.value || s.token || s.text || s.effect) {

                            result = p;

                        }

                        // Fix stroke issue
                        const c1 = propArray.filter((a: { style: { name: string; }; }) => a.style.name === 'borderColor');
                        const c2 = c1.filter((a: { style: { value: null; }; }) => a.style.value === null);

                        if (isArray(c2)) {

                            c1.forEach((c: { name: any; }) => {

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
export function getChildren(i: any, parent: any | null = null) {

    let response: any[] | null = null;

    // Check if there are any children
    if (isArray(i.children)) {

        // Set the response to be an array
        response = [];

        // Get all children
        let array = parent ? i.findAll((n: { name: any; }) => n.name !== parent) : i.findAll();
            array = parent ? array.filter((n: { parent: any; }) => n.parent !== parent) : array;

        if (isArray(array)) { array.forEach((c: any) => { response?.push(c) }) }

    }

    return response;

}

// Get shared and unique styles
export function getSharedAndUnique(item: any, base: any) {

    // Set up
    let response: any | null  = null;

    if (isArray(item)) {

        response = { shared: [], unique: [] };

        item.forEach((i: any) => matchStyle(i, base) ? response.shared.push(i) : response.unique.push(i) );

    }

    // Return response
    return response;

}

// Remove duplicate styles
export function removeDuplicates(array: any, type: any = 'style') {

    // Set up response
    let response:   any | null = null;
    let tempArray:  any | null = null;

    // Loop thru array
    if (isArray(array)) {

        response    = [];
        tempArray   = []; 

        // Add contents of array into response
        array.forEach((item: any) => { tempArray.push(item) });

        // Clean up duplicates
        if (isArray(tempArray)) {

            tempArray.forEach((i: any) => {

                let matched: any;

                if (type === 'style')   { matched = matchStyle(i, response) };
                if (type === 'item')    {
                    
                    matched = response.filter((a: any) => JSON.stringify(a) === JSON.stringify(i) ) 
                    matched = isArray(matched);
                
                }

                if (!matched) { response.push(i) };

            })

        }
        

    }

    // Return response
    return response;

}

// Compare styles
export function compareStyles(array: any | null) {

    // Set up
    let response:   any | null = null;
    let tempArray:  any         = array[0].styles;

    // Check if array is suitable
    if (isArray(array)) {

        response    = { shared: [], unique: [] };

        const shared = response.shared;
        const unique = response.unique;

        // Loop thru array
        array.forEach((i: any) => {

            // Check if there are styles
            if (isArray(i.styles)) {

                // Loop thru styles
                i.styles.forEach((s: any) => { !matchStyle(s, tempArray) ? unique.push(s) : shared.push(s) });

            }

        });

    }

    // Return
    return response;

}

// Clean all styles
export function cleanAllStyles(array:any, dependencies: any) {
    
    // Set up response
    let response:   any | null = null;

    if (isArray(array)) {

        response = [];

        array.forEach((item: any[]) => {

            if (isArray(item)) {

                item.forEach((i: { name: any; parent: any; }) => {

                    if (!isArray(dependencies.filter((a: { name: any; }) => a.name === i.name))) {

                        if (!isArray(dependencies.filter((a: { name: any; }) => a.name === i.parent))) {

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