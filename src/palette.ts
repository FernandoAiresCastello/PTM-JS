import { ErrorScreen } from "./errorScreen";

export type IxPalette = number;
export type RgbColor = number;

export class Palette {

    colors: RgbColor[] = [];

    add(rgb: RgbColor) {
        this.colors.push(rgb);
    }

    set(ix: IxPalette, rgb: RgbColor) {
        this.colors[ix] = rgb;
    }

    get(ix: IxPalette): RgbColor {
        if (ix >= 0 && ix < this.colors.length) {
            return this.colors[ix];
        }
        return 0;
    }

    initDefault() {
        this.add(0x000000);
        this.add(0xffffff);
        this.add(0xff0000);
        this.add(0x00ff00);
        this.add(0x0000ff);
        this.add(0xff00ff);
        this.add(0x00ffff);
        this.add(0xffff00);
        this.add(0xff8000);
        this.add(0x808080);
    }
}
