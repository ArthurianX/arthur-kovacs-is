import hsl from 'hsl-to-hex';

// return a random number within a range
function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export interface ColorPalette {
    complimentaryColor2: string;
    complimentaryColor1: string;
    baseColor: string;
    hue: number;
}

class ColorPaletteGenerator {
    private hue: number | undefined;
    private complimentaryHue1: number | undefined;
    private complimentaryHue2: number | undefined;
    private saturation: number | undefined;
    private lightness: number | undefined;
    private baseColor: string | undefined;
    private complimentaryColor1: string | undefined;
    private complimentaryColor2: string | undefined;
    private colorChoices: ColorPalette | undefined;

    setColors(): ColorPalette {
        // pick a random hue somewhere between 220 and 360
        this.hue = ~~random(220, 360);
        this.complimentaryHue1 = this.hue + 30;
        this.complimentaryHue2 = this.hue + 60;
        // define a fixed saturation and lightness
        this.saturation = 95;
        this.lightness = 80;

        // define a base color
        this.baseColor = hsl(this.hue, this.saturation, this.lightness);
        // define a complimentary color, 30 degress away from the base
        this.complimentaryColor1 = hsl(
            this.complimentaryHue1,
            this.saturation,
            this.lightness,
        );
        // define a second complimentary color, 60 degrees away from the base
        this.complimentaryColor2 = hsl(
            this.complimentaryHue2,
            this.saturation,
            this.lightness,
        );

        // store the color choices in an array so that a random one can be picked later
        this.colorChoices = {
            baseColor: this.baseColor,
            complimentaryColor1: this.complimentaryColor1,
            complimentaryColor2: this.complimentaryColor2,
            hue: this.hue,
        };

        return this.colorChoices;
    }
}

export default ColorPaletteGenerator;
