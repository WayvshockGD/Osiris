import { readFileSync } from "fs";
import { parse } from "yaml";

export interface config {
    token: string;
    prefix: string;
    defaultResponses: {
        Ban: string;
        Kick: string;
        Mute: string;
        Unmute: string;
    }
    botConfig: {
        owners: string[];
        databaseURI: string;
    };
    emotes: {
        check: string;
        deny: string;
    }
}

let file = readFileSync("./production.yaml", { encoding: "utf8" });

export function Config(): config {
    let parsed = parse(file);

    return parsed;
}