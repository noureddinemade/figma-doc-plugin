// Import
import { convertColour } from "../functions/general";

// Fill
const fillWhite         = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('FFFFFF') }]};
const fillOrange        = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('FFEEDA') }]};
const fillBlue          = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('DAEDFF') }]};
const fillRed           = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('FFC7C7') }]};
const fillPurple        = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('622BA9') }]};
const fillBlack         = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('000000') }]};
const fillGrey          = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('222222') }]};
const fillSubtle        = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('BBBBBB') }]};
const fillLightGrey     = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('EBEBEB') }]};
const fillLink          = { key: 'fills', value:[{ type: 'SOLID', color: convertColour('0000C9') }]};
const fillNone          = { key: 'fills', value:[]};

// Stroke
const strokePurple      = { key: 'strokes', value:[{ type: 'SOLID', color: convertColour('9747FF') }]};
const strokeBlack       = { key: 'strokes', value:[{ type: 'SOLID', color: convertColour('000000') }]};
const strokeLight       = { key: 'strokes', value:[{ type: 'SOLID', color: convertColour('EBEBEB') }]};
const strokeWhite       = { key: 'strokes', value:[{ type: 'SOLID', color: convertColour('FFFFFF') }]};
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
const wrapGap4          = { key: 'counterAxisSpacing', value: 4 };
const wrapGap8          = { key: 'counterAxisSpacing', value: 8 };
const wrapGap12         = { key: 'counterAxisSpacing', value: 12 };
const wrapGap16         = { key: 'counterAxisSpacing', value: 16 };
const wrapGap24         = { key: 'counterAxisSpacing', value: 24 };
const wrapGap32         = { key: 'counterAxisSpacing', value: 32 };

// Redius
const radius4           = { key: 'cornerRadius', value: 4 };
const radius6           = { key: 'cornerRadius', value: 6 };
const radius8           = { key: 'cornerRadius', value: 8 };
const radius10          = { key: 'cornerRadius', value: 10 };
const radiusSm          = { key: 'cornerRadius', value: 16 };
const radiusMd          = { key: 'cornerRadius', value: 24 };
const radiusLg          = { key: 'cornerRadius', value: 32 };

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
const wrap              = { key: 'layoutWrap', value: 'WRAP' };
const noContentClip     = { key: 'clipsContent', value: false };
const absolute          = { key: 'layoutPositioning', value: 'ABSOLUTE' };

