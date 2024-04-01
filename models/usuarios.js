// usuarios.js

const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);
