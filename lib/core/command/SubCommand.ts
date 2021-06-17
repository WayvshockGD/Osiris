import { executeOpts, subCommandOptions } from "../../interfaces/CommandContext";

export class SubCommand {

    public name: string;

    public description: string;

    public execute: ({}: executeOpts) => void;

    constructor(opts: subCommandOptions) {
        
        this.name = opts.name;

        this.description = opts.description;

        this.execute = opts.execute;
    }
} 