import { ModerationCommand } from "../../../lib/core/command/ModerationCommand";
import { Resolver } from "../../../lib/utils/Resolver";

let resolver = new Resolver();

export = new ModerationCommand({
    name: "kick",
    description: "Kicks a user from the guild.",
    enabled: true,
    category: "Moderation",
    module: "Moderation",
    permission: "kickMembers",

    execute: ({ message, responses, args, guild, client }) => {
        if (!args[0]) return message.channel.createMessage("Mention someone to kick!");
        
        let member = resolver.member(args[0], guild);

        if (!member) {
            return message.channel.createMessage(`No users known as **${args[0]}**`);
        }

        client.emit("kick", member, args.slice(1).join(" "), guild);
        return ModerationCommand.prototype.kick(
            message, 
            member, 
            args.slice(1).join(" "),
            `${responses.Kick}`,
            guild
        )
    }
})