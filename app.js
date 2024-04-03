// app.js

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
<<<<<<< HEAD

const userRoute = require("./routes/usuarios");


// settings
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes
app.use("/api", userRoute);



// Rutas
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGODB_URI
        , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// Iniciando el servidor
app.listen(port, () => {
    console.log("Server listening on port http://localhost:" + port + "/");
});
=======
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
>>>>>>> origin/main
