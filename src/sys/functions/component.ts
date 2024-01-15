// Import
import { styleAreas, styles } from "../data/arrays";
import { makeInstance } from "./create";
import { cleanString, getHeirachy, isArray } from "./general";

// Get children from component
export function anyChildren(component: any, criteria: any | null = null) {

    if (component) { return isArray(component.children) ? component.findAll(criteria) : null }

}

// Find out if a node is an instance
export function isInstance(node: any) {

    // Check if the node is available and then check if it's an instance
    if (node) { return node.type === 'INSTANCE' ? true : false };

}

// Find out if a node belongs to an instance
export function belongsToInstance(node: any): boolean {

    // Check if the node is available and it has a parent
    if (node && node.parent) { return node.parent.type === 'INSTANCE' ? true : belongsToInstance(node.parent) }
    else { return false; }

}

// Find out if a node has the same parent as a dependency
export function sameParentAsDependency(node: any, dependencies: any) {

    // Set up
    let response: any | null = null;

    // Check if there are dependencies
    if (isArray(dependencies)) {

        // Loop thru dependencies
        dependencies.forEach((d: any) => { if (d.name === node.parent.name) { response = true } });

    }

    //
    return response;

}

// Set up the base component
export function setBaseComp(selected: any) {

    // Set up    
    let baseComp: any;

    // Check what the selected item is
    selected.type === 'COMPONENT_SET' ? baseComp = selected.children[0] : baseComp = selected;

    baseComp.setPluginData('baseComponent', 'true');

}

// Find base component
export function findBaseComp() {

    // Set up
    let base: any   = figma.currentPage.findAllWithCriteria({ types: ['COMPONENT'], pluginData: { keys: ['baseComponent'] } });

    return isArray(base) ? base[0] : null;

}

// Reset component back to default
export function resetToDefault(instance: any) {

    instance.resetOverrides();

}

// Return true if there is no stroke
function emptyStyle(array: any, style: any, type: any) {

    // Set up
    let newArray: any  = styles[type];
        newArray       = newArray.filter((a: any) => a === style);

    if (!isArray(array) && isArray(newArray)) { return true };

}

// Get token from variable ID
function findToken(id: any) {

    const token:        any = figma.variables.getVariableById(id);
    const collection:   any = figma.variables.getVariableCollectionById(token.variableCollectionId);
    
    return cleanString(`${collection.name}.${token.name}`, 'token');

}

// Get token from variable ID
function getToken(item: any) {

    // Set up
    let response: any | null = null;

    // Check if there are multiple tokens
    if (isArray(item)) {

        if (isArray(item, 1, 'e')) { response = findToken(item[0].id) }
        else {

            response = [];

            item.forEach((i: any) => response.push(findToken(i.id)));

        }

    }
    else { response = findToken(item.id) };

    //
    return response;

}

// Get effect style from id
function getFigmaStyle(id: any) {

    if (id !== '') {

        let style: any  = figma.getStyleById(id);
            style       = cleanString(style.name, 'token');

        return style;

    } else { return null };

}

// Get all text styles
function getTextStyles(array: any) {

    // Set up
    let response: any | null = null;

    // Check array length
    if (isArray(array, 1, 'e')) { response = getFigmaStyle(array[0].textStyleId) }
    else if (isArray(array, 1, 'm')) {

        response = [];

        array.forEach((i: any) => { response.push(getFigmaStyle(i.textStyleId)) });

    }
    else { response = null };

    //
    return response;

}

// Get style from node
function getStyleFromNode(node: any, def: boolean = false, base: any = null) {

    // Set up
    let heirachy:   any | null  = getHeirachy(node, 0);
    let parent:     any | null  = heirachy === 0 ? null : node.parent.name;
    let response:   any | null  = { name: node.name, styles: [], level: heirachy, parent: parent, default: def };
    let type:       any         = node.type;
    let uniques:    any         = [];

    // Loop thru each property in style area
    styleAreas.forEach((a: any) => styles[a].forEach((s: any) => {

        // Get required
        let value:  any | null  = node[s] ? node[s] : null;
        let token:  any | null  = node.boundVariables[s] ? node.boundVariables[s] : null;
        let text:   any | null  = type === 'TEXT' && a === 'text' ? node.getStyledTextSegments(['textStyleId']) : null;
        let effect: any | null  = node.effectStyleId !== '' && a === 'effects' ? node.effectStyleId : null;
        let stroke: any         = emptyStyle(node.strokes, s, 'strokes');

        // Check if there are styles
        stroke || isArray(value, 0, 'e') ? value = null : value;
        token ? token = getToken(token) : null;
        text ? text = getTextStyles(text) : null;
        effect ? effect = getFigmaStyle(effect) : null;

        // Check if the value is an array of 1
        value = isArray(value, 1, 'e') ? value[0] : value;

        // Conditions
        const c1 = value && value !== undefined;
        const c2 = token && token !== undefined;
        const c3 = text && text !== undefined;
        const c4 = effect && effect !== undefined;

        // Push to styles array
        if (c1 || c2 || c3 || c4) { response.styles.push({ name: s, category: a, value: value, token: token, text: text, effect: effect }) };

    }));

    // Check if there is a response
    if (response && isArray(response.styles) && isArray(base)) {

        // Check
        const baseMatch: any = isArray(base, 1, 'e') ? base[0] : base.filter((a: any) => a.name === node.name)[0];

        // Loop thru each style
        response.styles.forEach((i: any) => {

            // Find match
            let match: any  = baseMatch.styles.filter((a: any) => JSON.stringify(a) === JSON.stringify(i));
                match       = match[0];

            // Check if style is unique
            if (!match) { uniques.push(i) };

        });

        // Check if there were any uniques
        if (isArray(uniques)) { response.styles = uniques };

    }

    //
    return response && isArray(response.styles) ? response : null;

}

// Get style from children
function getStyleFromChildren(children: any, dependencies: any, def: boolean = false, base: any = null) {

    // Set up
    let response: any | null = null;

    // Check if there are children and get styles from each one
    if (isArray(children)) {

        // Set array
        response = [];

        // Loop thru children and add to styles to each array
        children.forEach((c: any) => {

            const c1 = isInstance(c);
            const c2 = belongsToInstance(c);
            const c3 = sameParentAsDependency(c, dependencies);
            const c4 = base ? base.filter((a: any) => a.name === c.name) : null;
            
            if (!c1) {

                if (c2 && !c3) {

                    const childStyle = getStyleFromNode(c, def, c4);
                    response.push(childStyle);

                }
                
            }

        });

    }

    //
    return response;

}

// Get style from instance
export function getStylesFromInstance(instance: any, dependencies: any, def: boolean = false, base: any = null) {

    // Set up
    let response:       any = null;
    let children:       any = anyChildren(instance);
    let baseParent:     any = base ? base.filter((a: any) => !a.parent) : null;
    let baseChildren:   any = base ? base.filter((a: any) => a.parent) : null;

    // Check if base instance was created
    if (instance) {

        // Get style from base instance
        const top = getStyleFromNode(instance, def, baseParent);

        response = getStyleFromChildren(children, dependencies, def, baseChildren);

        response.unshift(top);

    }

    //
    return response;

}