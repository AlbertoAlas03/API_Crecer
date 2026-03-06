import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    codigo: {
        type: String,
        required: true
    },
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

export const KidsForAdd = mongoose.model('KidsForAdd', dataSchema);