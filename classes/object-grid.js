/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    object-grid.js

=============================================================================*/
class ObjectGrid {
    Cells = [];
    Cols = null;
    Rows = null;
    Size = null;

    constructor(cols, rows) {
        this.InitCells(cols, rows);
    }

    InitCells(cols, rows) {
        this.Cols = cols;
        this.Rows = rows;
        this.Size = cols * rows;
        
        for (let i = 0; i < this.Size; i++) {
            this.Cells.push(new GridCell());
        }
    }

    RemoveAllObjects() {
        for (let y = 0; y < this.Rows; y++) {
            for (let x = 0; x < this.Cols; x++) {
                this.RemoveObject(x, y);
            }
        }
    }

    GetCell(x, y) {
        return Cells[y * Cols + x];
    }

    GetObject(x, y) {
        return this.GetCell(x, y).Object;
    }

    SetObject(o, x, y) {
        this.GetCell(x, y).Object = o;
    }

    RemoveObject(x, y) {
        this.SetObject(null, x, y);
    }
}
