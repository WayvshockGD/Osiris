import Eris, { EmbedField } from "eris";
import { Config } from "../../config/Convert";
import { CommandOptions } from "../interfaces/CommandContext";
import { ModuleOptions } from "../interfaces/ModuleContext";
import { Markdown } from "../utils/Markdown";

let markdown = new Markdown();
let config = Config();

export class HelpManager {

    public message: Eris.Message;

    constructor(
        args: string[], 
        message: Eris.Message, 
        commands: Map<string, CommandOptions>,
        modules: Map<string, ModuleOptions>
    ) {
        this.message = message;

        if (!args.length) this.argsLength(commands, modules);
    }

    private argsLength(commands: Map<string, CommandOptions>, modules: Map<string, ModuleOptions>) {
        let core: string[] = [];
        let moduleList: string[] = [];

        for (let module of modules.values()) {
            let commands: string[] = [];
            for(let command of module.commands) {
                commands.push(
                    `${config.prefix}${command.name} ${command.additions?.usage || ""}`
                );
            }
            moduleList.push(`[ ${module.name} ]\n${commands.join(` `)}`);
        }

        for (let command of commands.values()) {
            if (moduleList.includes(command.name)) return;
            core.push(
                `${config.prefix}${command.name} ${command.additions?.usage || ""}`
            );
        }

        return this.message.channel.createMessage(
            markdown.codeBlock(
                `${core.join("\n")}\n\n${moduleList.join("\n")}`,
                 "cs"
            )
        );
    }
}