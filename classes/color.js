/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    color.js

=============================================================================*/
class Color {
    RGB = null;
    
    constructor(rgb) {
        this.RGB = '#' + rgb.toString(16).padStart(6, '0');
    }
}
