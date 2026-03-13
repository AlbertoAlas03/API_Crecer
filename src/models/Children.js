import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    basic_data: {
        type: Array,
        default: []
    },
    allergies: {
        type: Array,
        default: []
    },
    conditions: {
        type: Array,
        default: []
    },
    medications: {
        type: Array,
        default: []
    },
    professional_preferred: {
        type: Array,
        default: []
    }
}, { timestamps: true });

export const Children = mongoose.model('Children', dataSchema);