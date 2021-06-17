import Eris from "eris";
import { CommandOptions } from "../../interfaces/CommandContext";
import { Command } from "./Command";
import Parser from "../../utils/Parser";

export class ModerationCommand extends Command {
    constructor(opts: CommandOptions) {
        super(opts);
    }

    public ban(
        message: Eris.Message,
        member: Eris.Member,
        reason: string,
        response: string
    ) {
        let parser = new Parser(response);

        member.ban(0, reason)
            .then(() => {

            message.channel.createMessage(
                parser.start(message.author.username, member)
            );

        }).catch((err: Eris.DiscordRESTError) => {
                return message.channel.createMessage(
                    `Cannot ban **${member.username}**: ${err.message}`
                );
        })
    }
}