import { readdirSync } from "fs";
import { CommandOptions, subCommandOptions } from "../interfaces/CommandContext";
import { ModuleOptions } from "../interfaces/ModuleContext";
import Logger from "../utils/Logger";

export default class Loader {

    public commands: Map<string, CommandOptions>;

    public modules: Map<string, ModuleOptions>;

    public subCommands: Map<string, subCommandOptions>;

    public logger: Logger;

    constructor(
        commands: Map<string, CommandOptions>, 
        modules: Map<string, ModuleOptions>,
        subCommands: Map<string, subCommandOptions>
    ) {

        this.commands = commands;

        this.modules = modules;

        this.subCommands = subCommands;

        this.logger = new Logger();

        this.loadCommands();
        this.loadModules();
    }

    private loadSubCommands(command: CommandOptions) { 
        if (command.subCommands === undefined) return;

        for (let sc of command.subCommands) {
            this.subCommands.set(sc.command.name, sc.command);
        }
    }

    loadCommands() {
        let folder = readdirSync("./dist/lib/commands/");

        folder.forEach(f => {
            readdirSync(`./dist/lib/commands/${f}`).forEach(file => {
                let command: CommandOptions = require(`../commands/${f}/${file}`);
                this.loadSubCommands(command);
                this.commands.set(command.name, command);
                this.logger.info("registered command", `[ ${command.name} ]`);
            })
        })
    }

    loadModules() {
        let folder = readdirSync("./modules/");

        folder.forEach(f => {
            let file: ModuleOptions = require(`../../modules/${f}/index`);
            this.modules.set(file.name, file);
            this.logger.info("Registered module", `[ ${file.name} ]`);
            for (let command of file.commands) {
                this.loadSubCommands(command);
                this.commands.set(command.name, command);
                this.logger.info("Registered module command:", `[ ${command.name} ]`);
            }
        })
    }
}