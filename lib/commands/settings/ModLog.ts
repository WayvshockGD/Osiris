import { Command } from "../../core/command/Command";
import { SubCommand } from "../../core/command/SubCommand";
import ModLog from "../../database/ModLog";
import { Resolver } from "../../utils/Resolver";

let resolver = new Resolver();

let view = new SubCommand({
    name: "view",
    description: "Shows the current mod log.",

    execute: async ({ message, guild, client }) => {
        let channelData;

        let data = await ModLog.findOne({ Guild: guild.id });

        let channel = data === undefined ? "Nothing" : data.Channel;

        if (data) {
            channelData = client.guilds.get(guild.id)?.channels.find((c) => c.id === channel);
        }

        return message.channel.createMessage(
            `Current mod log is set to <#${channel}> \`( #${channelData?.name} )\``
        );
    }
})

export = new Command({
    name: "modlog",
    description: "Sets the modLog.",
    enabled: true,
    category: "Settings",
    subCommands: [
        {
            command: view,
            globalDisabled: false
        }
    ],
    permission: "manageChannels",

    execute: async ({ message, args, guild }) => {
        await ModLog.findOne({ Guild: guild.id },
            undefined,
            undefined, async (err, data) => {

        let channel = (args.length) ? resolver.channel(args[0], guild) : message.channel;

        if (!channel) return message.channel.createMessage("Cannot find that channel.");

        if (!data) {
            let newData = new ModLog({
                Guild: guild.id,
                Channel: channel?.id
            });

            message.channel.createMessage(`Set the modlog to <#${channel?.id}>`);

            return newData.save();
        } else {
            let d = await ModLog.updateOne({
                Guild: guild.id,
                Channel: channel?.id
            })

            return message.channel.createMessage(`Updated modlog to <#${channel?.id}>`);
            d.save();
        }
       }
    )}
})