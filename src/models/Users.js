import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    DUI: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Children"
    }]
}, { timestamps: true });

export const Users = mongoose.model('Users', dataSchema);