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
    static Log(message) {
        console.log('PTM >> ' + message);
    }
}
