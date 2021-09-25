(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorScreen = void 0;
var ErrorScreen = /** @class */ (function () {
    function ErrorScreen() {
    }
    ErrorScreen.show = function (message) {
        message = "[PTM] " + message;
        console.error(message);
        message = message.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
        var body = document.getElementsByTagName('body')[0];
        body.style.background = '#f00';
        body.style.color = '#fff';
        body.style.fontWeight = 'bold';
        body.innerHTML = "<div>" + message + "</div>";
    };
    return ErrorScreen;
}());
exports.ErrorScreen = ErrorScreen;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program_1 = require("./program");
document.addEventListener('DOMContentLoaded', function () {
    var program = new program_1.Program();
    program.load();
}, false);

},{"./program":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
var errorScreen_1 = require("./errorScreen");
var programLine_1 = require("./programLine");
var Program = /** @class */ (function () {
    function Program() {
        this.lines = [];
    }
    Program.prototype.load = function () {
        var element = document.querySelectorAll('script[type="ptml"]');
        if (element && element.length) {
            this.parse(element[0].innerHTML.trim());
        }
        else {
            errorScreen_1.ErrorScreen.show('Required tag <script type="ptml"> not found');
        }
    };
    Program.prototype.parse = function (srcCode) {
        var _this = this;
        var rawLines = srcCode.split('\n');
        rawLines.forEach(function (rawLine) {
            rawLine = rawLine.trim();
            if (rawLine && rawLine[0] != ';') {
                _this.lines.push(_this.parseLine(rawLine));
            }
        });
        console.log(this.lines);
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

},{"./errorScreen":1,"./programLine":4}],4:[function(require,module,exports){
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

},{}]},{},[2]);
