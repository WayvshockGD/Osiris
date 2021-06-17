import { Module } from "../../lib/core/command/Module";
import commands from "./commands/index";

export = new Module({
    name: "Moderation",
    enabled: true,
    globalDisabled: true,
    commands: commands
})