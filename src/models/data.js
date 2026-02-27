const mongoose = require('mongoose');
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

module.exports = mongoose.model('Users', dataSchema);