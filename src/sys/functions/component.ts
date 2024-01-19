// Import
import { styleAreas, styles } from "../data/arrays";
import { rgbToHex } from "./colours";
import { makeInstance } from "./create";
import { cleanString, getHeirachy, isArray } from "./general";

// Check radius
function checkEqualSides(sides: any[]) {

    // Set up
    let response: any = sides;

    // Check if radius array is available
    if (isArray(sides)) {

        const t: any = sides[0] ? sides[0] : null;
        const l: any = sides[1] ? sides[1] : null;
        const b: any = sides[2] ? sides[2] : null;
        const r: any = sides[3] ? sides[3] : null;

        t === l && l === b && b === r ? response = t : response = [t,l,b,r];

    }

    //
    return response;

}

// Check sides of a style
function checkEqualSidesOfStyle(sides: any[], response: any, style: any, name: any) {

    if (isArray(sides, 4, 'e')) {

        // Check radius values and tokens
        let value: any = checkEqualSides([sides[0].value, sides[1].value, sides[2].value, sides[3].value]);
        let token: any = checkEqualSides([sides[0].token, sides[1].token, sides[2].token, sides[3].token]);

        response.styles = response.styles.filter((a: any) => a.name !== sides[0].name);
        response.styles = response.styles.filter((a: any) => a.name !== sides[1].name);
        response.styles = response.styles.filter((a: any) => a.name !== sides[2].name);
        response.styles = response.styles.filter((a: any) => a.name !== sides[3].name);

        if (isArray(value, 4, 'e') && isArray(token, 4, 'e')) {

            value = `${value[0]} ${value[1]} ${value[2]} ${value[3]}`;
            token = `${token[0]} ${token[1]} ${token[2]} ${token[3]}`;

        }

        if (isArray(value, 2, 'e') && isArray(token, 2, 'e')) {

            value = `${value[0]} ${value[1]}`;
            token = `${token[0]} ${token[1]}`;

        }

        // Push to responses
        response.styles.push({ name: name, category: style, value: value, token: token, text: null, effect: null });

    }

}

// Check style
function checkStyleSides(response: any, style: any, name: any) {

    let i: any = { t: '', r: '', b: '', l: '' };

    if (name === 'radius') { i.t = 'topRightRadius', i.r = 'topLeftRadius', i.b = 'bottomRightRadius', i.l = 'bottomLeftRadius' };
    if (name === 'padding') { i.t = 'paddingTop', i.r = 'paddingRight', i.b = 'paddingBottom', i.l = 'paddingLeft' };
    if (name === 'borderWeight') { i.t = 'strokeTopWeight', i.r = 'strokeRightWeight', i.b = 'strokeBottomWeight', i.l = 'strokeLeftWeight' };


    let checkStyle: any = response.styles.filter((a: any) => a.category === style);
    let top:        any = checkStyle ? checkStyle.filter((a: any) => a.name === i.t) : null;
    let left:       any = checkStyle ? checkStyle.filter((a: any) => a.name === i.r) : null;
    let right:      any = checkStyle ? checkStyle.filter((a: any) => a.name === i.b) : null;
    let bottom:     any = checkStyle ? checkStyle.filter((a: any) => a.name === i.l) : null;
        top             = isArray(top) ? top[0] : null
        left            = isArray(left) ? left[0] : null
        bottom          = isArray(bottom) ? bottom[0] : null
        right           = isArray(right) ? right[0] : null
        checkStyle      = top && left && bottom && right ? [top, right, bottom, left] : null;

    if (isArray(checkStyle)) { checkEqualSidesOfStyle(checkStyle, response, style, name) };

}

// Is parent a COMPONENT_SET
export function belongsToComponentSet(item: any) {

    return item.type === 'COMPONENT_SET' ? true : false;

}

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

// Return true if there is no specified style
function emptyStyle(array: any, style: any, type: any) {

    // Set up
    let newArray: any  = styles[type];
        newArray       = newArray.filter((a: any) => a === style);

    if (!isArray(array) && isArray(newArray)) { return true };

}

