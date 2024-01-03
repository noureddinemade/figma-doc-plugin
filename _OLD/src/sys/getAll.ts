// Import
import { getAnatomy } from "./functions/get/anatomy";
import { getProperties } from "./functions/get/properties";
import { getStyles } from "./functions/get/styles";

// Get everything from selected component/s
export function getAll(i: any, baseComp: any, baseInstance: any, dependencies: any, compInstances: any, compProps: any, compStyles: any, compAnatomy: any) {

    // Get properties
    getProperties(i, baseComp, baseInstance, dependencies, compInstances, compProps);

    // Get anatomy
    getAnatomy(baseInstance, compAnatomy, compProps);

    // Get styles
    getStyles(compInstances, compProps, baseComp, compStyles);

}