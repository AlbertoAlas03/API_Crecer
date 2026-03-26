import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    code: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        require: true
    }
}, { timestamps: true });

export const ChangePassword = mongoose.model('ChangePassword', dataSchema);