// Check if there are multiple tokens
function multipleTokens(array: any[]) {

    // Set up
    let response: any[] = [];

    // Loop thru array
    array.forEach((i: any) => { if (i.token) { response.push(i.token)} });

    // Check count
    return response.length > 1 ? 'multiple tokens' : response;

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

// Replace default figma colour format
function replaceColour(colour: any, response: any, name: any, category: any) {

    // Set up
    let prop: any;

    if (name === 'fills')   { prop = 'background' };
    if (name === 'strokes') { prop = 'border' };
    if (name === 'effects') { prop = 'dropShadow' };

    if (colour) {

        response.styles = response.styles.filter((a: any) => a.name !== name );

        response.styles.push({ name: `${prop}Colour`, category: category, value: colour.hex, token: colour.token, text: null, effect: null });
        if (name == 'fills') { response.styles.push({ name: `${prop}Type`, category: category, value: colour.type, token: colour.token, text: null, effect: null }) }
        response.styles.push({ name: `${prop}Opacity`, category: category, value: colour.opacity, token: colour.token, text: null, effect: null })

    }

}

// Fix default figma colour format
function fixColourStyle(array: any, response: any) {

    if (array[0].value.visible) {

        // Set up
        let fill:       any = array[0];
        let name:       any = 'background';
        let value:      any = fill.value;
        let token:      any = fill.token;
        let hex:        any = rgbToHex([value.color.r, value.color.g, value.color.b]);
        let type:       any = value.type.toLowerCase();
        let opacity:    any = value.opacity;
        let blend:      any = value.blendMode.toLowerCase();
            value           = `#${hex} ${opacity} ${type} ${blend}`;

        // Add to response styles
        response.styles.push({ name: name, category: 'fills', value: value, token: token });

    }

    // Get rid of old style
    response.styles = response.styles.filter((a: any) => a.name !== 'fills' );

}

// Fix default figma stroke format
function fixStrokeStyle(array: any, response: any) {

    // Set up
    let weights:    any = array.filter((a: any) => a.name.includes('Weight'));
    let dash:       any = array.filter((a: any) => a.name === 'dashPattern');
    let fill:       any = array.filter((a: any) => a.name === 'strokes');
    let token:      any = multipleTokens([...weights, ...dash, ...fill]);
    let border:     any;

        weights         = isArray(weights, 4, 'e') ? [weights[0].value, weights[1].value, weights[2].value, weights[3].value] : null;
        weights         = isArray(weights) ? checkEqualSides(weights) : null;
        weights         = isArray(weights) ? `${weights[0]} ${weights[1]} ${weights[2]} ${weights[3]}` : weights;
        dash            = isArray(dash) ? `dashed (${dash[0]}, ${dash[1]})` : 'solid';
        fill            = isArray(fill) ? fill[0] : null;
        fill            = `#${rgbToHex([fill.value.color.r, fill.value.color.g, fill.value.color.b])}`;
        token           = isArray(token) ? token[0] : token;
        border          = `${weights} ${dash} ${fill}`;

    // Get rid of old style
    response.styles = response.styles.filter((a: any) => a.category !== 'strokes' );

    // Add to styles
    response.styles.push({ name: 'border', category: 'strokes', value: border, token: token });

}

// Return cleaned result for effect
function cleanEffect(item: any, response: any, token: any) {

    // Set up
    let e:          any = item;
    let name:       any = e.type;
    let colour:     any = e.color ? `#${rgbToHex([e.color.r, e.color.g, e.color.b])}` : '';
    let opacity:    any = e.color && e.color.a ? e.color.a : '1';
    let offset:     any = e.offset ? `${e.offset.x} ${e.offset.y}` : '0 0';
    let radius:     any = e.radius ? e.radius : '0';
    let spread:     any = e.spread ? e.spread : '0';
    let value:      any = `${offset} ${radius} ${spread} ${colour} ${opacity} ${name === 'INNER_SHADOW' ? 'inset' : ''}`;

    // Clean effect name
    if (name === 'DROP_SHADOW')     { name = 'boxShadow' };
    if (name === 'INNER_SHADOW')    { name = 'boxShadow' };
    if (name === 'BACKGROUND_BLUR') { name = 'backgdropFilter' };
    if (name === 'LAYER_BLUR')      { name = 'filter' };

    response.styles.push({ name: name, category: 'effects', value: value, token: token });

}

// Fix default figma effect format
function fixEffectStyle(array: any, response: any) {

    // Set up
    let effect:     any = array[0];
    let token:      any = effect.effect;
    let effects:    any = effect.value;

    // Get rid of old style
    response.styles = response.styles.filter((a: any) => a.category !== 'effects' );

    // Check if there are multiple effects
    if (isArray(effects, 1, 'm')) { effects.forEach((e: any) => { if (e.visible) { cleanEffect(e, response, token) } }) }
    else { let e: any = effects[0]; if (e.visible) { cleanEffect(e, response, token) } };

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
    if (response && isArray(response.styles)) {

        // Check styles
        let fills:      any = response.styles.filter((a: any) => a.name === 'fills');
        let stroke:     any = response.styles.filter((a: any) => a.category === 'strokes');
        let effect:     any = response.styles.filter((a: any) => a.name === 'effects');

        // Fix fills and strokes
        if (isArray(fills))  { fixColourStyle(fills, response) };
        if (isArray(stroke)) { fixStrokeStyle(stroke, response) };
        if (isArray(effect)) { fixEffectStyle(effect, response) };

        // Check styles with 4 sides
        checkStyleSides(response, 'general', 'radius');
        checkStyleSides(response, 'layout', 'padding');

        // Check width and height
        let horizontal:     any = response.styles.filter((a: any) => a.name === 'layoutSizingHorizontal');
        let vertical:       any = response.styles.filter((a: any) => a.name === 'layoutSizingVertical');
        let width:          any = response.styles.filter((a: any) => a.name === 'width');
        let height:         any = response.styles.filter((a: any) => a.name === 'height');
            horizontal          = isArray(horizontal) ? horizontal[0].value : null;
            vertical            = isArray(vertical) ? vertical[0].value : null;
            width               = isArray(width) ? width[0] : null;
            height              = isArray(height) ? height[0] : null;
        
        let value: any;
        let token: any;

        if (horizontal === 'HUG' || horizontal === 'FILL' && width) { 
            
            value = 'AUTO'; token = null;

            response.styles = response.styles.filter((a: any) => a.name !== 'width' );

            response.styles.push({ name: 'width', category: 'layout', value: value, token: token, text: null, effect: null });
        
        };

        if (vertical === 'HUG' || vertical === 'FILL' && height) { 
            
            value = 'AUTO'; token = null;

            response.styles = response.styles.filter((a: any) => a.name !== 'height' );

            response.styles.push({ name: 'height', category: 'layout', value: value, token: token, text: null, effect: null });

        }

        // Add unique matches 
        if (isArray(base)) {

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
            if (isArray(uniques)) { response.styles = uniques }
            else { response.styles = null };

        }

    }

    //
    return response;

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