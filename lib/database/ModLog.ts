import { Schema, model } from "mongoose";

let data = new Schema({
    Guild: { type: String },
    Channel: { type: String }
})

export = model("modlog", data);