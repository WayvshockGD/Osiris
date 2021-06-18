import Eris, { EmbedField } from "eris";
import Osiris from "../Osiris";
import { Config } from "../../config/Convert";
import { CommandOptions, category } from "../interfaces/CommandContext";
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
        modules: Map<string, ModuleOptions>,
        client: Osiris
    ) {
        this.message = message;

        if (!args.length) {
            this.argsLength(commands, modules, client);
        } else {
            this.sendCommand(commands, modules, args[0]);
        }
    }

    private argsLength(
        commands: Map<string, CommandOptions>, 
        modules: Map<string, ModuleOptions>, 
        client: Osiris
    ) {

        let core: string[] = [
            "help",
            "status",
            "guildinfo",
            "modlog"
        ];

        let moduleList: EmbedField[] = [
            {
                name: "Base Commands",
                value: markdown.codeBlock(core.join(", ")),
                inline: true
            }
        ];

        for (let module of modules.values()) {
            let commands: string[] = [];
            for(let command of module.commands) {
                commands.push(`\`${command.name}\``);
            }
            moduleList.push({
                name: module.name,
                value: `\`${config.prefix}help ${module.name}\``,
                inline: false
            });
        }

        return this.message.channel.createMessage({
            embed: {
                author: {
                    name: `${client.user.username} Commands`,
                    icon_url: client.user.avatarURL
                },
                fields: moduleList
            }
        });
    }

    private sendCommand(
        command: Map<string, CommandOptions>, 
        module: Map<string, ModuleOptions>,
        args: string
    ) {
        let modules;

        let commands = command.get(args);

        if (!commands) {
            modules = module.get(args);
            if (!modules) {
                return this.message.channel.createMessage(
                    "Module or command is not found."
                );
            }
        }

        if (modules) {
            let c: string[] = [];

            for (let command of modules.commands) {
                c.push(`${config.prefix}${command.name}`);
            }

            return this.message.channel.createMessage({
                embed: {
                    title: `Module ${modules.name}`,
                    fields: [
                        {
                            name: "Commands",
                            value: markdown.codeBlock(c.join(", "))
                        },
                        {
                            name: "Globaly Disabled",
                            value: modules.globalDisabled ? "Globally Disabled" : "Globally Enabled"
                        },
                        {
                            name: "Enabled",
                            value: modules.enabled ? "Module Enabled" : "Module Disabled" 
                        }
                    ]
                }
            })
        }

        if (commands) {
            let msgArray: EmbedField[] = [];
            let sub: string[] = [];

            msgArray.push({
                name: "Description",
                value: commands.description,
                inline: true
            });

            msgArray.push({
                name: "Category",
                value: commands.category,
                inline: true
            });

            msgArray.push({
                name: "Enabled",
                value: commands.enabled ? "Enabled" : "Disabled",
                inline: true
            });

            if (commands.subCommands?.length) {
                for (let s of commands.subCommands) {
                    sub.push(`${s.command.name}: ${s.command.description}`);
                }
                msgArray.push({
                    name: "Sub Commands",
                    value: sub.join("\n"),
                    inline: true
                });
            }

            return this.message.channel.createMessage({
                embed: {
                    title: commands.name,
                    fields: msgArray
                }
            })
        }
    }
}