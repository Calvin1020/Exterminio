const mongoose = require("mongoose");

const pedidoSchema = mongoose.Schema({
    fechapedido: {
        type: Date,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true
    },
    descuento: {
        type: Number,
        required: true
    },
    iva: {
        type: Number,
        required: true
    },
    totalpedido: {
        type: Number,
        required: true
    },
    preciodomicilio: {
        type: Number,
        required: true
    },
    estadopedido: {
        type: String,
        enum: ['en camino', 'entregado', 'cancelado'],
        required: true
    }    
});

module.exports = mongoose.model('Pedido', pedidoSchema); // Cambié el nombre del modelo a "Pedido"
