import { readdirSync } from "fs";
import { CommandOptions } from "../interfaces/CommandContext";
import Logger from "../utils/Logger";

export default class Loader {

    public commands: Map<string, CommandOptions>;

    public logger: Logger;

    constructor(commands: Map<string, CommandOptions>) {

        this.commands = commands;

        this.logger = new Logger();

        this.loadCommands();
    }

    loadCommands() {
        let folder = readdirSync("./dist/lib/commands/");

        folder.forEach(f => {
            readdirSync(`./dist/lib/commands/${f}`).forEach(file => {
                let command: CommandOptions = require(`../commands/${f}/${file}`);
                this.commands.set(command.name, command);
                this.logger.info("registered command", `[ ${command.name} ]`);
            })
        })
    }
}