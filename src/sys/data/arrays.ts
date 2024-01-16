export const styles: any = {

    general:    ['opacity', 'visible'],
    radius:     ['topRightRadius', 'topLeftRadius', 'bottomRightRadius', 'bottomLeftRadius'],
    layout:     ['layoutMode', 'primaryAxisAlignItems', 'counterAxisAlignItems', 'layoutSizingHorizontal', 'layoutSizingVertical', 'constraints', 'width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight', 'itemSpacing'],
    spacing:    ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    fills:      ['fills'],
    strokes:    ['strokes', 'strokeTopWeight', 'strokeRightWeight', 'strokeBottomWeight', 'strokeLeftWeight', 'strokeAlign', 'dashPattern'],
    effects:    ['effects'],
    text:       ['fontName', 'fontSize', 'fontWeight', 'textAlignHorizontal', 'textAlignVertical', 'textAutoResize', 'textCase', 'textDecoration', 'textTruncation', 'lineHeight', 'letterSpacing']

}

export const styleAreas = Object.keys(styles);