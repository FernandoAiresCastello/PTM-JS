import { Dictionary } from "./dictionary";

export class CommandMap implements Dictionary<Function> {
    [key: string]: Function;
}
