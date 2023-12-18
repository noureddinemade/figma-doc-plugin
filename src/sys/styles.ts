import { Item, Stroke, Text, Visual, Frame } from './classes';

// Setup weights
export const fontReg   = { family: "IBM Plex Mono", style: "Regular" };
export const fontBold  = { family: "IBM Plex Mono", style: "Bold" };

// Create default styles
export const baseStroke    = new Stroke('INSIDE', 1, {token: null, value: '9747FF'}, [10,5]);
export const baseFill      = new Item('FFFFFF', null, null);
export const baseToken     = new Visual(baseFill, null, null, null);
export const baseFrame     = new Frame('VERTICAL', 16, 24, 5, baseToken, null, null);
export const innerFrame    = new Frame('VERTICAL', 8, 0, 0, null, null, null);
export const propFill      = new Item('F5F5F6', null, null);
export const propToken     = new Visual(propFill, null, null, null);
export const propFrame     = new Frame('VERTICAL', 0, [4,8], 4, propToken, null, null);
export const valueFill     = new Item('FAF4F2', null, null);
export const valueToken    = new Visual(valueFill, null, null, null);
export const valueFrame    = new Frame('VERTICAL', 0, [4,8], 4, valueToken, null, null);
export const compHead      = new Text('LOWER', 'NONE', fontBold, 16, null, null);
export const sectHead      = new Text('LOWER', 'UNDERLINE', fontBold, 14, null, null);
export const regCopy       = new Text('ORIGINAL', 'NONE', fontReg, 12, null, null);
export const propText      = new Text('LOWER', 'NONE', fontReg, 12, null, null);
export const propValue     = new Text('UPPER', 'NONE', fontReg, 12, null, null);