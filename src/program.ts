import { ErrorScreen } from "./errorScreen";
import { ProgramLabels } from "./programLabels";
import { ProgramLine } from "./programLine";

export class Program {

    lines: ProgramLine[] = [];
    labels: ProgramLabels = new ProgramLabels();

    load(): boolean {
        const element = document.querySelectorAll('script[type="ptml"]');
        if (element && element.length) {
            this.parse(element[0].innerHTML.trim());
            return true;
        } else {
            ErrorScreen.show('Required tag <script type="ptml"> not found');
            return false;
        }
    }

    private parse(srcCode: string) {
        const rawLines = srcCode.split('\n');
        rawLines.forEach(rawLine => {
            rawLine = rawLine.trim();
            if (rawLine) {
                const isComment = rawLine[0] == ';';
                const isLabel = rawLine[rawLine.length - 1] == ':';
                if (isComment) {
                    // ignore comment
                } else if (isLabel) {
                    const label = rawLine.substring(0, rawLine.length - 1);
                    this.labels[label] = this.lines.length;
                } else {
                    this.lines.push(this.parseLine(rawLine));
                }
            }
        });
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
