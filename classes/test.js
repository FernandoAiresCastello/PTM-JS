/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    test.js

=============================================================================*/
class Test {
    Ptm = null;
    
    constructor() {
        this.Ptm = new Machine();
    }

    Test01() {
        console.log('Test01 started...');

        this.Ptm.Display.MapViews = [];
        this.Ptm.Display.ClearBackground(50);

        window.objectMap = new ObjectMap(2, 10, 10);
        window.mapView = new MapView(0, 0, 10, 10);
        this.Ptm.Display.AddMapView(mapView, objectMap);
        
        window.layer0 = this.Ptm.Display.MapViews[0].ObjectMap.Layers[0];
        window.layer1 = this.Ptm.Display.MapViews[0].ObjectMap.Layers[1];
        window.obj1 = new GameObject(new Tile('-', 55, 59));
        window.obj1.AddTile(new Tile('+', 55, 59));
        window.obj2 = new GameObject(new Tile('X', 10, 15));
        window.obj2.AddTile(new Tile('O', 15, 10));

        layer0.Fill(obj1);
        layer1.SetObject(obj2, 0, 0);
        layer1.SetObject(obj2, 1, 0);
        layer1.SetObject(obj2, 0, 1);
        layer1.SetObject(obj2, objectMap.Cols-1, 0);
        layer1.SetObject(obj2, objectMap.Cols-2, 0);
        layer1.SetObject(obj2, objectMap.Cols-1, 1);
        layer1.SetObject(obj2, 0, objectMap.Rows-1);
        layer1.SetObject(obj2, 0, objectMap.Rows-2);
        layer1.SetObject(obj2, 1, objectMap.Rows-1);
        layer1.SetObject(obj2, objectMap.Cols-1, objectMap.Rows-1);
        layer1.SetObject(obj2, objectMap.Cols-1, objectMap.Rows-2);
        layer1.SetObject(obj2, objectMap.Cols-2, objectMap.Rows-1);

        this.Ptm.Run();
    }
}
