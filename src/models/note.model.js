import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    title: {
        type: String,
        required: [true],
    },
    description: {
        type: String,
        required: [true],
    },
    tag: {
        type: String,
    },
}, { timestamps: true })


export const Note = mongoose.model('Note', noteSchema)

