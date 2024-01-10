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

    // console.clear();

    figma.notify(message);
    figma.closePlugin();

}

// Log the error to the console and close plugin
export function handleError(message: string, error: any) {

    // Print error to console and then close plugin
    console.log('> Error:', error.message);
    console.log('-------------------')
    console.log(error.stack);
    
    console.log('-------------------')
    notifyAndClose(message);

}

// Check if an item is already in an array
export function inArray(item: any, array: any[]) {

    // Check if function can perfomr
    if (isArray(array) && item) {

        const matches: any = array.filter((a: any) => JSON.stringify(a) === JSON.stringify(item));
        
        // Are there any matches?
        if (isArray(matches)) { return true }
        else { return false };

    } else { return false };

}

// Convert colour from RGB to HEX and vice verca
export function convertColour(value: any) {

    // Set up internal functions
    const toHex = (c: any) => Math.round(c * 255).toString(16).padStart(2, "0");

    // Set base result
    let result;

    if (isArray(value)) {

        result = `${toHex(value[0])}${toHex(value[1])}${toHex(value[2])}`;

    }

    else {

        const raw   = parseInt(value, 16);
        const r     = ((raw >> 16) & 255) / 255;
        const g     = ((raw >> 8) & 255) / 255;
        const b     = (raw & 255) / 255;

        result = {r,g,b};

    }

    return result;

}

// Sort an array
export function sortArray(array: any, key: any, reverse: any | null = null) {

    array.sort((a: any, b: any) => {

        // Handle the case when the key is a string or an array
        const valueA = Array.isArray(a[key]) ? a[key][0] : a[key];
        const valueB = Array.isArray(b[key]) ? b[key][0] : b[key];

        // Convert values to numbers if possible
        const numA = parseFloat(valueA);
        const numB = parseFloat(valueB);

        if (!isNaN(numA) && !isNaN(numB)) {

            // Both values are numbers, compare them directly
            return reverse ? numB - numA : numA - numB;

        } else {

            // Use localeCompare for string comparison
            return reverse ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
            
        }

    });

}

// Replace all instances of a character in a string
export function replaceAllInString(string: any, x: any, y: any) {

    // What to replace
    const toReplace = new RegExp(String(x), 'g');
    
    return string.replace(toReplace, String(y));

}

// Clean a string
export function cleanString(string: string, type: any = null) {

    // Set up
    let response: any = string;

    // Check if there is a string
    if (string) {

        // Remove number and hash from property name
        if (type === 'property') {

            response = response.includes('#') ? response.split('#') : response;
            response = isArray(response) ? response[0] : response;

        }

        // Remove anatomy notes from child name
        if (type === 'anatomy') {

            response = response.replace('forAnatomy===', '');

        }

        // 
        if (type === 'token') {

            response = replaceAllInString(response, '/', '.');
            response = replaceAllInString(response, ' ', '-');
            response = response.toLowerCase();

        }

    }

    //
    return response;

}