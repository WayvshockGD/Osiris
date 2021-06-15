import { CommandOptions, executeOpts } from "../../interfaces/CommandContext";

export class Command {

    public execute: ({}: executeOpts) => void;

    public name: string;

    public enabled: boolean;

    public description: string;

    constructor(opts: CommandOptions) {

        this.name = opts.name;

        this.description = opts.description;

        this.enabled = opts.enabled;

        this.execute = opts.execute;
    }
}