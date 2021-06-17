import Eris from "eris";
import { config, Config } from "../config/Convert";
import Loader from "./core/Loader";
import CommandHandler from "./handlers/CommandHandler";
import { CommandOptions, subCommandOptions } from "./interfaces/CommandContext";
import { ModuleOptions } from "./interfaces/ModuleContext";
import StatusManager from "./managers/StatusManager";
import Logger from "./utils/Logger";

import onBan from "./core/events/moderation/onBan";

let convert = Config();

export default class Osiris extends Eris.Client {

    _rest: Eris.Client;

    _config: config;

    logger: Logger;

    commands: Map<string, CommandOptions>;

    modules: Map<string, ModuleOptions>;

    subCommands: Map<string, subCommandOptions>;

    constructor(options: Eris.ClientOptions) {
        super(convert.token, options);

        this._rest = new Eris.Client(convert.token, { restMode: true });

        this.logger = new Logger();

        this.commands = new Map();

        this.modules = new Map();

        this.subCommands = new Map();

        this._config = convert;

        this.connect();
        this.startEvents();
        this.startLoading();
        this.on("ready", this.onStartUp.bind(this));
        this.on("messageCreate", async (message: Eris.Message) => {
            await new CommandHandler().start(message, {
                client: this,
                rest: this._rest
            })
        })
    }

    get defaultResponses() {
        return this._config.defaultResponses;
    }

    get emotes() {
        return this._config.emotes;
    }

    private startEvents() {
        this.on("ban", async (m, r, g) => await onBan({ 
            member: m,
            reason: r,
            guild: g
            client: this
        }));
    }

    public onStartUp() { 
           this.logger.info("Started up on client", this.user.username);
           
           new StatusManager({
               client: this,
               status: "dnd",
               game: "{guilds} guilds"
           }, (status) => {
               this.logger.info("Started status", `[ ${status} ]`);
           })
    }

    private startLoading() {
        new Loader(
            this.commands,
            this.modules,
            this.subCommands
        );
    }

    /** @private */
    async connect() {
        await super.connect().catch((err) => {
            return this.logger.error(err);
        })
    }
}