import { Resolver } from "../../utils/Resolver";
import Eris from "eris";
import { CommandOptions } from "../../interfaces/CommandContext";
import RoleUtil from "../../utils/RoleUtil";
import { Command } from "./Command";

let roleUtil = new RoleUtil();
let resolver = new Resolver();

export class ModerationCommand extends Command {
    constructor(opts: CommandOptions) {
        super(opts);
    }

    public ban(
        message: Eris.Message,
        member: Eris.Member, 
        args: string[], 
        guild: Eris.Guild
    ) {
        let userMember = resolver.member(args[0], guild);

        let user = message.member;

        let role = roleUtil.sort(userMember?.roles || [], guild);
        let userRole = roleUtil.sort(user?.roles || [], guild);

        let sorted = roleUtil.compare(role, userRole, guild);
    }
}