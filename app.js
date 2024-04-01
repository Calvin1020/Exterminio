// app.js

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const usuariosController = require("../API Exterminio/controllers/usuariosController");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Define las rutas aquí
app.post("/login", usuariosController.login);
app.put('/actualizarDatos', usuariosController.actualizarDatos);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
