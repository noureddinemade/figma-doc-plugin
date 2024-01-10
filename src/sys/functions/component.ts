// Import
import { styleAreas, styles } from "../data/arrays";
import { makeInstance } from "./create";
import { cleanString, isArray } from "./general";

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
function noStroke(strokes: any, style: any) {

    // Set up
    let array: any  = styles.strokes;
        array       = array.filter((a: any) => a === style);

    if (!isArray(strokes) && isArray(array)) { return true };

}

// Return true if there is no effect
function noEffect(effects: any, style: any) {

    // Set up
    let array: any  = styles.effects;
        array       = array.filter((a: any) => a === style);

    if (!isArray(effects) && isArray(array)) { return true };

}

// Return true if there is no fill
function noFill(fills: any, style: any) {

    // Set up
    let array: any  = styles.fills;
        array       = array.filter((a: any) => a === style);

    if (!isArray(fills) && isArray(array)) { return true };

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

// Get text style/s from id
function getTextStyle(id: any) {

    return null;

}

// Get effect style from id
function getEffectStyle(id: any) {

    return null;

}

// Get style from node
function getStyleFromNode(node: any) {

    // Set up
    let response:   any | null  = { name: node.name, styles: [] };
    let type:       any         = node.type;

    // Loop thru each property in style area
    styleAreas.forEach((a: any) => styles[a].forEach((s: any) => {

        // Get required
        let value:  any | null  = node[s] ? node[s] : null;
        let token:  any | null  = node.boundVariables[s] ? node.boundVariables[s] : null;
        let text:   any | null  = type === 'TEXT' ? node.getStyledTextSegments('textStyleId') : null;
        let effect: any | null  = node.effectStyleId;
        let stroke: any         = noStroke(node.strokes, s);

        // Check if there are tokens
        stroke || isArray(value, 0, 'e') ? value = null : value;
        token ? token = getToken(token) : null;
        text ? text = getTextStyle(text) : null;
        effect ? effect = getEffectStyle(effect) : effect;

        // Conditions
        const c1 = value && value !== undefined;
        const c2 = token && token !== undefined;
        const c3 = text && text !== undefined;
        const c4 = effect && effect !== undefined;

        // Push to styles array
        if (c1 || c2 || c3 || c4) { response.styles.push({ name: s, category: a, value: value, token: token, text: text, effect: effect }) };

    }));

    //
    return response && isArray(response.styles) ? response : null;

}

// Get style from instance
export function getBaseStyles() {

    // Set up
    let response:       any | null = null;
    let baseInstance:   any | null = makeInstance('base');
    
    resetToDefault(baseInstance);
    baseInstance.name = 'base';

    // Check if base instance was created
    if (baseInstance) {

        // Set up
        response = getStyleFromNode(baseInstance);

    }

    //
    return response;

}