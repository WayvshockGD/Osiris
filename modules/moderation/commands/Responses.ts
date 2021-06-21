import { ModerationCommand } from "../../../lib/core/command/ModerationCommand";
import { SubCommand } from "../../../lib/core/command/SubCommand";
import Responses, { DataObject } from "../../../lib/database/Responses";
import { Markdown } from "../../../lib/utils/Markdown";

let markdown = new Markdown();

let set = new SubCommand({
    name: "set",
    description: "Sets a moderation response.",

    execute: async ({ message, args, guild, client }) => {
        let responses = ["Ban", "Kick", "Mute", "Unmute"];
        await Responses.findOne({ Guild: guild.id }, 
            undefined,
            undefined,
            (err, data) => {

        if (!args[0]) return message.channel.createMessage(
                `Pick a response! \`${responses.join(", ")}\``
            );

        if (!responses.includes(args[0])) {
            return message.channel.createMessage(
                `Moderation Actions must include one of the following: \`${responses.join(", ")}\``
            )
        }

        if (!args.slice(1).join(" ")) return message.channel.createMessage(
                  "Say something for the response."
                );

        let { Ban, Kick, Unmute, Mute } = client.defaultResponses;


        if (!data) {
            let newData = new Responses({
                Guild: guild.id,
                Ban: Ban,
                Kick: Kick,
                Unmute: Unmute,
                Mute: Mute
            });

            message.channel.createMessage("New data saved, run the command again.");
            newData.save();
        } else {
            data[args[0]] = args.slice(1).join(" ");
            message.channel.createMessage(`Updated data of response ${args[0]}`);
            data.save();
        }
      });
    }
})

export = new ModerationCommand({
    name: "responses",
    description: "Shows a list of responses that were set.",
    enabled: true,
    category: "Moderation",
    module: "Moderation",
    subCommands: [
        {
            command: set,
            globalDisabled: false
        }
    ],
    permission: "manageGuild",
    
    
    execute: async function({ message, guild, client }) {
        let data: DataObject = await Responses.findOne({ Guild: guild.id });

        let { Ban, Kick, Unmute, Mute } = client.defaultResponses;

        return message.channel.createMessage(markdown.codeBlock([
            `Ban Response: "${data?.Ban || Ban}"`,
            `Kick Response: "${data?.Kick || Kick}"`,
            `Mute: "${data?.Mute || Mute}"`,
            `Unmute: "${data?.Unmute || Unmute}"`
        ].join("\n"), "cs"))
    }
})