// Set type
type RGBColor = [number, number, number];

// Generate a random RGB colour
function getRandomColour(): RGBColor {

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return [r, g, b];

}

// Get the brightness of each colour
function calculateBrightness(color: RGBColor): number {
    
    const [r, g, b] = color;
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// Figure out if the colour is too dark
function isDarkColour(color: RGBColor): boolean {
    return calculateBrightness(color) > 128;
}

// Convert to HEX
export function rgbToHex(color: RGBColor): string {
    return color.map(component => Math.round(component * 255).toString(16).padStart(2, '0')).join('');
}

// Create a distinct colour for each item
export function generateColours(count: number, set: any) {

    const getDistinctColour = (): string => {

        let color: RGBColor;
        let hexCode: string;

        do {
            
            color = getRandomColour();
            hexCode = rgbToHex(color);

        } while (set.has(hexCode) || isDarkColour(color));

        set.add(hexCode);
        return hexCode;

    };

    const distinctColors: string[] = [];

    for (let i = 0; i < count; i++) {
        distinctColors.push(getDistinctColour());
    }

    return distinctColors;
}