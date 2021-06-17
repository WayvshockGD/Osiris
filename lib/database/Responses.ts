import { Schema, model } from "mongoose";

export interface DataObject {
    [x: string]: any;
    Guild: string;
    Ban?: string;
    Kick?: string;
    Mute?: string;
    Unmute?: string;
}

let data = new Schema({
    Guild: { type: String },
    Ban: { type: String },
    Kick: { type: String },
    Mute: { type: String },
    Unmute: { type: String }
});

export default model("modResponse", data);