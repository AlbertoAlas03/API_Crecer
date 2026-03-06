import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    sexo: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const DataKids = mongoose.model('DataKids', dataSchema);