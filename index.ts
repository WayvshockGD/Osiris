import options from "./config/files/options";
import Client from "./lib/Osiris";
import { connect } from "mongoose";


let osiris = new Client(options);

connect(osiris._config.botConfig.databaseURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    osiris.logger.success("Connected to database");
})