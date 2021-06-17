import { CommandOptions } from "./CommandContext";

export interface ModuleOptions {
    name: string;
    enabled: boolean;
    globalDisabled: boolean;
    commands: CommandOptions[];
}