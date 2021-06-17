import Eris from "eris";
import ModLog from "../../../database/ModLog";
import modLogger from "../../../utils/ModLogger";

interface Ban {
    member: Eris.Member;
    reason: string;
    guild: Eris.Guild;
    client: Eris.Client;
}

export = async function({ member, reason, guild, client }: Ban) {
    let data = await ModLog.findOne({ Guild: guild.id });

    if (!data) return;

    client.createMessage(data.Channel, modLogger(reason));
}