// Size
const maxWidthXl        = { key: 'maxWidth', value: 1200 };
const minWidthLg        = { key: 'minWidth', value: 980 };
const maxWidthLg        = { key: 'maxWidth', value: 980 };
const minWidthMd        = { key: 'minWidth', value: 600 };
const maxWidthMd        = { key: 'maxWidth', value: 600 };
const minWidthSm        = { key: 'minWidth', value: 380 };
const maxWidthSm        = { key: 'maxWidth', value: 380 };
const minHeight         = { key: 'minHeight', value: 100 };
const equalSm           = [ { key: 'minWidth', value: 16 },{ key: 'maxWidth', value: 16 }, { key: 'minHeight', value: 16 }, { key: 'maxHeight', value: 16 } ];
const equalMd           = [ { key: 'minWidth', value: 24 },{ key: 'maxWidth', value: 24 }, { key: 'minHeight', value: 24 }, { key: 'maxHeight', value: 24 } ];
const equalLg           = [ { key: 'minWidth', value: 32 },{ key: 'maxWidth', value: 32 }, { key: 'minHeight', value: 32 }, { key: 'maxHeight', value: 32 } ];

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
const iconBoolean       = { key: 'vectorPaths', value: [{ windingRule: 'NONZERO', data: 'M 10 0 C 4.487111303541395 0 0 4.487111303541395 0 10 C 0 15.51288816663954 4.487111303541395 20 10 20 C 15.51288816663954 20 20 15.51288816663954 20 10 C 20 4.487111303541395 15.51288816663954 0 10 0 Z M 15.896809895833334 4.103190104166667 C 17.40362909105089 5.6100095642937555 18.333333333333336 7.69394424226549 18.333333333333336 10 C 18.333333333333336 14.61211151546902 14.61211151546902 18.333333333333336 10 18.333333333333336 C 7.69394424226549 18.333333333333336 5.6100095642937555 17.40362909105089 4.103190104166667 15.896809895833334 L 15.896809895833334 4.103190104166667 Z' }]};
const iconVariant       = { key: 'vectorPaths', value: [{ windingRule: 'NONZERO', data: 'M 20.000001907348633 10 L 10.059524536132812 20 L 0 10 L 10.059524536132812 0 L 20.000001907348633 10 Z' }] };
const iconText          = { key: 'vectorPaths', value: [ { windingRule: 'NONZERO', data: 'M 7.2337005637586085 0.00006854262319393456 C 7.164355263700881 0.0017281672742683442 7.095218198408244 0.008357731252908706 7.026821160465457 0.019906312227249146 L 0.725495548248289 0.019906312227249146 C 0.32502204338073243 0.019906312227249146 0 0.3449283599853516 0 0.7454019069671631 L 0 2.921888542175293 C 0 3.322362089157105 0.32502204338073243 3.647384262084961 0.725495548248289 3.647384262084961 L 1.450991096496578 3.647384262084961 C 1.8514646013641345 3.647384262084961 2.1764865493774455 3.322362089157105 2.1764865493774455 2.921888542175293 L 2.1764865493774455 2.1963930130004883 L 5.803964385986312 2.1963930130004883 L 5.803964385986312 13.804322814941408 L 5.078468551635758 13.804322814941408 C 4.677995046768202 13.804322814941408 4.352973098754891 14.129345178604128 4.352973098754891 14.529818725585939 L 4.352973098754891 15.25531463623047 C 4.352973098754891 15.65578818321228 4.677995046768202 15.980810546875 5.078468551635758 15.980810546875 L 7.019735742509396 15.980810546875 C 7.175504907380057 16.00639806687832 7.334405676116035 16.00639806687832 7.490174840986697 15.980810546875 L 9.431442031860335 15.980810546875 C 9.831915536727893 15.980810546875 10.156937103271517 15.65578818321228 10.156937103271517 15.25531463623047 L 10.156937103271517 14.529818725585939 C 10.156937103271517 14.129345178604128 9.831915536727893 13.804322814941408 9.431442031860335 13.804322814941408 L 8.705946197509782 13.804322814941408 L 8.705946197509782 2.1963930130004883 L 12.333423843383805 2.1963930130004883 L 12.333423843383805 2.921888542175293 C 12.333423843383805 3.322362089157105 12.658445409927428 3.647384262084961 13.058918914794985 3.647384262084961 L 13.784414749145538 3.647384262084961 C 14.184888254013096 3.647384262084961 14.509910583496094 3.322362089157105 14.509910583496094 2.921888542175293 L 14.509910583496094 0.7454019069671631 C 14.509910583496094 0.3449283599853516 14.184888254013096 0.019906312227249146 13.784414749145538 0.019906312227249146 L 7.487339758277026 0.019906312227249146 C 7.403537001481986 0.005880780518054962 7.31866488382795 -0.0007572893227916211 7.2337005637586085 0.00006854262319393456 Z' } ] };
const iconDependency    = { key: 'vectorPaths', value: [{ windingRule: 'EVENODD', data: 'M 11.482161521911621 22.82843780517578 L 22.828441619873047 11.414219856262207 L 11.482161521911621 0 L 0 11.414219856262207 L 11.482161521911621 22.82843780517578 Z M 5.15818452835083 11.414219856262207 L 11.466404914855957 5.142427921295166 L 17.70176887512207 11.414219856262207 L 11.466404914855957 17.686010360717773 L 5.15818452835083 11.414219856262207 Z' }] };

