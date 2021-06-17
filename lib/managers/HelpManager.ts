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
        let info: string[] = [];
        let mod: string[] = [];
        let moduleList: string[] = [];

        for (let command of commands.values()) {
            if (command.category === "Core") core.push(
                `${config.prefix}${command.name} ${command.additions?.usage || ""}`
            );
            if (command.category === "Information") info.push(
                `${config.prefix}${command.name} ${command.additions?.usage || ""}`
            )
            if (command.category === "Moderation") mod.push(
                `${config.prefix}${command.name} ${command.additions?.usage || ""}`
            )
        }

        for (let module of modules.values()) {
            let commands: string[] = [];
            for(let command of module.commands) {
                commands.push(
                    `${config.prefix}${command.name} ${command.additions?.usage || ""}`
                );
            }
            moduleList.push(`[ ${module.name} ]\n${commands.join(` ${config.prefix}`)}`);
        }

        let content = [
            core.join(", "),
            mod.join(", "),
            info.join(", ")
        ];

        return this.message.channel.createMessage(
            markdown.codeBlock(
                `${content.join("\n")}\n\n${moduleList.join("\n")}`,
                 "cs"
            )
        );
    }
}