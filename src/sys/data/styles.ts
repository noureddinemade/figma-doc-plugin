// Import
import { convertColour } from "../functions/general";

// Fills
const fillWhite         = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('FFFFFF') }]};
const fillOrange        = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('FFEEDA') }]};
const fillBlue          = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('DAEDFF') }]};
const fillRed           = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('FFC7C7') }]};
const fillBlack         = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('000000') }]};
const fillGrey          = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('222222') }]};
const fillLightGrey     = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('EBEBEB') }]};
const fillLink          = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('0000C9') }]};
const fillNone          = { key: 'fills', value:[]};

// Strokes
const strokePurple      = { key: 'strokes', value:[{ type: 'SOLID', color: convertColour('9747FF') }]};
const strokeBlack       = { key: 'strokes', value:[{ type: 'SOLID', color: convertColour('000000') }]};
const strokeLight       = { key: 'strokes', value:[{ type: 'SOLID', color: convertColour('EBEBEB') }]};
const strokeNone        = { key: 'strokes', value: [] };
const strokeDashed      = { key: 'dashPattern', value: [10,5] };
const strokeSolid       = { key: 'dashPattern', value: [] };
const strokeTopSm       = { key: 'strokeTopWeight', value: 1 };
const strokeRightSm     = { key: 'strokeRightWeight', value: 1 };
const strokeBottomSm    = { key: 'strokeBottomWeight', value: 1 };
const strokeLeftSm      = { key: 'strokeLeftWeight', value: 1 };
const strokeTopMd       = { key: 'strokeTopWeight', value: 2 };
const strokeRightMd     = { key: 'strokeRightWeight', value: 2 };
const strokeBottomMd    = { key: 'strokeBottomWeight', value: 2 };
const strokeLeftMd      = { key: 'strokeLeftWeight', value: 2 };
const strokeWeightNone  = { key: 'strokeWeight', value: 0 }
const strokeWeightSm    = [ strokeTopSm, strokeRightSm, strokeBottomSm, strokeLeftSm ];
const strokeWeightMd    = [ strokeTopMd, strokeRightMd, strokeBottomMd, strokeLeftMd ];

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
const fontPlexReg       = { key: 'fontName', value: { family: "IBM Plex Mono", style: "Regular" } };
const fontPlexMed       = { key: 'fontName', value: { family: "IBM Plex Mono", style: "Medium" } };
const fontInterReg      = { key: 'fontName', value: { family: "Inter", style: "Regular" } };
const fontInterMed      = { key: 'fontName', value: { family: "Inter", style: "Medium" } };
const fontInterSbl      = { key: 'fontName', value: { family: "Inter", style: "Semi Bold" } };
const fontUnderline     = { key: 'textDecoration', value: 'UNDERLINE' };
const fontDefault       = { key: 'textCase', value: 'ORIGINAL' };
const fontUpper         = { key: 'textCase', value: 'UPPER' };
const fontLower         = { key: 'textCase', value: 'LOWER' };
const fontTitle         = { key: 'textCase', value: 'TITLE' };
const font10            = { key: 'fontSize', value: 10 };
const font12            = { key: 'fontSize', value: 12 };
const font14            = { key: 'fontSize', value: 14 };
const font16            = { key: 'fontSize', value: 16 };
const font18            = { key: 'fontSize', value: 18 };
const font20            = { key: 'fontSize', value: 20 };
const font24            = { key: 'fontSize', value: 24 };

