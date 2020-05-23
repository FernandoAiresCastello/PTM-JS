/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    tile.js

=============================================================================*/
class Tile {
    Index = 0;
    ForeColor = 0;
    BackColor = 0;

    constructor(ix, fgc, bgc) {
        this.Index = ix;
        this.ForeColor = fgc;
        this.BackColor = bgc;
    }
}
