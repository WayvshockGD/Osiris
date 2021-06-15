import Eris from "eris";
import { config, Config } from "../config/Convert";
import Loader from "./core/Loader";
import CommandHandler from "./handlers/CommandHandler";
import { CommandOptions } from "./interfaces/CommandContext";
import StatusManager from "./managers/StatusManager";
import Logger from "./utils/Logger";

let convert = Config();

export default class Osiris extends Eris.Client {

    _rest: Eris.Client;

    _config: config;

    logger: Logger;

    commands: Map<string, CommandOptions>;

    constructor(options: Eris.ClientOptions) {
        super(convert.token, options);

        this._rest = new Eris.Client(convert.token, { restMode: true });

        this.logger = new Logger();

        this.commands = new Map();

        this._config = convert;

        this.connect();
        this.startLoading();
        this.on("ready", this.onStartUp.bind(this));
        this.on("messageCreate", (message: Eris.Message) => {
            new CommandHandler(message, {
                client: this,
                rest: this._rest
            })
        })
    }

    public onStartUp() { 
           this.logger.info("Started up on client", this.user.username);
           
           new StatusManager({
               client: this,
               status: "dnd",
               game: " {guilds} guilds"
           }, (status) => {
               this.logger.info("Started status", `[ ${status} ]`);
           })
    }

    private startLoading() {
        new Loader(
            this.commands
        );
    }

    /** @private */
    async connect() {
        await super.connect().catch((err) => {
            return this.logger.error(err);
        })
    }
}