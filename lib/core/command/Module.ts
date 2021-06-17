import { CommandOptions } from "../../interfaces/CommandContext";
import { ModuleOptions } from "../../interfaces/ModuleContext";

export class Module {
    public name: string;

    public enabled: boolean;

    public globalDisabled: boolean;

    public commands: CommandOptions[];

    constructor(opts: ModuleOptions) {

        this.name = opts.name;

        this.enabled = opts.enabled;
        
        this.globalDisabled = opts.globalDisabled;

        this.commands = opts.commands;
    }
}