// Import classes
import { Item, Stroke, DropShadow, Size, Box, Property, Child, Component, Text, Layout, Visual, Frame } from "./sys/classes";
import { convertColour, checkSides, setSides, cleanName, sortArray } from "./sys/functions/general";
import { createText, createFrame, createSection } from "./sys/functions/create";
import { defineHierarchy, getToken, getValue, hasText, checkName, getValueType, checkProperty, getProperties, getAllProperties } from "./sys/functions/document";

// Set base constructs
const cs            = figma.currentPage.selection;
const toDocument    = [];
const doNotDocument = [];

// Check if a user has selected anything
if (cs && cs.length > 0) {

    try {
        
        // Load fonts
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Regular" });
        await figma.loadFontAsync({ family: "IBM Plex Mono", style: "Bold" });

        // Setup weights
        const fontReg   = { family: "IBM Plex Mono", style: "Regular" };
        const fontBold  = { family: "IBM Plex Mono", style: "Bold" };

        // Create default styles
        const baseStroke    = new Stroke('INSIDE', 1, {token: null, value: '9747FF'}, [10,5]);
        const baseFill      = new Item('FFFFFF', null, null);
        const baseToken     = new Visual(baseFill, null, null, null);
        const baseFrame     = new Frame('VERTICAL', 16, 24, 5, baseToken, null, null);
        const innerFrame    = new Frame('VERTICAL', 8, 0, 0, null, null, null);
        const propFill      = new Item('F5F5F6', null, null);
        const propToken     = new Visual(propFill, null, null, null);
        const propFrame     = new Frame('VERTICAL', 0, [4,8], 4, propToken, null, null);
        const valueFill     = new Item('FAF4F2', null, null);
        const valueToken    = new Visual(valueFill, null, null, null);
        const valueFrame    = new Frame('VERTICAL', 0, [4,8], 4, valueToken, null, null);
        const compHead      = new Text('LOWER', 'NONE', fontBold, 16, null, null);
        const sectHead      = new Text('LOWER', 'UNDERLINE', fontBold, 14, null, null);
        const regCopy       = new Text('ORIGINAL', 'NONE', fontReg, 12, null, null);
        const propText      = new Text('LOWER', 'NONE', fontReg, 12, null, null);
        const propValue     = new Text('UPPER', 'NONE', fontReg, 12, null, null);

        // Create the main frame (lol)
        const mainFrameStroke   = baseStroke;
        const mainFrameVisual   = new Visual(null, mainFrameStroke, null, null);
        const mainFrameProps    = new Frame('HORIZONTAL', 24, 24, 5, mainFrameVisual, null, null);
        const mainFrame         = createFrame(mainFrameProps, 'documentation');

        figma.viewport.scrollAndZoomIntoView([mainFrame]);

        // Loop thru selected items
        cs.forEach(e => {

            // Check if the selected item is a component
            if (e.type === 'COMPONENT_SET' || e.type === 'COMPONENT') {

            }

            else { console.log(e.name, ' is not a component') }

        });

    }

    catch(error) {

        console.log('Error: ', error);

    }

    finally {

        figma.closePlugin(`Wow, look at all that we've documented, we make a good team!`);

    }

}

else { figma.closePlugin('"If nothing has been selected, how can anything be documented?" — An ancient design system proverb') }