import { readFileSync } from "fs";
import { parse } from "yaml";

export interface config {
    token: string;
    prefix: string;
    botConfig: {
        owners: string[];
    };
}

let file = readFileSync("./production.yaml", { encoding: "utf8" });

export function Config(): config {
    let parsed = parse(file);

    return parsed;
}