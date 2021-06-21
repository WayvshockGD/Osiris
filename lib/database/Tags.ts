import { Schema, model } from "mongoose";

let data = new Schema({
    Guild: { type: String },
    Name: { type: String },
    Body: { type: String }
})

export = model("tag", data);