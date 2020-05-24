/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    ptm.js

=============================================================================*/
class PTM {
    Display = null;

    constructor() {
        PTM.Log('Programmable Tile Machine started');
        this.Display = new Display();
    }

    static Log(obj) {
        let output = '';
        if (typeof obj === 'object') {
            output = JSON.stringify(obj);
        }
        else { 
            output = obj.toString();
        }
        console.log('PTM >> ' + output);
    }

    Run() {
        PTM.Log('Main loop started');
        this.Display.StartRendering();
    }

    Stop() {
        PTM.Log('Main loop stopped');
        this.Display.StopRendering();
    }

    DumpPalette() {
        PTM.Log(this.Display.Gfx.Palette)
    }

    DumpTileset() {
        PTM.Log(this.Display.Gfx.Tileset)
    }
}
