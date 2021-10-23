import { IxPalette, Palette } from "./palette";

export class Display {

    width: number = 0;
    height: number = 0;
    cols: number = 0;
    rows: number = 0;
    zoom: number = 0;
    pixelWidth: number = 1;
    pixelHeight: number = 1;
    tileWidth: number = 8;
    tileHeight: number = 8;
    canvas: (CanvasRenderingContext2D | null) = null;
    pixelBuf: number[] = [];
    imageData: ImageData = new ImageData(1, 1);
    palette: Palette = new Palette();
    backColor: IxPalette = 0;

    init(width: number, height: number, zoom: number) {
        this.zoom = zoom;
        this.pixelWidth = this.zoom;
        this.pixelHeight = this.zoom;
        this.width = width * this.pixelWidth;
        this.height = height * this.pixelHeight;
        this.cols = this.width / this.tileWidth;
        this.rows = this.height / this.tileHeight;

        const e = document.createElement('canvas');
        e.width = this.width;
        e.height = this.height;
        e.style.border = '4px solid #202020';
        document.body.appendChild(e);

        this.canvas = e.getContext('2d');
        if (this.canvas) {
            this.imageData = this.canvas.getImageData(0, 0, this.width, this.height);
            this.canvas.imageSmoothingEnabled = false;
            this.canvas.imageSmoothingQuality = 'low';
            this.clearPixelBuffer(0x000000);
            this.update();
            this.palette.initDefault();
        }
    }

    update() {
        if (!this.canvas) {
            return;
        }
        let ix = 0;
        for (var y = 0; y < this.height; y++) {
            for (var py = 0; py < this.pixelHeight; py++) {
                var yOffset = (y * this.pixelHeight + py) * this.width;
                for (var x = 0; x < this.width; x++) {
                    for (var px = 0; px < this.pixelWidth; px++) {
                        var offset = yOffset + (x * this.pixelWidth + px);
                        const rgb = this.pixelBuf[y * this.width + x];
                        this.imageData.data[offset * 4 + 0] = (rgb >> 16) & 0xff;
                        this.imageData.data[offset * 4 + 1] = (rgb >> 8) & 0xff;
                        this.imageData.data[offset * 4 + 2] = rgb & 0xff;
                        this.imageData.data[offset * 4 + 3] = 0xff;
                    }
                }
            }
        }
        this.canvas.putImageData(this.imageData, 0, 0);
    }

    private clearPixelBuffer(rgb: number) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.putPixelRgb(x, y, rgb);
            }
        }
    }

    private putPixelRgb(x: number, y: number, rgb: number) {
        this.pixelBuf[y * this.width + x] = rgb;
    }

    private putPixelIndexed(x: number, y: number, ix: IxPalette) {
        this.pixelBuf[y * this.width + x] = this.palette.get(ix);
    }

    setBackColor(ix: IxPalette) {
        this.backColor = ix;
    }

    clearToBackColor() {
        this.clearPixelBuffer(this.palette.get(this.backColor));
    }
}
