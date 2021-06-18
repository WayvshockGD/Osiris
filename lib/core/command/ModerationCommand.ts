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
        response: string,
        guild: Eris.Guild
    ) {
        let parser = new Parser(response);

        if (member.id === guild.ownerID) {
            return message.channel.createMessage(
                `**You cannot ban the owner** ( ${member.username}#${member.discriminator} )`
            )
        }

        member.ban(0, reason)
            .then(() => {

            message.channel.createMessage(
                parser.start(message.author.username, member, guild)
            );

        }).catch((err: Eris.DiscordRESTError) => {
                return message.channel.createMessage(
                    `Cannot ban **${member.username}**: ${err.message}`
                );
        })
    }

    public kick(
        message: Eris.Message,
        member: Eris.Member,
        reason: string,
        response: string,
        guild: Eris.Guild
    ) {
        let parser = new Parser(response);

        if (member.id === guild.ownerID) {
            return message.channel.createMessage(
                `**You cannot kick the owner** ( ${member.username}#${member.discriminator} )`
            )
        }

        member.kick(reason)
            .then(() => {

            message.channel.createMessage(
                parser.start(message.author.username, member, guild)
            );

        }).catch((err: Eris.DiscordRESTError) => {
                return message.channel.createMessage(
                    `Cannot kick **${member.username}**: ${err.message}`
                );
        })
    }
}