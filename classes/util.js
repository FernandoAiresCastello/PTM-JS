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

    static GenerateId() {
        const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const length = 8;
        var id = '';
        for (var i = 0; i < length; i++) {
          id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return id;
    }
}
