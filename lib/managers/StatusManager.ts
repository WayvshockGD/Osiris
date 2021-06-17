import Eris from "eris";
import Osiris from "../Osiris";

interface opts {
    client: Osiris;
    status: Eris.Status;
    game: string;
}

export default class StatusManager {
    constructor({ 
        client, 
        status, 
        game 
    }: opts, fn: (status: Eris.Status) => void) {

        client.editStatus(status, {
            name: this.parse(game, client),
            type: 3
        });
        fn(status);
        return;
    }

    private parse(args: string, client: Osiris) {
        let rules = [
            { 
                value: /{members}/, 
                replace: client.users.size.toString() 
            },
            {
                value: /{guilds}/,
                replace: client.guilds.size.toString()
            }
        ];

        for (let r of rules) {
            args = args.replace(r.value, r.replace);
        }

        return args;
    }
}