const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const pedidoRoute = require("./routes/pedidos");
const userRoute = require("./routes/usuarios");


// Configuración de la aplicación
const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Rutas
app.use("/api", pedidoRoute);
app.use("/api", userRoute);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Inicio del servidor
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));











