import Eris from "eris";
import { config, Config } from "../config/Convert";
import Logger from "./utils/Logger";

let convert = Config();

export default class Osiris extends Eris.Client {

    _rest: Eris.Client;

    _config: config;

    logger: Logger;

    constructor(options: Eris.ClientOptions) {
        super(convert.token, options);

        this._rest = new Eris.Client(convert.token, { restMode: true });

        this.logger = new Logger();

        this._config = convert;

        this.connect();
        this.on("ready", this.onStartUp.bind(this));
    }

    public onStartUp() { 
           this.logger.info("Started up on client", this.user.username);
    }

    /** @private */
    async connect() {
        await super.connect().catch((err) => {
            return this.logger.error(err);
        })
    }
}