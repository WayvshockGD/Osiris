import Eris from "eris";
import Osiris from "../../lib/Osiris";

interface purgeOpts {
    id: string;
    channel: Eris.TextableChannel;
    options: Eris.PurgeChannelOptions;
}

export default class PurgeManager {
    public client: Osiris;
    
    constructor(client: Osiris) {
        this.client = client;
    }

    public purge({ id, options, channel }: purgeOpts) {
        this.client.purgeChannel(id, options)
                   .catch((err: Eris.DiscordHTTPError) => {
                       this.client.logger.warn(`Unable to purge channel ( ${id} )`);
                       return channel.createMessage(
                           `**Unable to purge channel** \`${err.message}\``
                        );
                   }).then(() => {
                       this.client.logger.success(
                           `Purged channel ( ${id} ) with limit: ( ${options.limit} )`
                        );

                       return channel.createMessage(
                           "Sucessfully purged channel"
                        );
                   })
    }
}