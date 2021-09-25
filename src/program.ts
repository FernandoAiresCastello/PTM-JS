import { ErrorScreen } from "./errorScreen";
import { ProgramLine } from "./programLine";

export class Program {

    lines: ProgramLine[] = [];

    load() {
        const element = document.querySelectorAll('script[type="ptml"]');
        if (element && element.length) {
            this.parse(element[0].innerHTML.trim());
        } else {
            ErrorScreen.show('Required tag <script type="ptml"> not found');
        }
    }

    private parse(srcCode: string) {
        const rawLines = srcCode.split('\n');
        rawLines.forEach(rawLine => {
            rawLine = rawLine.trim();
            if (rawLine && rawLine[0] != ';') {
                this.lines.push(this.parseLine(rawLine));
            }
        });
        console.log(this.lines);
    }

    private parseLine(srcLine: string): ProgramLine {
        let command: string = '';
        let args: string[] = [];

        const ixFirstSpace = srcLine.indexOf(' ');
        if (ixFirstSpace > 0) {
            command = srcLine.substring(0, ixFirstSpace);
            const rawArgs = srcLine.substring(ixFirstSpace).trim();
            if (rawArgs.indexOf('"') >= 0) {
                args.push(rawArgs);
            } else {
                args = rawArgs.split(' ');
            }
        } else {
            command = srcLine;
        }
        command = command.trim().toUpperCase();

        args.forEach(arg => {
            arg = arg.trim();
        });

        return new ProgramLine(command, args);
    }
};
