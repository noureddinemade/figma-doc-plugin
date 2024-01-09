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

    console.log(item);

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
    let response: any | null = { name: node.name, styles: [] };

    // Loop thru each property in style area
    styleAreas.forEach((a: any) => styles[a].forEach((s: any) => {

        // Get required
        let value:  any | null = node[s];
        let token:  any | null = node.boundVariables ? node.boundVariables[s] : null;
        // let text:   any | null = node.getStyledTextSegments('textStyleId');
        let effect: any | null = node.effectStyleId;

        // // Check if there is a variable or value
        value   ? value     = value : null;
        token   ? token     = getToken(token) : null;
        // text    ? text      = getTextStyle(text) : null;
        // effect  ? effect    = getEffectStyle(effect) : null;

        // Push to styles array
        // if (value || token || text || effect) {

        //     response.styles.push({ name: s, category: a, value: value, token: token, text: text, effect: effect });

        // } 

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
        // response = { base: baseInstance, styles: [] };

    }

    //
    return response;

}