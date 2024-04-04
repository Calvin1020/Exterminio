// userRoute.js

const express = require("express");
const router = express.Router();
const User = require("../models/usuarios");

// Ruta para actualizar un usuario por su ID
router.put("/api/actualizarDatos", async (req, res) => {
  try {
    const { emailAnterior, passwordAnterior, nuevoEmail, nuevaPassword } = req.body;

    // Verificar si el usuario existe y las credenciales son correctas
    const usuarioExistente = await User.findOne({ email: emailAnterior });

    if (!usuarioExistente) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si la contraseña anterior coincide utilizando bcrypt
    const match = await bcrypt.compare(passwordAnterior, usuarioExistente.password);

    if (!match) {
      return res.status(401).json({ message: "Credenciales anteriores inválidas" });
    }

    // Validar el nuevo correo electrónico
    if (nuevoEmail &&!isValidEmail(nuevoEmail)) {
      return res.status(400).json({ message: "Por favor, coloca un formato de correo válido para el nuevo correo electrónico" });
    }

    // Validar la nueva contraseña
    if (nuevaPassword && nuevaPassword.length < 8) {
      return res.status(400).json({ message: "Por favor, coloca una contraseña con al menos 8 caracteres para la nueva contraseña" });
    }

    // Actualizar los datos del usuario
    if (nuevoEmail) {
      usuarioExistente.email = nuevoEmail;
    }

    if (nuevaPassword) {
      const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
      usuarioExistente.password = hashedPassword;
    }

    await usuarioExistente.save();

    res.status(200).json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    res.status(500).json({ message: "Error al actualizar los datos" });
  }
});

// Función para validar el formato de correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = router;