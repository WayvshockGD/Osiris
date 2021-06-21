import { Command } from "../../../lib/core/command/Command";
import TagData from "../../../lib/database/Tags";
import { SubCommand } from "../../../lib/core/command/SubCommand";
import { Markdown } from "../../../lib/utils/Markdown";

let markdown = new Markdown();

let find = new SubCommand({
    name: "find",
    description: "Finds a tag.",

    execute: async ({ message, args, guild }) => {
        if (!args[0]) return message.channel.createMessage("Say a tag name for me to search!");

        let data = await TagData.findOne({ Guild: guild.id, Name: args[0] });

        if (!data) return message.channel.createMessage(`Tag \`( ${args[0]} )\` was not found.`);

        return message.channel.createMessage({
            embed: {
                title: `Tag ${data.Name}`,
                description: data.Body,
                color: 0x218cff
            }
        })
    }
})

let tagDelete = new SubCommand({
    name: "delete",
    description: "Deletes the found tag.",

    execute: async ({ message, args, guild }) => {
        let data = await TagData.findOne({ Guild: guild.id });

        if (!args[0]) return message.channel.createMessage("Please say a tag name to delete.");

        let dataResolve = await TagData.findOne({ Guild: guild.id, Name: args[0] });

        if (!dataResolve) return message.channel.createMessage("Tag could not be found.");

        let deleteData = data.deleteOne({
            Guild: guild.id,
            Name: args[0]
        });

        return message.channel.createMessage(`Deleted tag \`( ${args[0]} )\``);
    }
})

let list = new SubCommand({
    name: "list",
    description: "Lists all the tags.",

    execute: async ({ message, guild }) => {
        let lists: string[] = [];

        let data = await TagData.find({ Guild: guild.id });

        for (let d of data) {
            lists.push(d.Name);
        }

        let list = lists.length ? lists.join(", ") : "No tags here";

        return message.channel.createMessage(markdown.codeBlock(list));
    }
})

let edit = new SubCommand({
    name: "edit",
    description: "Edits a guild tag.",

    execute: async ({ message, args, guild }) => {
        let [arg, ...body] = args;

        if (!arg) return message.channel.createMessage("Say a tag name!");

        let data = await TagData.findOne({ 
            Guild: guild.id, 
            Name: args[0]
         }, undefined, undefined, (err, data) => {
             if (!data) return message.channel.createMessage("No data found for this tag.");
             if (!body.length) return message.channel.createMessage("Say a new tag body for this tag.");

             data.Name = body.join(" ");
             return data.save();
         });
    }
})

export = new Command({
    name: "tag",
    description: "Creates, edits, deletes, and lists tags",
    enabled: true,
    category: "Manager",
    subCommands: [
        {
            command: find,
            globalDisabled: false
        },
        {
            command: tagDelete,
            globalDisabled: false
        },
        {
            command: list,
            globalDisabled: false
        },
        {
            command: edit,
            globalDisabled: false
        }
    ],

    execute: ({ message, args, guild }) => {

        if (!message.member?.permissions.has("manageMessages")) return;

        let [head, ...body] = args;

        if (!head) {
            return message.channel.createMessage("You need to say the name of the tag!");
        }

        if (!body.length) {
            return message.channel.createMessage("You need to say the body of the tag!");
        }

        let newData = new TagData({
            Guild: guild.id,
            Name: head,
            Body: body.join(" ")
        });

        newData.save();
        return message.channel.createMessage(`Created tag \`( ${head} )\``);
    }
})