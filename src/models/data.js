import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    correo: {
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
    }
}, { timestamps: true });

export const Data = mongoose.model('Users', dataSchema);