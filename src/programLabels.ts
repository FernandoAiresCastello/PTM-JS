import { Dictionary } from "./dictionary";

export class ProgramLabels implements Dictionary<number> {
    [key: string]: number;
}
