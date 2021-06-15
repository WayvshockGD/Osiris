import Eris from "eris";
import { Command } from "../../core/command/Command";
import Osiris from "../../Osiris";
import process from "process";
import os from "os";

export = new Command({
    name: "status",
    description: "Shows the status of the logged in client.",
    enabled: true,

    execute: function({ message, client }){

        let dev = client.users.get(client._config.botConfig.owners[0]);

        let content: Eris.MessageContent = {
            content: [
                `Guilds: ${client.guilds.size}`,
                `Users: ${client.users.size}`,
                `Developer: ${dev?.username}#${dev?.discriminator}`,
                `Memory Usage: ${process.memoryUsage().heapTotal / 1000}`,
                `OS & cpu: [ ${process.arch} ] - [ ${os.cpus.length} ]`,
                `current running servers:\n${guilds(client)?.join("\n")}`
            ].join("\n")
        }

        return message.channel.createMessage(`\`\`\`cs\n${content.content}\n\`\`\``);
    }
});

function guilds(client: Osiris) {
    let guilds: string[] = [];

    if (guilds.length === 5) return guilds;

    for (let guild of client.guilds.values()) {
        guilds.push(`[ ${guild.name} ]: [ ${guild.id} ]`);
    }

    return guilds;
}