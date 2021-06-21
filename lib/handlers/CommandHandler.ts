import Eris from "eris";
import Responses, { DataObject } from "../database/Responses";
import { HelpManager } from "../managers/HelpManager";
import Osiris from "../Osiris";

interface opts {
    client: Osiris;
    rest: Eris.Client;
}

export default class CommandHandler {
    async start(message: Eris.Message, options: opts) {
        let { client, rest } = options;

        let { prefix } = client._config;

        if (!message.content.startsWith(prefix)) return;

        if (message.author.bot) return;

        let args = message.content.slice(prefix.length).trim().split(/ +/);

        if (["help", "commands"].includes(args[0])) {
            args = args.slice(1);
            return new HelpManager(args, message, client.commands, client.modules, client);
        }

        let command = client.commands.get(args[0].toLowerCase());

        if (!command) return;

        if (command.permission) {
            // @ts-ignore
            if (!message.member?.permissions.has(command?.permission)) {
                return message.channel.createMessage(
                    `You need the permission ( \`${command.permission}\` ) to run this!`
                )
            }
        }

        let subCommand;

        if (args[1]) {
            subCommand = client.subCommands.get(args[1].toLowerCase());
        }

        args = args.slice(1);

        let guild = (<Eris.GuildChannel>message.channel).guild;

        let responses: DataObject = await Responses.findOne({ Guild: guild.id })
                                  || client.defaultResponses;

        if (subCommand) {
            args = args.slice(1);
            subCommand.execute({
                client,
                rest,
                args,
                message,
                guild: guild,
                responses: responses
            });
            return;
        }

        command.execute({
            client,
            rest,
            args,
            message,
            guild: (<Eris.GuildChannel>message.channel).guild,
            responses: responses
        })
    }
}