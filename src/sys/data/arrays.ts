export const styles: any = {

    general:    ['opacity', 'visible', 'topRightRadius', 'topLeftRadius', 'bottomRightRadius', 'bottomLeftRadius'],
    layout:     ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight', 'layoutMode', 'primaryAxisAlignItems', 'counterAxisAlignItems'],
    spacing:    ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing'],
    fills:      ['fills'],
    strokes:    ['strokes', 'strokeTopWeight', 'strokeRightWeight', 'strokeBottomWeight', 'strokeLeftWeight', 'strokeAlign', 'dashPattern'],
    effects:    ['effects'],
    text:       ['fontName', 'fontSize', 'fontWeight', 'textAlignHorizontal', 'textAlignVertical', 'textAutoResize', 'textCase', 'textDecoration', 'textTruncation', 'lineHeight', 'letterSpacing']

}

export const styleAreas = Object.keys(styles);