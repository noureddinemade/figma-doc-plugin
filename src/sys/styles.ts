import { Item, Stroke, Text, Visual, Frame } from './classes';
import { convertColour } from './functions/general';

// Fills
const fillWhite         = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('FFFFFF') }]};
const fillLight         = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('FAF4F2') }]};
const fillSubtle        = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('F5F5F6') }]};
const fillBlack         = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('000000') }]};
const fillGrey          = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('222222') }]};
const fillBlue          = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('0000C9') }]};
const fillNone          = { key: 'fills', value:[]};

// Strokes
const strokePurple      = { key: 'strokes', value:[{ type: 'SOLID', color: convertColour('9747FF') }]};
const strokeNone        = { key: 'strokes', value: [] };
const strokeDashed      = { key: 'dashPattern', value: [10,5] };

// Padding
const paddingTop4       = { key: 'paddingTop', value: 4 };
const paddingRight4     = { key: 'paddingRight', value: 4 };
const paddingBottom4    = { key: 'paddingBottom', value: 4 };
const paddingLeft4      = { key: 'paddingLeft', value: 4 };
const paddingTop8       = { key: 'paddingTop', value: 8 };
const paddingRight8     = { key: 'paddingRight', value: 8 };
const paddingBottom8    = { key: 'paddingBottom', value: 8 };
const paddingLeft8      = { key: 'paddingLeft', value: 8 };
const paddingTop16      = { key: 'paddingTop', value: 16 };
const paddingRight16    = { key: 'paddingRight', value: 16 };
const paddingBottom16   = { key: 'paddingBottom', value: 16 };
const paddingLeft16     = { key: 'paddingLeft', value: 16 };
const paddingTop24      = { key: 'paddingTop', value: 24 };
const paddingRight24    = { key: 'paddingRight', value: 24 };
const paddingBottom24   = { key: 'paddingBottom', value: 24 };
const paddingLeft24     = { key: 'paddingLeft', value: 24 };
const paddingTop32      = { key: 'paddingTop', value: 32 };
const paddingRight32    = { key: 'paddingRight', value: 32 };
const paddingBottom32   = { key: 'paddingBottom', value: 32 };
const paddingLeft32     = { key: 'paddingLeft', value: 32 };

const padding4          = [ paddingTop4, paddingRight4, paddingBottom4, paddingLeft4 ];
const padding8          = [ paddingTop8, paddingRight8, paddingBottom8, paddingLeft8 ];
const padding16         = [ paddingTop16, paddingRight16, paddingBottom16, paddingLeft16 ];
const padding24         = [ paddingTop24, paddingRight24, paddingBottom24, paddingLeft24 ];
const padding32         = [ paddingTop32, paddingRight32, paddingBottom32, paddingLeft32 ];

// Gap
const gap4              = { key: 'itemSpacing', value: 4 };
const gap8              = { key: 'itemSpacing', value: 8 };
const gap12             = { key: 'itemSpacing', value: 12 };
const gap16             = { key: 'itemSpacing', value: 16 };
const gap24             = { key: 'itemSpacing', value: 24 };
const gap32             = { key: 'itemSpacing', value: 32 };

// Redius
const radius4           = { key: 'cornerRadius', value: 4 };
const radius6           = { key: 'cornerRadius', value: 6 };
const radius8           = { key: 'cornerRadius', value: 8 };
const radius10          = { key: 'cornerRadius', value: 10 };

// Alignment
const primaryMin        = { key: 'primaryAxisAlignItems', value: 'MIN' };
const primaryMax        = { key: 'primaryAxisAlignItems', value: 'MAX' };
const primaryCenter     = { key: 'primaryAxisAlignItems', value: 'CENTER' };
const primaryBetween    = { key: 'primaryAxisAlignItems', value: 'SPACE_BETWEEN' };
const counterMin        = { key: 'counterAxisAlignItems', value: 'MIN' };
const counterMax        = { key: 'counterAxisAlignItems', value: 'MAX' };
const counterCenter     = { key: 'counterAxisAlignItems', value: 'CENTER' };
const counterBaseline   = { key: 'counterAxisAlignItems', value: 'BASELINE' };

// Layout
const autoLayout        = [ { key: 'primaryAxisSizingMode', value: 'AUTO' }, { key: 'counterAxisSizingMode', value: 'AUTO' } ];
const horizontal        = { key: 'layoutMode', value: 'HORIZONTAL' };
const vertical          = { key: 'layoutMode', value: 'VERTICAL' };

// Size
const minWidthLg        = { key: 'minWidth', value: 980 };
const maxWidthLg        = { key: 'maxWidth', value: 980 };
const minWidthMd        = { key: 'minWidth', value: 600 };
const maxWidthMd        = { key: 'maxWidth', value: 600 };
const minWidthSm        = { key: 'minWidth', value: 380 };
const maxWidthSm        = { key: 'maxWidth', value: 380 };
const minHeight         = { key: 'minHeight', value: 100 }

// Font
const fontReg           = { key: 'fontName', value: { family: "IBM Plex Mono", style: "Regular" } };
const fontMed           = { key: 'fontName', value: { family: "IBM Plex Mono", style: "Medium" } };
const fontUnderline     = { key: 'textDecoration', value: 'UNDERLINE' };
const fontDefault       = { key: 'textCase', value: 'ORIGINAL' };
const fontUpper         = { key: 'textCase', value: 'UPPER' };
const fontLower         = { key: 'textCase', value: 'LOWER' };
const font10            = { key: 'fontSize', value: 10 };
const font12            = { key: 'fontSize', value: 12 };
const font14            = { key: 'fontSize', value: 14 };
const font16            = { key: 'fontSize', value: 16 };
const font18            = { key: 'fontSize', value: 18 };

// Create default styles
export const mainFrame      = [ fillNone, strokePurple, strokeDashed, autoLayout, horizontal, minWidthLg, minHeight, primaryMin, counterMin, radius6, gap32, padding32 ];
export const compFrame      = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterMin, gap24 ];
export const compTitle      = [ fontMed, font18, fontLower, fillBlack ];
export const sectionFrame   = [ fillWhite, strokeNone, autoLayout, vertical, primaryMin, counterMin, gap24, padding24, radius4 ];
export const sectionTitle   = [ fontMed, font16, fontLower, fillBlack, fontUnderline ];
export const sectionCopy    = [ fontReg, font14, fontDefault, fillGrey ];
export const sectionLink    = [ fontReg, font14, fontDefault, fillBlue, fontUnderline ];