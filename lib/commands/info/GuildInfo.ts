import { Command } from "../../core/command/Command";
import { Markdown } from "../../utils/Markdown";
import { unix } from "moment";

let markdown = new Markdown();

export = new Command({
    name: "guildinfo",
    description: "Shows info about a guild.",
    category: "Information",
    enabled: true,
    additions: {
        usage: "<guildID>"
    },

    execute: function({ message, args, guild, client }) {
        let guildInfo = (!!args.length) ? client.guilds.get(args[0]) : guild;

        if (!guildInfo) {
            return message.channel.createMessage(
                markdown.codeBlock(
                    `Cannot find guildID: ${args[0]}.`
                )
            );
        }

        return message.channel.createMessage(markdown.codeBlock([
            `Name: "${guildInfo.name}"`,
            `ID: "${guildInfo.id}"`,
            `Members: "${guildInfo.members.size}"`,
            `Channels: "${guildInfo.channels.size}"`,
            `Emojis: "${guildInfo.emojis.length}"`,
            `Created At: "${unix(guildInfo.createdAt / 1000).format("llll")}"`,
            `Shard:`,
            `ID: "${guildInfo.shard.id}"`,
            `Latency: "${guildInfo.shard.latency}"`
        ].join("\n"), "cs"))

    }
})