import Eris from "eris";
import Osiris from "../Osiris";

interface opts {
    client: Osiris;
    rest: Eris.Client;
}

export default class CommandHandler {
    constructor(message: Eris.Message, options: opts) {
        let { client, rest } = options;

        let { prefix } = client._config;

        if (!message.content.startsWith(prefix)) return;

        if (message.author.bot) return;

        let args = message.content.slice(prefix.length).trim().split(/ +/);

        let command = client.commands.get(args[0].toLowerCase());

        if (!command) return;

        command.execute({
            client,
            rest,
            args,
            message
        })
    }
}