// Frame
const mainFrame         = [ fillNone, strokePurple, strokeDashed, autoLayout, horizontal, minWidthLg, minHeight, primaryMin, counterMin, radius6, gap32, padding32 ];
const compFrame         = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterMin, gap24, noContentClip, minWidthLg, maxWidthXl ];
const sectionFrame      = [ fillWhite, strokeNone, autoLayout, vertical, primaryMin, counterMin, gap24, padding24, radius8, noContentClip ];
const propFrame         = [ fillNone, strokeLight, strokeBottomSm, autoLayout, horizontal, primaryMin, counterMin, gap12, paddingBottom16 ];
const propFrameNoBorder = [ fillNone, strokeNone, autoLayout, horizontal, primaryMin, counterMin, gap12, paddingBottom16 ];
const typeFrame         = [ fillLightGrey, strokeNone, autoLayout, vertical, primaryCenter, counterCenter, paddingTop4, paddingBottom4, paddingRight8, paddingLeft8, radius4 ];
const valueFrame        = [ fillOrange, strokeNone, autoLayout, vertical, primaryCenter, counterCenter, paddingTop4, paddingBottom4, paddingRight8, paddingLeft8, radius4 ];
const defValueFrame     = [ fillBlue, strokeNone, autoLayout, vertical, primaryCenter, counterCenter, paddingTop4, paddingBottom4, paddingRight8, paddingLeft8, radius4 ];
const dependFrame       = [ fillRed, strokeNone, autoLayout, vertical, primaryCenter, counterCenter, paddingTop4, paddingBottom4, paddingRight8, paddingLeft8, radius4 ];
const optionsFrame      = [ fillNone, strokeNone, autoLayout, horizontal, wrap, primaryMax, counterMin, gap8, maxWidthMd, wrapGap8 ];
const smHFrame          = [ fillNone, strokeNone, autoLayout, horizontal, primaryMin, counterCenter, gap8 ];
const mdHFrame          = [ fillNone, strokeNone, autoLayout, horizontal, primaryMin, counterCenter, gap16 ];
const lgHFrame          = [ fillNone, strokeNone, autoLayout, horizontal, primaryMin, counterCenter, gap24 ];
const smVFrame          = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterMin, gap8 ];
const mdVFrame          = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterMin, gap16 ];
const lgVFrame          = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterMin, gap24 ];
const iconFrame         = [ fillNone, strokeNone, autoLayout, vertical, primaryMin, counterCenter, { key: 'minWidth', value: 20 } ];
const diagramFrame      = [ fillLightGrey, strokeNone, autoLayout, vertical, primaryCenter, counterCenter, padding24, radius4, minWidthSm ];
const keyFrame          = [ fillPurple, strokeWhite, strokeWeightSm, autoLayout, vertical, primaryCenter, counterCenter, equalSm, radiusSm ];

// Text
const compTitle         = [ fontInterSbl, font24, fontDefault, fillBlack ];
const sectionTitle      = [ fontInterMed, font18, fontTitle, fillBlack, fontUnderline ];
const sectionCopy       = [ fontInterReg, font16, fontDefault, fillGrey ];
const sectionLink       = [ fontPlexReg, font16, fontDefault, fillLink, fontUnderline ];
const propTitle         = [ fontPlexReg, font14, fontLower, fillBlack ];
const valueLabel        = [ fontPlexReg, font12, fontUpper, fillBlack ];
const keyLabel          = [ fontPlexReg, font10, fontUpper, fillWhite ];

// Shapes
const keyLine           = [ strokePurple, strokeWeightMd ];

// Create styles
export const frame:         any = {

    main:       mainFrame,
    comp:       compFrame,
    section:    sectionFrame,
    property:   { reg: propFrame, last: propFrameNoBorder },
    type:       typeFrame,
    value:      valueFrame,
    default:    defValueFrame,
    dependency: dependFrame,
    h:          { sm: smHFrame, md: mdHFrame, lg: lgHFrame },
    v:          { sm: smVFrame, md: mdVFrame, lg: lgVFrame },
    icon:       iconFrame,
    diagram:    diagramFrame,
    key:        keyFrame,
    options:    optionsFrame

}
export const text:          any = {

    title:      { comp: compTitle, section: sectionTitle, prop: propTitle },
    section:    { copy: sectionCopy, link: sectionLink },
    label:      { value: valueLabel, key: keyLabel }

}
export const iconVector:    any = {

    BOOLEAN:        [iconBoolean, fillSubtle, strokeNone, strokeWeightNone],
    TEXT:           [iconText, fillSubtle, strokeNone, strokeWeightNone],
    VARIANT:        [iconVariant, fillSubtle, strokeNone, strokeWeightNone],
    INSTANCE_SWAP:  [iconDependency, fillSubtle, strokeNone, strokeWeightNone]

}

export const shape:         any = {

    key: keyLine

}