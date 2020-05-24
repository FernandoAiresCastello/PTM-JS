/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    grid-view.js

=============================================================================*/
class GridView {
    Display = null;
    ObjectGrid = null;
    X = null;
    Y = null;
    Width = null;
    Height = null;
    ScrollX = 0;
    ScrollY = 0;
    TileAnimationIndex = 0;

    constructor(x, y, w, h) {
        if (x == null || y == null || w == null || h == null)
            throw new Error('GridView constructor requires 4 arguments');

        this.X = x;
        this.Y = y;
        this.Width = w;
        this.Height = h;
    }

    Render() {
        if (this.Display == null)
            throw new Error('GridView has no Display');
        if (this.ObjectGrid == null)
            throw new Error('GridView has no ObjectGrid');

        const gfx = this.Display.Gfx;
        
        /*
            PSEUDO-CODE:
            Render grid to display
                For each grid layer
                    For each layer object
                        If object is visible
                            Get object tile at index this.TileAnimationIndex % GameObject.Tiles.length
                            Render that tile with its color information
                        Else if layer == 0
                            Render a blank tile with the same backcolor as the display background
                        Else (layer > 0)
                            Render the tile at this same position but on the layer below
        */
       
        this.AdvanceTileAnimation();
    }

    AdvanceTileAnimation() {
        this.TileAnimationIndex++;
    }
}
