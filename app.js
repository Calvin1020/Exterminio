const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

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