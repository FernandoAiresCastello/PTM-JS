/*=============================================================================

    PTM
    Programmable Tile Machine
    2020 Developed by Fernando Aires Castello

    machine-api.js

=============================================================================*/
class MachineApi {
    Opcodes = {
        0x00: this.Nop,
        0x01: this.DisplayClear,
        0xff: this.Halt
    }

    constructor() {
    }

    Exec(bytecode) {
        bytecode = arguments;
        for (let i = 0; i < bytecode.length; i++) {
            const opcode = bytecode[i];
            if (this.Opcodes.hasOwnProperty(opcode)) {
                const readParamCount = this.Opcodes[opcode]();
                if (readParamCount != null) {
                    i += readParamCount;
                    if (i >= bytecode.length) {
                        Machine.Error('Program pointer past end of program');
                    }
                }
            }
            else {
                Machine.Error(`Invalid opcode ${opcode}`);
            }
        }
    }

    Nop() {
        console.log('NOP')
    }

    Halt() {
        console.log('HALT')
    }

    DisplayClear() {
        
    }
}
