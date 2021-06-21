import Eris from "eris";


export = function(reason: string, member: Eris.Member, type: string) {
    let modType = {
        color: 0,
        emote: ""
    };

    if (type === "banned") modType = {
        color: 0xff2121,
        emote: ":hammer:"
    }

    if (type === "kicked") modType = {
        color: 0xff2121,
        emote: ":wrench:"
    }

    let embed: Eris.EmbedOptions = {
        author: {
            name: member.user.username,
            icon_url: member.avatarURL
        },
        color: modType.color,
        description: `${modType.emote} ${member.username} got ${type} due to ${reason === "" ? "a reason" : reason}`,
        footer: {
            text: `${new Date()}`
        }
    }

    return { embed };
}