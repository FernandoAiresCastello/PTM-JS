/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    object-grid.js

=============================================================================*/
class ObjectGrid {
    Layers = [];
    Cols = null;
    Rows = null;

    constructor(layers, cols, rows) {
        if (layers == null || cols == null || rows == null)
            throw new Error('ObjectGrid constructor requires 3 arguments');

        this.InitLayers(layers, cols, rows);
    }

    InitLayers(layers, cols, rows) {
        this.Cols = cols;
        this.Rows = rows;
        
        for (let i = 0; i < layers; i++) {
            this.Layers.push(new GridLayer(cols, rows));
        }
    }

    RemoveAllObjects() {
        for (let z = 0; z < this.Layers.length; z++) {
            for (let y = 0; y < this.Rows; y++) {
                for (let x = 0; x < this.Cols; x++) {
                    this.Layers[z].RemoveObject(x, y);
                }
            }
        }
    }
}
