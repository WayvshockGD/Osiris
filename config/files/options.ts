import Eris from "eris";

let options: Eris.ClientOptions = {
    messageLimit: 60,
    autoreconnect: true,
    defaultImageFormat: "jpeg",
    allowedMentions: {
        everyone: false,
        roles: false,
        repliedUser: true,
        users: true
    },
    disableEvents: {
        TYPING_START: false,
        VOICE_STATE_UPDATE: true
    },
    firstShardID: 0,
    compress: true
}

export default options;