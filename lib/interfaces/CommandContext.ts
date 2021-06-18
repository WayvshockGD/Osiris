import Eris from "eris";
import { Model } from "mongoose";
import { DataObject } from "../database/Responses";
import Osiris from "../Osiris";

export type category = "Core" | "Information" | "Moderation" | "Settings";

export interface subCommandBuilder {
    command: subCommandOptions;
    globalDisabled: boolean;
}

export interface subCommandOptions {
    name: string;
    description: string;

    execute: ({}: executeOpts) => void;
}

export interface CommandOptions {
    name: string;
    description: string;
    enabled: boolean;
    category: category;
    module?: string;
    permission?: string;
    subCommands?: subCommandBuilder[];
    additions?: {
        usage?: string;
        cooldown?: number;
        ownerOnly?: boolean; 
    }

    execute: ({}: executeOpts) => void;
}

export interface executeOpts {
    client: Osiris;
    rest: Eris.Client;
    args: string[];
    message: Eris.Message;
    guild: Eris.Guild;
    responses: DataObject;
}