import { Command } from "../../../lib/core/command/Command";
import { SubCommand } from "../../../lib/core/command/SubCommand";
import PurgeManager from "../PurgeManager";
import { Resolver } from "../../../lib/utils/Resolver";

let resolver = new Resolver();

let before = new SubCommand({
    name: "before",
    description: "Purges message before the message id",

    execute: ({ message, args, guild, client }) => {
        let manager = new PurgeManager(client);

        let channel = !!args[2] ? resolver.channel(args[2], guild) : message.channel;

        if (!channel) {
            return message.channel.createMessage("No channels found as that name or id.")
        }

        if (!args[0]) {
            return message.channel.createMessage("You must say a before message id.");
        }

        return manager.purge({
            id: channel.id,
            channel: message.channel,
            options: {
                limit: parseInt(args[1]) || 10,
                before: args[0],
                reason: "Purged bots in channel"
            }
        })
    }
})

let bots = new SubCommand({
    name: "bots",
    description: "Purges bots with command purge.",

    execute: ({ message, args, guild, client }) => {
        let manager = new PurgeManager(client);

        let channel = !!args[1] ? resolver.channel(args[1], guild) : message.channel;

        if (!channel) {
            return message.channel.createMessage("No channels found as that name or id.")
        }

        return manager.purge({
            id: channel.id,
            channel: message.channel,
            options: {
                limit: parseInt(args[0]) || 10,
                filter: (guild) => guild.member.bot,
                reason: "Purged bots in channel"
            }
        })
    }
})

export = new Command({
    name: "purge",
    description: "Purges a channel.",
    enabled: true,
    category: "Manager",
    subCommands: [
        {
            command: bots,
            globalDisabled: false
        }
    ],
    
    execute: ({ message, guild, client, args }) => {
        let manager = new PurgeManager(client);

        let channel = !!args[1] ? resolver.channel(args[1], guild) : message.channel;

        if (!channel) {
            return message.channel.createMessage("No channels found as that name or id.")
        }

        return manager.purge({
            channel: message.channel,
            id: channel.id,
            options: {
                reason: `Purged by ${args[0] || 10}`,
                limit: parseInt(args[0]) || 10
            }
        })
    }
})