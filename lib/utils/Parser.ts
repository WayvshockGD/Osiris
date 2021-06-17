import Eris from "eris";
import { Config } from "../../config/Convert";

let config = Config();

interface Rules {
    value: string;
    replace: RegExp;
}

export default class Parser {

    public args: string;

    constructor(args: string) {
        this.args = args;
    }

    public start(mention: string, member: Eris.Member, guild: Eris.Guild) {

        let rules: Rules[] = [
            {
               value: member.username,
               replace: /{mention}/
            },
            {
                value: mention,
                replace: /{author}/
            },
            {
                value: guild.name,
                replace: /{guild.name}/
            },
            {
                value: guild.memberCount.toString(),
                replace: /{guild.members}/
            },
            {
                value: config.emotes.check,
                replace: /{emote}/
            }
        ];

        for (let rule of rules) {
            this.args = this.args.replace(rule.replace, rule.value);
        }

        return this.args;
    }
}