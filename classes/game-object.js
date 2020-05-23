/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    game-object.js

=============================================================================*/
class GameObject {
    Id = null;
    Tiles = [];
    Visible = true;
    Properties = {};

    constructor(tile) {
        if (!tile)
            throw new Error('GameObject must contain at least one tile');

        this.Id = Util.GenerateId();
        this.SetTile(tile);
    }

    SetTile(tile) {
        this.Tiles = [];
        this.AddTile(tile);
    }

    AddTile(tile) {
        this.Tiles.push(tile);
    }

    SetProperty(prop, value) {
        this.Properties.set(prop, value);
    }

    GetProperty(prop) {
        return this.Properties.get(prop);
    }
}
