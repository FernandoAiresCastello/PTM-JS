/*=============================================================================

        PTM - Programmable Tile Machine
        2021 developed by Fernando Aires Castello
        https://github.com/FernandoAiresCastello
    
=============================================================================*/

let Cmd = {};
let PrgLines = [];
let PrgLabels = {};
let ExecPtr = 0;
let TileWidth = 8;
let TileHeight = 8;
let Canvas = null;
let ScreenWidth = 160;
let ScreenHeight = 144;
let ScreenZoom = 3;
let CanvasWidth = ScreenZoom * ScreenWidth;
let CanvasHeight = ScreenZoom * ScreenHeight;
let Cols = ScreenWidth / TileWidth;
let Rows = ScreenHeight / TileHeight;
let GridTileWidth = CanvasWidth / Cols;
let GridTileHeight = CanvasHeight / Rows;
let PixelWidth = GridTileWidth / TileWidth;
let PixelHeight = GridTileHeight / TileHeight;
let PixelBuffer = [];
let Running = false;
let CycleHandle = null;
let Cycles = 0;
let Branching = false;
let DebugPanel = null;

function InitCommands() {

    Cmd['NOP'] = (params) => {
    }
    Cmd['LOG'] = (params) => {
        Log(params[0]);
    }
    Cmd['DBGBRK'] = (params) => {
        debugger;
    }
    Cmd['HALT'] = (params) => {
        Running = false;
        Log("Machine halted");
    }
    Cmd['PSET'] = (params) => {
        PutPixel(ToNumber(params[0]), ToNumber(params[1]), params[2]);
    }
    Cmd['DRAW'] = (params) => {
        DrawPixelBuffer();
    }
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
    ClearCanvas('#fff');
    FillPixelBuffer('#fff');
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
    SetDebugMsg("Cycles: " + Cycles);

    if (Running) {
        ExecuteLine(PrgLines[ExecPtr]);
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
