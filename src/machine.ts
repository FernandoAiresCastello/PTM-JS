import { CommandMap } from "./commandMap";
import { Display } from "./display";
import { ErrorScreen } from "./errorScreen";
import { Program } from "./program";
import { ProgramLine } from "./programLine";

export class Machine {

    prog: Program;
    running: boolean = false;
    cycles: number = 0;
    cycleHandle: number = 0;
    args: string[] = [];
    lineNr: number = 0;
    cmd: CommandMap = new CommandMap();
    halted: boolean = false;
    scr: Display = new Display();
    branching: boolean = false;
    pauseTime: number = 0;

    constructor() {
        this.prog = new Program();
        this.initCommandMap();
    }

    run() {
        if (this.running) {
            return;
        }
        if (this.prog.load()) {
            this.log('Machine started');
            this.running = true;
            this.cycle();
        }
    }

    cycle() {
        if (!this.running) {
            window.cancelAnimationFrame(this.cycleHandle);
            return;
        }
        if (this.halted) {
            return;
        }
        if (this.pauseTime > 0) {
            this.pauseTime--;
        } else {
            this.executeLine();
            this.cycles++;

            if (this.branching) {
                this.branching = false;
            } else {
                this.lineNr++;
            }
    
            if (this.lineNr >= this.prog.lines.length && this.halted == false) {
                this.abort('Execution pointer past end of program');
                return;
            }
        }
        
        this.cycleHandle = window.requestAnimationFrame(() => this.cycle());
    }

    executeLine() {
        const line = this.prog.lines[this.lineNr];
        const fn = this.cmd[line.command];
        if (fn) {
            this.args = line.args;
            fn();
        } else {
            this.abort('Invalid command: ' + line.command);
        }
    }

    abort(message: string) {
        ErrorScreen.show(message);
        this.log('Machine aborted');
        this.running = false;
    }

    log(message: string) {
        console.log('PTM >> ' + message);
    }

    branchTo(lineNr: number) {
        this.lineNr = lineNr;
        this.branching = true;
    }

    unquote(str: string) {
        return str.substring(1, str.length - 2);
    }

    // ========== Commands ==========

    initCommandMap() {
        this.cmd['NOP'] = ()=> this.cmdNop();
        this.cmd['HALT'] = ()=> this.cmdHalt();
        this.cmd['SCREEN'] = ()=> this.cmdScreen();
        this.cmd['BGCOLOR'] = ()=> this.cmdSetBackColor();
        this.cmd['CLS'] = ()=> this.cmdClearScreen();
        this.cmd['DRAW'] = ()=> this.cmdUpdateScreen();
        this.cmd['GOTO'] = ()=> this.cmdGoto();
        this.cmd['LOG'] = ()=> this.cmdLog();
        this.cmd['PAUSE'] = ()=> this.cmdPause();
    }

    cmdPause() {
        this.pauseTime = Number(this.args[0]);
    }

    cmdLog() {
        this.log(this.unquote(this.args[0]));
    }

    cmdGoto() {
        const dest = this.prog.labels[this.args[0]];
        if (dest) {
            this.branchTo(dest);
        } else {
            debugger;
            this.abort('Undefined label: ' + this.args[0]);
        }
    }

    cmdClearScreen() {
        this.scr.clearToBackColor();
    }

    cmdSetBackColor() {
        const ix = Number(this.args[0]);
        if (ix >= 0 && ix < this.scr.palette.colors.length) {
            this.scr.setBackColor(ix);
        } else {
            this.abort('Palette index out of range');            
        }
    }

    cmdUpdateScreen() {
        this.scr.update();
    }

    cmdScreen() {
        this.scr.init(
            Number(this.args[0]),
            Number(this.args[1]),
            Number(this.args[2]));
    }

    cmdHalt() {
        this.halted = true;
        this.log('Machine halted');
    }

    cmdNop() {
        // No operation
    }
}
