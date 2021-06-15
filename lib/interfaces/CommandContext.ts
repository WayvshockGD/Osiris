import Eris from "eris";
import Osiris from "../Osiris";

export interface CommandOptions {
    name: string;
    description: string;
    enabled: boolean;

    execute: ({}: executeOpts) => void;
}

export interface executeOpts {
    client: Osiris;
    rest: Eris.Client;
    args: string[];
    message: Eris.Message;
}