// Vectors
const iconBoolean       = { key: 'vectorPaths', value: [{ windingRule: 'NONZERO', data: 'M 15 0 C 6.081703186035156 0 0.32098812609910965 9.211180254817009 0.216796875 9.37890625 C 0.07655338943004608 9.555562853813171 0.00015162266208790243 9.774443432688713 0 10 C 0.00017740319890435785 10.193499132990837 0.056489989161491394 10.38279077410698 0.162109375 10.544921875 C 0.1634045746177435 10.546879453351721 0.1647066727746278 10.548832840519026 0.166015625 10.55078125 C 0.18320928514003754 10.586261250078678 5.018831253051758 20 15 20 C 24.93882179260254 20 29.76732587441802 10.678741127252579 29.826171875 10.564453125 C 29.830152227077633 10.557987491600215 29.834058563923463 10.55147648602724 29.837890625 10.544921875 C 29.943509876728058 10.382790744304657 29.999822709854925 10.193499103188515 30 10 C 29.999964718004776 9.77534581720829 29.924284145236015 9.557247951626778 29.78515625 9.380859375 C 29.784506149357185 9.380207476264331 29.78385502373567 9.379556350642815 29.783203125 9.37890625 C 29.67901212722063 9.211180254817009 23.918296813964844 0 15 0 Z M 15 3 C 18.865999937057495 3 22 6.134000062942505 22 10 C 22 13.865999937057495 18.865999937057495 17 15 17 C 11.134000062942505 17 8 13.865999937057495 8 10 C 8 6.134000062942505 11.134000062942505 3 15 3 Z M 15 7 C 14.204350531101227 7 13.441288411617279 7.316070139408112 12.878679275512695 7.878679275512695 C 12.316070139408112 8.441288411617279 12 9.204350531101227 12 10 C 12 10.795649468898773 12.316070139408112 11.558711588382721 12.878679275512695 12.121320724487305 C 13.441288411617279 12.683929860591888 14.204350531101227 12.999999999999996 15 13 C 15.795649468898773 12.999999999999996 16.55871158838272 12.683929860591888 17.121320724487305 12.121320724487305 C 17.68392986059189 11.558711588382721 17.999999999999996 10.795649468898773 18 10 C 17.999999999999996 9.204350531101227 17.68392986059189 8.441288411617279 17.121320724487305 7.878679275512695 C 16.55871158838272 7.316070139408112 15.795649468898773 7 15 7 Z' }]};
const iconVariant       = { key: 'vectorPaths', value: [{ windingRule: 'NONZERO', data: 'M 20.000001907348633 10 L 10.059524081258825 20 L 0 10 L 10.059524081258825 0 L 20.000001907348633 10 Z' }] };
const iconText          = { key: 'vectorPaths', value: [ { windingRule: 'NONZERO', data: 'M 9.042126625776291 0.00008567828651848181 C 8.9554449917751 0.0021602089926668275 8.86902342782887 0.010447164779382748 8.783527117967605 0.024882891084978424 L 0.9068695068359374 0.024882891084978424 C 0.4062775696208215 0.024882891084978424 0 0.43116045258374647 0 0.9317523687312483 L 0 3.652360682301611 C 0 4.152952598449113 0.4062775696208215 4.559230216253752 0.9068695068359374 4.559230216253752 L 1.8137390136718747 4.559230216253752 C 2.3143309508869905 4.559230216253752 2.7206085205078123 4.152952598449113 2.7206085205078123 3.652360682301611 L 2.7206085205078123 2.74549114834947 L 7.254956054687499 2.74549114834947 L 7.254956054687499 17.25540369158373 L 6.348086547851562 17.25540369158373 C 5.847494610636446 17.25540369158373 5.441217041015625 17.661681309388367 5.441217041015625 18.16227322553587 L 5.441217041015625 19.069142759488013 C 5.441217041015625 19.569734675635516 5.847494610636446 19.976012293440153 6.348086547851562 19.976012293440153 L 8.77467097043991 19.976012293440153 C 8.969382451243352 20.007996694973283 9.168007685475397 20.007996694973283 9.362719166278838 19.976012293440153 L 11.789303588867186 19.976012293440153 C 12.289895526082303 19.976012293440153 12.696173095703124 19.569734675635516 12.696173095703124 19.069142759488013 L 12.696173095703124 18.16227322553587 C 12.696173095703124 17.661681309388367 12.289895526082303 17.25540369158373 11.789303588867186 17.25540369158373 L 10.88243408203125 17.25540369158373 L 10.88243408203125 2.74549114834947 L 15.416781616210937 2.74549114834947 L 15.416781616210937 3.652360682301611 C 15.416781616210937 4.152952598449113 15.823059185831756 4.559230216253752 16.323651123046872 4.559230216253752 L 17.23052062988281 4.559230216253752 C 17.731112567097927 4.559230216253752 18.13739013671875 4.152952598449113 18.13739013671875 3.652360682301611 L 18.13739013671875 0.9317523687312483 C 18.13739013671875 0.43116045258374647 17.731112567097927 0.024882891084978424 17.23052062988281 0.024882891084978424 L 9.359175554123551 0.024882891084978424 C 9.254422096323953 0.007350976989208412 9.148332036278468 -0.0009466116686223691 9.042126625776291 0.00008567828651848181 Z' } ] };
const iconDependency    = { key: 'vectorPaths', value: [{ windingRule: 'EVENODD', data: 'M 11.482161521911621 22.82843780517578 L 22.828441619873047 11.414219856262207 L 11.482161521911621 0 L 0 11.414219856262207 L 11.482161521911621 22.82843780517578 Z M 5.15818452835083 11.414219856262207 L 11.466404914855957 5.142427921295166 L 17.70176887512207 11.414219856262207 L 11.466404914855957 17.686010360717773 L 5.15818452835083 11.414219856262207 Z' }] };

