// Convert RGB value to HEX
export function convertColour(value: any) {

    // Set up internal functions
    const toHex = (c: any) => Math.round(c * 255).toString(16).padStart(2, "0");

    // Set base result
    let result;

    if (Array.isArray(value)) {

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

// Check all sides of a bounding box
export function checkSides(v: any) {

    let result;

    if (v[0] === v[1] && v[1] === v[2] && v[2] === v[3]) { result = v[0] }      // If all sides are equal, set as one value
    else if (v[0] === v[2] && v[1] === v[3]) { result = [ v[0], v[1] ] }        // If all axis are the same set as 2 values
    else { result = [v[0], v[1], v[2], v[3]] }                                  // If all different set as 4 values

    return result;

}

// Set sides
export function setSides(type: any, frame: any, size: any) {

    if (type === 'padding') {

        if (Array.isArray(size)) {

            if (size.length > 2) {
    
                frame.paddingTop        = size[0];
                frame.paddingRight      = size[1];
                frame.paddingBottom     = size[2];
                frame.paddingLeft       = size[3];
    
            }
    
            else {
    
                frame.paddingTop        = size[0];
                frame.paddingRight      = size[1];
                frame.paddingBottom     = size[0];
                frame.paddingLeft       = size[1];
    
            }
    
        }
    
        else {
    
            frame.paddingTop        = size;
            frame.paddingRight      = size;
            frame.paddingBottom     = size;
            frame.paddingLeft       = size;
    
        }

    }

    if (type === 'stroke') {

        if (Array.isArray(size)) {

            if (size.length > 2) {
    
                frame.strokeTopWeight        = size[0];
                frame.strokeRightWeight      = size[1];
                frame.strokeBottomWeight     = size[2];
                frame.strokeLeftWeight       = size[3];
    
            }
    
            else {
    
                frame.strokeTopWeight        = size[0];
                frame.strokeRightWeight      = size[1];
                frame.strokeBottomWeight     = size[0];
                frame.strokeLeftWeight       = size[1];
    
            }
    
        }
    
        else {
    
            frame.strokeTopWeight        = size;
            frame.strokeRightWeight      = size;
            frame.strokeBottomWeight     = size;
            frame.strokeLeftWeight       = size;
    
        }

    }

}

// Clean name
export function cleanName(string: any, type: any) {

    let name = string.trim();                                               // Remove trailing spaces

    if (type === 'COMPONENT') {

        name = name.replace(/\,/g, '')                                      // Remove commas
        name = name.replace(/ /g, '/')                                      // Replace space with slash

    }

    else {

        name = name.replace(/\//g, '.');                                    // Replace slashes with dots
        name = name.replace(/ /g, '-');                                     // Replace spaces with dashes
        name = name.toLowerCase();                                          // Convert to lowercase

    }

    return name;

}

// Sort array
export function sortArray(array: any, key: any) {

    array.sort((a: any, b: any) => {

        // Handle the case when the key is a string or an array
        const valueA = Array.isArray(a[key]) ? a[key][0] : a[key];
        const valueB = Array.isArray(b[key]) ? b[key][0] : b[key];

        // Compare the values
        return valueA.localeCompare(valueB);

    });
}