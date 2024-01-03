// Check if something is an array
export function isArray(item: any, length: number = 0, operator: string = 'm') {

    // Return based boolean based on operator
    if (operator === 'm')   { return Array.isArray(item) && item.length > length ? true : false     };
    if (operator === 'l')   { return Array.isArray(item) && item.length < length ? true : false     };
    if (operator === 'e')   { return Array.isArray(item) && item.length === length ? true : false   };
    if (operator === 'em')  { return Array.isArray(item) && item.length >= length ? true : false    };
    if (operator === 'el')  { return Array.isArray(item) && item.length <= length ? true : false    };

}

// Notify with a message and then close plugin
export function notifyAndClose(message: string) {

    figma.notify(message);
    figma.closePlugin();

}