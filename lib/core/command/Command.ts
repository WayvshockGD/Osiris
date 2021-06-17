import { CommandOptions, executeOpts, subCommandBuilder } from "../../interfaces/CommandContext";

export class Command {

    public execute: ({}: executeOpts) => void;

    public name: string;

    public enabled: boolean;

    public description: string;

    public category: string;

    public subCommands?: subCommandBuilder[];

    public additions: CommandOptions["additions"];

    constructor(opts: CommandOptions) {

        this.name = opts.name;

        this.description = opts.description;

        this.enabled = opts.enabled;

        this.category = opts.category;

        this.additions = opts.additions;

        this.subCommands = opts.subCommands;

        this.execute = opts.execute;
    }
}