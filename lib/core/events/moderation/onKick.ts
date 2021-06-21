import Eris from "eris";
import Osiris from "../../../Osiris";
import ModLog from "../../../database/ModLog";
import modLogger from "../../../utils/ModLogger";

interface Ban {
    member: Eris.Member;
    reason: string;
    guild: Eris.Guild;
    client: Osiris;
}

export = async function({ member, reason, guild, client }: Ban) {
    let data = await ModLog.findOne({ Guild: guild.id });

    if (!data) return;

    client.createMessage(data.Channel, modLogger(reason, member, "kicked")).catch((err) => {
        return client.logger.warn(
            `Cannot send message to channel ( ${data.channel} ), reason:`, err
        );
    })
}