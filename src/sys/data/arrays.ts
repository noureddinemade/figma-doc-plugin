export const styles: any = {

    general:    ['opacity', 'visible', 'borderRadius', 'topRightRadius', 'topLeftRadius', 'bottomRightRadius', 'bottomLeftRadius'],
    layout:     ['layoutMode', 'primaryAxisAlignItems', 'counterAxisAlignItems', 'layoutSizingHorizontal', 'layoutSizingVertical', 'constraints', 'width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight', 'itemSpacing', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    fills:      ['fills', 'backgroundColour', 'backgroundType', 'backgroundOpacity'],
    strokes:    ['strokes', 'strokeTopWeight', 'strokeRightWeight', 'strokeBottomWeight', 'strokeLeftWeight', 'dashPattern', 'borderWeight', 'borderColour', 'borderStyle', 'borderOpacity'],
    effects:    ['effects', 'dropShadow', 'innerShadow', 'layerBlur', 'backgroundBlur'],
    text:       ['fontName', 'fontSize', 'fontWeight', 'textAlignHorizontal', 'textAlignVertical', 'textAutoResize', 'textCase', 'textDecoration', 'textTruncation', 'lineHeight', 'letterSpacing']

}

export const styleAreas = Object.keys(styles);