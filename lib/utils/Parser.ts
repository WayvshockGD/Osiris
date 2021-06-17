import Eris from "eris";

interface Rules {
    value: string;
    replace: RegExp;
}

export default class Parser {

    public args: string;

    constructor(args: string) {
        this.args = args;
    }

    public start(mention: string, member: Eris.Member) {

        let rules: Rules[] = [
            {
               value: member.username,
               replace: /{mention}/
            },
            {
                value: mention,
                replace: /{author}/
            }
        ];

        for (let rule of rules) {
            this.args = this.args.replace(rule.replace, rule.value);
        }

        return this.args;
    }
}