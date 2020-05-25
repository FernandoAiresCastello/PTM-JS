/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    util.js

=============================================================================*/
class Util {

    static ByteToBinaryString(value) {
        return value.toString(2).padStart(8, '0');
    }
}
