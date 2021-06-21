import { Module } from "../../lib/core/command/Module";
import commands from "./commands/index";

export = new Module({
    name: "Manager",
    enabled: true,
    globalDisabled: false,
    commands: commands
})