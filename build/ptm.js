(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandMap = void 0;
var CommandMap = /** @class */ (function () {
    function CommandMap() {
    }
    return CommandMap;
}());
exports.CommandMap = CommandMap;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
var palette_1 = require("./palette");
var Display = /** @class */ (function () {
    function Display() {
        this.width = 0;
        this.height = 0;
        this.cols = 0;
        this.rows = 0;
        this.zoom = 0;
        this.pixelWidth = 1;
        this.pixelHeight = 1;
        this.tileWidth = 8;
        this.tileHeight = 8;
        this.canvas = null;
        this.pixelBuf = [];
        this.imageData = new ImageData(1, 1);
        this.palette = new palette_1.Palette();
        this.backColor = 0;
    }
    Display.prototype.init = function (width, height, zoom) {
        this.zoom = zoom;
        this.pixelWidth = this.zoom;
        this.pixelHeight = this.zoom;
        this.width = width * this.pixelWidth;
        this.height = height * this.pixelHeight;
        this.cols = this.width / this.tileWidth;
        this.rows = this.height / this.tileHeight;
        var e = document.createElement('canvas');
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
    };
    Display.prototype.update = function () {
        if (!this.canvas) {
            return;
        }
        var ix = 0;
        for (var y = 0; y < this.height; y++) {
            for (var py = 0; py < this.pixelHeight; py++) {
                var yOffset = (y * this.pixelHeight + py) * this.width;
                for (var x = 0; x < this.width; x++) {
                    for (var px = 0; px < this.pixelWidth; px++) {
                        var offset = yOffset + (x * this.pixelWidth + px);
                        var rgb = this.pixelBuf[y * this.width + x];
                        this.imageData.data[offset * 4 + 0] = (rgb >> 16) & 0xff;
                        this.imageData.data[offset * 4 + 1] = (rgb >> 8) & 0xff;
                        this.imageData.data[offset * 4 + 2] = rgb & 0xff;
                        this.imageData.data[offset * 4 + 3] = 0xff;
                    }
                }
            }
        }
        this.canvas.putImageData(this.imageData, 0, 0);
    };
    Display.prototype.clearPixelBuffer = function (rgb) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                this.putPixelRgb(x, y, rgb);
            }
        }
    };
    Display.prototype.putPixelRgb = function (x, y, rgb) {
        this.pixelBuf[y * this.width + x] = rgb;
    };
    Display.prototype.putPixelIndexed = function (x, y, ix) {
        this.pixelBuf[y * this.width + x] = this.palette.get(ix);
    };
    Display.prototype.setBackColor = function (ix) {
        this.backColor = ix;
    };
    Display.prototype.clearToBackColor = function () {
        this.clearPixelBuffer(this.palette.get(this.backColor));
    };
    return Display;
}());
exports.Display = Display;

},{"./palette":6}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorScreen = void 0;
var ErrorScreen = /** @class */ (function () {
    function ErrorScreen() {
    }
    ErrorScreen.show = function (message) {
        message = "PTM >> " + message;
        console.error(message);
        message = message.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
        document.body.style.background = '#f00';
        document.body.style.color = '#fff';
        document.body.style.fontWeight = 'bold';
        document.body.innerHTML = "<div>" + message + "</div>";
    };
    return ErrorScreen;
}());
exports.ErrorScreen = ErrorScreen;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
var commandMap_1 = require("./commandMap");
var display_1 = require("./display");
var errorScreen_1 = require("./errorScreen");
var program_1 = require("./program");
var Machine = /** @class */ (function () {
    function Machine() {
        this.running = false;
        this.cycles = 0;
        this.cycleHandle = 0;
        this.args = [];
        this.lineNr = 0;
        this.cmd = new commandMap_1.CommandMap();
        this.halted = false;
        this.scr = new display_1.Display();
        this.branching = false;
        this.pauseTime = 0;
        this.prog = new program_1.Program();
        this.initCommandMap();
    }
    Machine.prototype.run = function () {
        if (this.running) {
            return;
        }
        if (this.prog.load()) {
            this.log('Machine started');
            this.running = true;
            this.cycle();
        }
    };
    Machine.prototype.cycle = function () {
        var _this = this;
        if (!this.running) {
            window.cancelAnimationFrame(this.cycleHandle);
            return;
        }
        if (this.halted) {
            return;
        }
        if (this.pauseTime > 0) {
            this.pauseTime--;
        }
        else {
            this.executeLine();
            this.cycles++;
            if (this.branching) {
                this.branching = false;
            }
            else {
                this.lineNr++;
            }
            if (this.lineNr >= this.prog.lines.length && this.halted == false) {
                this.abort('Execution pointer past end of program');
                return;
            }
        }
        this.cycleHandle = window.requestAnimationFrame(function () { return _this.cycle(); });
    };
    Machine.prototype.executeLine = function () {
        var line = this.prog.lines[this.lineNr];
        var fn = this.cmd[line.command];
        if (fn) {
            this.args = line.args;
            fn();
        }
        else {
            this.abort('Invalid command: ' + line.command);
        }
    };
    Machine.prototype.abort = function (message) {
        errorScreen_1.ErrorScreen.show(message);
        this.log('Machine aborted');
        this.running = false;
    };
    Machine.prototype.log = function (message) {
        console.log('PTM >> ' + message);
    };
    Machine.prototype.branchTo = function (lineNr) {
        this.lineNr = lineNr;
        this.branching = true;
    };
    Machine.prototype.unquote = function (str) {
        return str.substring(1, str.length - 2);
    };
    // ========== Commands ==========
    Machine.prototype.initCommandMap = function () {
        var _this = this;
        this.cmd['NOP'] = function () { return _this.cmdNop(); };
        this.cmd['HALT'] = function () { return _this.cmdHalt(); };
        this.cmd['SCREEN'] = function () { return _this.cmdScreen(); };
        this.cmd['BGCOLOR'] = function () { return _this.cmdSetBackColor(); };
        this.cmd['CLS'] = function () { return _this.cmdClearScreen(); };
        this.cmd['DRAW'] = function () { return _this.cmdUpdateScreen(); };
        this.cmd['GOTO'] = function () { return _this.cmdGoto(); };
        this.cmd['LOG'] = function () { return _this.cmdLog(); };
        this.cmd['PAUSE'] = function () { return _this.cmdPause(); };
    };
    Machine.prototype.cmdPause = function () {
        this.pauseTime = Number(this.args[0]);
    };
    Machine.prototype.cmdLog = function () {
        this.log(this.unquote(this.args[0]));
    };
    Machine.prototype.cmdGoto = function () {
        var dest = this.prog.labels[this.args[0]];
        if (dest) {
            this.branchTo(dest);
        }
        else {
            debugger;
            this.abort('Undefined label: ' + this.args[0]);
        }
    };
    Machine.prototype.cmdClearScreen = function () {
        this.scr.clearToBackColor();
    };
    Machine.prototype.cmdSetBackColor = function () {
        var ix = Number(this.args[0]);
        if (ix >= 0 && ix < this.scr.palette.colors.length) {
            this.scr.setBackColor(ix);
        }
        else {
            this.abort('Palette index out of range');
        }
    };
    Machine.prototype.cmdUpdateScreen = function () {
        this.scr.update();
    };
    Machine.prototype.cmdScreen = function () {
        this.scr.init(Number(this.args[0]), Number(this.args[1]), Number(this.args[2]));
    };
    Machine.prototype.cmdHalt = function () {
        this.halted = true;
        this.log('Machine halted');
    };
    Machine.prototype.cmdNop = function () {
        // No operation
    };
    return Machine;
}());
exports.Machine = Machine;

},{"./commandMap":1,"./display":2,"./errorScreen":3,"./program":7}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var machine_1 = require("./machine");
document.addEventListener('DOMContentLoaded', function () {
    var machine = new machine_1.Machine();
    machine.run();
}, false);

},{"./machine":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Palette = void 0;
var Palette = /** @class */ (function () {
    function Palette() {
        this.colors = [];
    }
    Palette.prototype.add = function (rgb) {
        this.colors.push(rgb);
    };
    Palette.prototype.set = function (ix, rgb) {
        this.colors[ix] = rgb;
    };
    Palette.prototype.get = function (ix) {
        if (ix >= 0 && ix < this.colors.length) {
            return this.colors[ix];
        }
        return 0;
    };
    Palette.prototype.initDefault = function () {
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
    };
    return Palette;
}());
exports.Palette = Palette;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
var errorScreen_1 = require("./errorScreen");
var programLabels_1 = require("./programLabels");
var programLine_1 = require("./programLine");
var Program = /** @class */ (function () {
    function Program() {
        this.lines = [];
        this.labels = new programLabels_1.ProgramLabels();
    }
    Program.prototype.load = function () {
        var element = document.querySelectorAll('script[type="ptml"]');
        if (element && element.length) {
            this.parse(element[0].innerHTML.trim());
            return true;
        }
        else {
            errorScreen_1.ErrorScreen.show('Required tag <script type="ptml"> not found');
            return false;
        }
    };
    Program.prototype.parse = function (srcCode) {
        var _this = this;
        var rawLines = srcCode.split('\n');
        rawLines.forEach(function (rawLine) {
            rawLine = rawLine.trim();
            if (rawLine) {
                var isComment = rawLine[0] == ';';
                var isLabel = rawLine[rawLine.length - 1] == ':';
                if (isComment) {
                    // ignore comment
                }
                else if (isLabel) {
                    var label = rawLine.substring(0, rawLine.length - 1);
                    _this.labels[label] = _this.lines.length;
                }
                else {
                    _this.lines.push(_this.parseLine(rawLine));
                }
            }
        });
    };
    Program.prototype.parseLine = function (srcLine) {
        var command = '';
        var args = [];
        var ixFirstSpace = srcLine.indexOf(' ');
        if (ixFirstSpace > 0) {
            command = srcLine.substring(0, ixFirstSpace);
            var rawArgs = srcLine.substring(ixFirstSpace).trim();
            if (rawArgs.indexOf('"') >= 0) {
                args.push(rawArgs);
            }
            else {
                args = rawArgs.split(' ');
            }
        }
        else {
            command = srcLine;
        }
        command = command.trim().toUpperCase();
        args.forEach(function (arg) {
            arg = arg.trim();
        });
        return new programLine_1.ProgramLine(command, args);
    };
    return Program;
}());
exports.Program = Program;
;

},{"./errorScreen":3,"./programLabels":8,"./programLine":9}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLabels = void 0;
var ProgramLabels = /** @class */ (function () {
    function ProgramLabels() {
    }
    return ProgramLabels;
}());
exports.ProgramLabels = ProgramLabels;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramLine = void 0;
var ProgramLine = /** @class */ (function () {
    function ProgramLine(command, args) {
        this.command = command;
        this.args = args;
    }
    return ProgramLine;
}());
exports.ProgramLine = ProgramLine;

},{}]},{},[5]);
