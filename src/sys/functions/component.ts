// Import
import { styleAreas, styles } from "../data/arrays";
import { makeInstance } from "./create";
import { isArray } from "./general";

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
        response = { base: baseInstance, styles: [] };

        // Get all required styles from baseInstance
        if (isArray(styleAreas) && styles) {

            // Loop thru each style area
            styleAreas.forEach((a: any) => styles[a].forEach((s: any) => {

                //
                let style = baseInstance[s];

                if (style) { console.log(a, s, style) };

            }));

        }

    }

    //
    return response;

}