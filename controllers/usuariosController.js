const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');

exports.actualizarDatos = async (req, res) => {
  const { emailAnterior, passwordAnterior, nuevoEmail, nuevaPassword } = req.body;

  console.log("Datos recibidos para actualizar:", req.body);

  try {
    // Verificar si el usuario existe y las credenciales son correctas
    const usuarioExistente = await Usuarios.findOne({ email: emailAnterior });

    if (!usuarioExistente) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si la contraseña anterior coincide utilizando bcrypt
    const match = await bcrypt.compare(passwordAnterior, usuarioExistente.password);
    if (!match) {
      console.log("Credenciales anteriores inválidas");
      return res.status(401).json({ message: "Credenciales anteriores inválidas" });
    }

    // Validar el nuevo correo electrónico
    if (nuevoEmail && !isValidEmail(nuevoEmail)) {
      console.log("Correo electrónico inválido");
      return res.status(400).json({ message: "Por favor, coloca un formato de correo válido para el nuevo correo electrónico" });
    }

    // Validar la nueva contraseña
    if (nuevaPassword && nuevaPassword.length < 8) {
      console.log("La contraseña debe tener al menos 8 caracteres");
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

    console.log("Datos actualizados:", usuarioExistente);

    res.status(200).json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    res.status(500).json({ message: "Error al actualizar los datos" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await Usuarios.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si la contraseña coincide utilizando bcrypt
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error en la función login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
