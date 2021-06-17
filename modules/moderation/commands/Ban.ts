import { ModerationCommand } from "../../../lib/core/command/ModerationCommand";
import { Resolver } from "../../../lib/utils/Resolver";

let resolver = new Resolver();

export = new ModerationCommand({
    name: "ban",
    description: "Bans a user from the guild.",
    enabled: true,
    category: "Moderation",
    module: "Moderation",

    execute: ({ message, responses, args, guild }) => {
        let member = resolver.member(args[0], guild);

        if (!member) {
            return message.channel.createMessage(`No users known as **${args[0]}**`);
        }

        return ModerationCommand.prototype.ban(
            message, 
            member, 
            args.slice(1).join(" "),
            `${responses.Ban}`
        )
    }
})