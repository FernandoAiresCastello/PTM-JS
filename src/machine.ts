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
        this.executeLine();
        this.cycles++;
        this.lineNr++;
        if (this.lineNr >= this.prog.lines.length && this.halted == false) {
            this.abort('Execution pointer past end of program');
            return;
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
        this.running = false;
    }

    log(message: string) {
        console.log('PTM >> ' + message);
    }

    // ========== Commands ==========

    initCommandMap() {
        this.cmd['NOP'] = ()=> this.cmdNop();
        this.cmd['HALT'] = ()=> this.cmdHalt();
        this.cmd['SCREEN'] = ()=> this.cmdScreen();
        this.cmd['PSET'] = ()=> this.cmdPutPixel();
        this.cmd['DRAW'] = ()=> this.cmdUpdateScreen();
    }

    cmdUpdateScreen() {
        this.scr.update();
    }

    cmdPutPixel() {
        this.scr.putPixel(
            Number(this.args[0]),
            Number(this.args[1]),
            Number(this.args[2]));
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