// Create styles
export const mainFrame      = [ fillNone, strokePurple, strokeDashed, autoLayout, horizontal, minWidthLg, minHeight, primaryMin, counterMin, radius6, gap32, padding32 ];
export const compFrame      = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterMin, gap24 ];

export const sectionFrame   = [ fillWhite, strokeNone, autoLayout, vertical, primaryMin, counterMin, gap24, padding24, radius8 ];
export const propFrame      = [ fillNone, strokeLight, strokeBottomSm, autoLayout, horizontal, primaryMin, counterCenter, gap12, paddingBottom16 ];
export const typeFrame      = [ fillLightGrey, strokeNone, autoLayout, vertical, primaryCenter, counterCenter, paddingTop4, paddingBottom4, paddingRight8, paddingLeft8, radius4 ];
export const valueFrame     = [ fillOrange, strokeNone, autoLayout, vertical, primaryCenter, counterCenter, paddingTop4, paddingBottom4, paddingRight8, paddingLeft8, radius4 ];
export const defValueFrame  = [ fillBlue, strokeNone, autoLayout, vertical, primaryCenter, counterCenter, paddingTop4, paddingBottom4, paddingRight8, paddingLeft8, radius4 ];
export const dependFrame    = [ fillRed, strokeNone, autoLayout, vertical, primaryCenter, counterCenter, paddingTop4, paddingBottom4, paddingRight8, paddingLeft8, radius4 ];

export const smHFrame       = [ fillNone, strokeNone, autoLayout, horizontal, primaryMin, counterCenter, gap8 ];
export const mdHFrame       = [ fillNone, strokeNone, autoLayout, horizontal, primaryMin, counterCenter, gap16 ];
export const lgHFrame       = [ fillNone, strokeNone, autoLayout, horizontal, primaryMin, counterCenter, gap24 ];
export const smVFrame       = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterCenter, gap8 ];
export const mdVFrame       = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterCenter, gap16 ];
export const lgVFrame       = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterCenter, gap24 ];

export const compTitle      = [ fontInterSbl, font18, fontDefault, fillBlack ];
export const sectionTitle   = [ fontInterMed, font16, fontTitle, fillBlack, fontUnderline ];
export const sectionCopy    = [ fontInterReg, font14, fontDefault, fillGrey ];
export const sectionLink    = [ fontPlexReg, font14, fontDefault, fillLink, fontUnderline ];
export const propTitle      = [ fontPlexMed, font14, fontLower, fillBlack ];
export const valueLabel     = [ fontPlexReg, font12, fontUpper, fillBlack ];

export const iconVector        = {

    BOOLEAN:    [iconBoolean, fillGrey, strokeNone, strokeWeightNone],
    TEXT:       [iconText, fillGrey, strokeNone, strokeWeightNone],
    VARIANT:    [iconVariant, fillGrey, strokeNone, strokeWeightNone],
    DEPENDENCY: [iconDependency, fillGrey, strokeNone, strokeWeightNone]

}