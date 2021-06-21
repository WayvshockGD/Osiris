import { Command } from "../../../lib/core/command/Command";

export = new Command({
    name: "purge",
    description: "Purges a channel.",
    enabled: true,
    category: "Manager",
    
    execute: ({ message, guild }) => {}
})