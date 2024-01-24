// Import
import { styleAreas, styles } from "../data/arrays";
import { rgbToHex } from "./colours";
import { cleanNumber, cleanString, getHeirachy, isArray, isSymbol } from "./general";

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
export function belongsToInstance(node: any, dependencies: any[]): boolean {

    // Check if node exists and has a parent
    if (node && node.parent && isArray(dependencies)) {

        // Look for a match
        const match: any = dependencies.filter((a: any) => a.name === node.name);

        // Return response
        return isArray(match) ? true : belongsToInstance(node.parent, dependencies);

    } else { return false };

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
function multipleTokens(array: any[], type: any = 'token') {

    // Set up
    let response:   any[] = [];

    // Loop thru array
    array.forEach((i: any) => { if (i[type] && !response.includes(i[type])) { response.push(i[type])} });

    // Check count
    return response.length > 1 ? 'multiple tokens' : response[0];

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

// Fix default figma colour format
function fixColourStyle(array: any, response: any) {

    // Get rid of old style
    response.styles = response.styles.filter((a: any) => a.name !== 'fills' );

    // Check if fill is visible
    if (array[0].value.visible && array[0].value.type === 'SOLID') {

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

}

// Fix default figma stroke format
function fixStrokeStyle(array: any, response: any) {

    // Set up
    let weights:    any = array.filter((a: any) => a.name.includes('Weight'));
    let dash:       any = array.filter((a: any) => a.name === 'dashPattern');
    let fill:       any = array.filter((a: any) => a.name === 'strokes');
    let token:      any = multipleTokens([...weights, ...dash, ...fill]);
    let border:     any;

        weights         = isArray(weights) ? checkEqualSides(weights) : null;
        dash            = isArray(dash) ? `dashed (${dash[0]}, ${dash[1]})` : 'solid';
        fill            = isArray(fill) ? fill[0] : null;
        fill            = `#${rgbToHex([fill.value.color.r, fill.value.color.g, fill.value.color.b])}`;
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
    let opacity:    any = e.color && e.color.a ? cleanNumber(e.color.a, 2) : '1';
    let offset:     any = e.offset ? `${e.offset.x} ${e.offset.y}` : '0 0';
    let radius:     any = e.radius ? e.radius : '0';
    let spread:     any = e.spread ? e.spread : '0';
    let value:      any = `${offset} ${radius} ${spread} ${colour} ${opacity} ${name === 'INNER_SHADOW' ? 'inset' : ''}`;

    // Update value if it's a filter
    if (name === 'BACKGROUND_BLUR' || name === 'LAYER_BLUR') { value = `blur(${radius})` };

    // Clean effect name
    if (name === 'DROP_SHADOW')     { name = 'boxShadow' };
    if (name === 'INNER_SHADOW')    { name = 'boxShadow' };
    if (name === 'BACKGROUND_BLUR') { name = 'backdropFilter' };
    if (name === 'LAYER_BLUR')      { name = 'filter' };

    // Push to response
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
    else if (isArray(effects, 1, 'e')) { let e: any = effects[0]; if (e.visible) { cleanEffect(e, response, token) } }
    else { let e: any = effects; if (e.visible) { cleanEffect(e, response, token) } };

}

// Check equal sides
function checkEqualSides(sides: any[]) {

    // Set up
    let response: any;

    // Check if radius array is available
    if (isArray(sides)) {

        let t:  any = sides[0] && sides[0].value ? sides[0].value : null;
        let l:  any = sides[1] && sides[1].value ? sides[1].value : null;
        let b:  any = sides[2] && sides[2].value ? sides[2].value : null;
        let r:  any = sides[3] && sides[3].value ? sides[3].value : null;

            t       = t ? cleanNumber(t) : null;
            l       = l ? cleanNumber(l) : null;
            b       = b ? cleanNumber(b) : null;
            r       = r ? cleanNumber(r) : null;


        t === l && l === b && b === r ? response = t : response = sides.map((a: any) => a.value).join(' ');

    }

    //
    return response;

}

// Fix default figma padding format
function fixBoundingSides(array: any, response: any, type: string, category: string) {

    // Set up
    let sides:  any = checkEqualSides(array);
    let token:  any = multipleTokens(array);

    // Get rid of old styles
    response.styles = response.styles.filter((a: any) => !a.name.includes(type));

    // Add to response
    response.styles.push({ name: type.toLowerCase(), category: category, value: sides, token: token, text: null, effect: null });



}

// Check if the text value is mixed
function checkTextValue(response: any) {

    // Set ep
    let result: any = response;

    // Check
    result = isArray(result) ? result[0] : null;
    result = result ? result.value : null;
    result = isSymbol(result) ? null : result;

    //
    return result;

}

// Fix default figma text format
function fixTextStyles(array: any, response: any) {

    // Set up
    let result: any;
    let token: any = multipleTokens(array, 'text');

    // Get
    let name:   any = array.filter((a: any) => a.name === 'fontName');
    let style:  any = '';
    let size:   any = array.filter((a: any) => a.name === 'fontSize');
    let weight: any = array.filter((a: any) => a.name === 'fontWeight');
    let tCase:  any = array.filter((a: any) => a.name === 'textCase');
    let decor:  any = array.filter((a: any) => a.name === 'textDecoration');
    let space:  any = array.filter((a: any) => a.name === 'letterSpacing');
    let align:  any = array.filter((a: any) => a.name === 'textAlignHorizontal');

        style       = checkTextValue(name) ? `${name.style} ` : 'Mixed ';
        name        = checkTextValue(name) ? `${name.family} ` : 'Mixed ';
        size        = checkTextValue(size) ? `${cleanNumber(size, 2)} ` : 'Mixed ';
        weight      = checkTextValue(weight) ? `(${weight}) ` : '(Mixed) ';
        tCase       = checkTextValue(tCase) ? tCase : 'Mixed';
        tCase       = tCase && tCase !== 'ORIGINAL' ? `${tCase} ` : ''; 
        decor       = checkTextValue(decor) ? decor : 'Mixed';
        decor       = decor && decor !== 'NONE' ? `${decor} ` : '';
        space       = checkTextValue(space) ? space.value : 'Mixed';
        space       = space && space !== 0 ? `${space} ` : '';
        align       = isArray(align) ? `${align[0].value} ` : '';

        result      = `${size}${name}${style}${weight}${space}${tCase}${decor}${align}`;

    // Remove default styles
    response.styles = response.styles.filter((a: any) => a.category !== 'text');

    // Add new style
    response.styles.push({ name: 'font', category: 'text', value: result, token: token, text: null, effect: null });


}

// Fix default figma layout format
function fixLayoutStyle(layout: any, response: any) {

    // Adjust height and width
    let horizontal:     any = layout.filter((a: any) => a.name === 'layoutSizingHorizontal');
    let vertical:       any = layout.filter((a: any) => a.name === 'layoutSizingVertical');
    let width:          any = layout.filter((a: any) => a.name === 'width');
    let height:         any = layout.filter((a: any) => a.name === 'height');
        horizontal          = isArray(horizontal) ? horizontal[0].value : null;
        vertical            = isArray(vertical) ? vertical[0].value : null;
        width               = isArray(width) ? width[0] : null;
        height              = isArray(height) ? height[0] : null;
    
    let hValue: any;
    let vValue: any;
    let token:  any;

    // Remove old width and height
    layout = layout.filter((a: any) => a.name !== 'width' );
    layout = layout.filter((a: any) => a.name !== 'height' );

    if (horizontal === 'HUG' || horizontal === 'FILL' && width) { hValue = 'AUTO'; token = null } 
    else { hValue = cleanNumber(width.value) }

    if (vertical === 'HUG' || vertical === 'FILL' && height) { vValue = 'AUTO'; token = null }
    else { vValue = cleanNumber(height.value) }

    // Add new width and height
    layout.push({ name: 'width', category: 'layout', value: hValue, token: token, text: null, effect: null });
    layout.push({ name: 'height', category: 'layout', value: vValue, token: token, text: null, effect: null });

    // Adjust mode
    let mode:   any = layout.filter((a: any) => a.name === 'layoutMode');
        mode        = mode[0];

    // Fix layout
    if (mode && mode.value === 'NONE') {

        // Remove default styles
        layout = layout.filter((a: any) => a.name !== 'primaryAxisAlignItems'   );
        layout = layout.filter((a: any) => a.name !== 'counterAxisAlignItems'   );
        layout = layout.filter((a: any) => a.name !== 'layoutSizingHorizontal'  );
        layout = layout.filter((a: any) => a.name !== 'layoutSizingVertical'    );
        layout = layout.filter((a: any) => a.name !== 'layoutMode'              );

    }

    // Clear original styles
    response.styles = response.styles.filter((a: any) => a.category !== 'layout');
    if (isArray(layout)) { layout.forEach((i: any) => response.styles.push(i) )};

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
        let padding:    any = response.styles.filter((a: any) => a.name.includes('padding'));
        let radius:     any = response.styles.filter((a: any) => a.name.includes('Radius'));
        let text:       any = response.styles.filter((a: any) => a.category === 'text');
        let layout:     any = response.styles.filter((a: any) => a.category === 'layout');

        // Fix styles
        if (isArray(fills))     { fixColourStyle(fills, response)                               };
        if (isArray(stroke))    { fixStrokeStyle(stroke, response)                              };
        if (isArray(effect))    { fixEffectStyle(effect, response)                              };
        if (isArray(layout))    { fixLayoutStyle(layout, response)                              };
        if (isArray(padding))   { fixBoundingSides(padding, response, 'padding', 'layout')      };
        if (isArray(radius))    { fixBoundingSides(radius, response, 'Radius', 'general')       };
        if (isArray(text))      { if (type === 'TEXT') { fixTextStyles(text, response) }        };

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

            // Set up
            const isInstance:       any = isArray(dependencies) ? dependencies.filter((a: any) => a.name === c.name) : null;
            const belongsToInst:    any = belongsToInstance(c, dependencies);
            const childBase:        any = base ? base.filter((a: any) => a.name === c.name) : null;
            
            if (!isArray(isInstance) && !belongsToInst) {

                const childStyle = getStyleFromNode(c, def, childBase);
                response.push(childStyle);
                
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