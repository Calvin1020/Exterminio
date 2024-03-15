const express = require("express");
const Pedido = require("../models/pedidos.js");

const router = express.Router();

// Crear un pedido
router.post("/pedidos", (req, res) => {
  const pedido = new Pedido(req.body);
  pedido
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener todos los pedidos
router.get("/pedidos", (req, res) => {
  Pedido.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener un pedido por ID
router.get("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  Pedido.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar un pedido por ID
router.delete("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  Pedido.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Actualizar un pedido por ID
router.put("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  const { fechapedido, subtotal, total, descuento, iva, totalpedido, preciodomicilio, estadopedido } = req.body;
  Pedido.updateOne({ _id: id }, { $set: { fechapedido, subtotal, total, descuento, iva, totalpedido, preciodomicilio, estadopedido } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
