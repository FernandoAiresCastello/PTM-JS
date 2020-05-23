/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    display.js

=============================================================================*/
class Display {
    BackColor = '#000000';
    BorderColor = '#111111';
    GridColor = 'rgba(255,255,255,0.2)';
    GridEnabled = false;
    GridStyle = [3];
    ScreenWidth = 160;
    ScreenHeight = 144;
    ScreenZoom = 4;
    TilePxCountX = 8;
    TilePxCountY = 8;
    Cols = this.ScreenWidth / this.TilePxCountX;
    Rows = this.ScreenHeight / this.TilePxCountY;
    CanvasWidth = this.ScreenZoom * this.ScreenWidth;
    CanvasHeight = this.ScreenZoom * this.ScreenHeight;
    TilePxCount = this.TilePxCountX * this.TilePxCountY;
    GridTileWidth = this.CanvasWidth / this.Cols;
    GridTileHeight = this.CanvasHeight / this.Rows;
    TilePxWidth = this.GridTileWidth / this.TilePxCountX;
    TilePxHeight = this.GridTileHeight / this.TilePxCountY;
    Canvas = null;
    Tileset = null;

    constructor() {
        this.Init();
    }

    Init() {
        this.Tileset = new Tileset();
        document.body.style.backgroundColor = this.BorderColor;
        const canvasElement = document.getElementsByTagName('canvas')[0];
        canvasElement.width = this.CanvasWidth;
        canvasElement.height = this.CanvasHeight;
        canvasElement.addEventListener('click', (e) => {
            CanvasClicked(e.layerX, e.layerY);
        });
        this.Canvas = canvasElement.getContext('2d'); 
        this.Canvas.imageSmoothingEnabled = false;
        this.ClearToBackground();
    }

    ClearToBackground() {
        this.Canvas.fillStyle = this.BackColor;
        this.Canvas.fillRect(0, 0, this.CanvasWidth, this.CanvasHeight);
    }

    DrawPixel(color, x, y) {
        if (color != null) {
            this.Canvas.strokeStyle = '';
            this.Canvas.fillStyle = color;
            this.Canvas.fillRect(x * this.TilePxWidth, y * this.TilePxHeight, this.TilePxWidth, this.TilePxHeight);
        }
    }
    
    DrawPixelBlock(pixelBlock, fgc, bgc, x, y) {
        x *= this.TilePxCountX;
        y *= this.TilePxCountY;
        let px = x;
        let py = y;
        const pixels = pixelBlock.Pixels;
        for (let i = 0; i < this.TilePxCount; i++) {
            this.DrawPixel(((pixels[i] == '1') ? fgc : (pixels[i] == '0') ? bgc : null), px, py);
            if (++px >= x + this.TilePxCountX) {
                px = x;
                py++;
            }
        }
    }

    DrawTile(tileIndex, fgc, bgc, x, y) {
        if (!Number.isInteger(tileIndex))
            tileIndex = tileIndex.charCodeAt(0);

        const pixelBlock = this.Tileset.Tiles[tileIndex];
        this.DrawPixelBlock(pixelBlock, fgc, bgc, x, y);
    }

    DrawTileString(string, fgc, bgc, x, y) {
        let px = x;
        let py = y;
        for (let i = 0; i < string.length; i++) {
            this.DrawTile(string[i], fgc, bgc, px, py);
            px++;
        }
    }
}
