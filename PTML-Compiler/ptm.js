/*=============================================================================

        PTM - Programmable Tile Machine
        2021 developed by Fernando Aires Castello
        https://github.com/FernandoAiresCastello/PTM-JS
    
/*=============================================================================
    DATA
=============================================================================*/
// PTML interpreter
    let Cmd = {};
    let PrgLines = [];
    let PrgLabels = {};
    let ExecPtr = 0;
    let Running = false;
    let CycleHandle = null;
    let Cycles = 0;
    let Branching = false;
    let PauseCycles = 0;
// Debugging
    let DebugPanel = null;
// Low-level graphic objects 
    let Canvas = null;
    let PixelBuffer = [];
// Low-level graphic constants 
    const TileWidth = 8;
    const TileHeight = 8;
    const ScreenWidth = 160;
    const ScreenHeight = 144;
    const ScreenZoom = 3;
    const CanvasWidth = ScreenZoom * ScreenWidth;
    const CanvasHeight = ScreenZoom * ScreenHeight;
    const Cols = ScreenWidth / TileWidth;
    const Rows = ScreenHeight / TileHeight;
    const GridTileWidth = CanvasWidth / Cols;
    const GridTileHeight = CanvasHeight / Rows;
    const PixelWidth = GridTileWidth / TileWidth;
    const PixelHeight = GridTileHeight / TileHeight;

/*=============================================================================
    FUNCTIONS
=============================================================================*/
function InitCommands() {

    Cmd['NOP'] = (p) => {
    }
    Cmd['LOG'] = (p) => {
        Log(p[0]);
    }
    Cmd['HALT'] = (p) => {
        Halt();
    }
    Cmd['PAUSE'] = (p) => {
        PauseCycles = ToNumber(p[0]);
    }
    Cmd['CLS'] = (p) => {
        FillPixelBuffer(p[0]);
    }
    Cmd['PSET'] = (p) => {
        PutPixel(ToNumber(p[0]), ToNumber(p[1]), p[2]);
    }
    Cmd['DRAW'] = (p) => {
        DrawPixelBuffer();
    }
    Cmd['GOTO'] = (p) => {
        Branch(p[0]);
    }
}

function Halt() {
    Running = false;
    Log("Machine halted");
}

function Branch(idLabel) {
    const label = PrgLabels[idLabel];
    if (label === null || label === undefined) {
        Abort('Undefined label: ' + idLabel);
        return;
    }
    ExecPtr = label;
    Branching = true;
}

function ToNumber(str) {
    return Number.parseInt(str);
}

function InitGraphics() {
    const canvasElement = document.getElementById('canvas');
    canvasElement.width = CanvasWidth;
    canvasElement.height = CanvasHeight;
    Canvas = canvasElement.getContext('2d');
    Canvas.imageSmoothingEnabled = false;
    Canvas.strokeStyle = '';
    ClearCanvas('#000');
    FillPixelBuffer('#000');
    DrawPixelBuffer();
}

function ClearCanvas(rgb) {
    Canvas.fillStyle = rgb;
    Canvas.fillRect(0, 0, CanvasWidth, CanvasHeight);
}

function FillPixelBuffer(rgb) {
    for (let i = 0; i < ScreenWidth * ScreenHeight; i++)
        PixelBuffer[i] = rgb;
}

function PutPixel(x, y, rgb) {
    PixelBuffer[y * ScreenWidth + x] = rgb;
}

function GetPixel(x, y) {
    return PixelBuffer[y * ScreenWidth + x];
}

function DrawPixelBuffer() {
    let x = 0;
    let y = 0;

    for (let i = 0; i < PixelBuffer.length; i++) {
        Canvas.fillStyle = PixelBuffer[i];
        Canvas.fillRect(x, y, PixelWidth, PixelHeight);
        x += PixelWidth;
        if (x >= CanvasWidth) {
            x = 0;
            y += PixelHeight;
        }
    }
}

function Log(text) {
    console.log(text);
}

function AddPrgLabel(name, prgLineNr) {
    PrgLabels[name] = prgLineNr;
}

function AddPrgLine(srcLineNr, cmd, params) {
    PrgLines.push({
        SrcLineNr: srcLineNr,
        Command: cmd,
        Params: params
    });
}

function SetDebugMsg(msg) {
    DebugPanel.innerHTML = msg;
}

function Abort(msg) {
    Running = false;
    console.error(msg);
}

function StartCycleLoop() {
    Running = true;
    Log("Machine started");
    Cycle();
}

function Cycle() {
    if (Running) {
        if (PauseCycles > 0) {
            PauseCycles--;
            CycleHandle = window.requestAnimationFrame(() => Cycle());
            return;
        }
        else {
            ExecuteLine(PrgLines[ExecPtr]);
        }
        Cycles++;
    }
    if (!Running) {
        window.cancelAnimationFrame(CycleHandle);
        return;
    }

    if (Branching)
        Branching = false;
    else
        ExecPtr++;

    if (ExecPtr >= PrgLines.length) {
        Running = false;
        Abort('Execution pointer past end of program');
    }

    CycleHandle = window.requestAnimationFrame(() => Cycle());
}

function ExecuteLine(line) {
    const fn = Cmd[line.Command];
    if (fn) {
        fn(line.Params);
    }
    else {
        Abort(`Invalid command at line ${line.SrcLineNr}: ${line.Command}`);
    }
}

function Init() {
    InitCommands();
    InitGraphics();
    DebugPanel = document.getElementById('debug-panel');
}

function Main() {
[[[COMPILED_JS]]]

    StartCycleLoop();
}
