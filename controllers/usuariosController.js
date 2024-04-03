const Usuarios = require('../models/usuarios');

exports.actualizarDatos = async (req, res) => {
  const { email, password, emailAnterior, passwordAnterior } = req.body;

  console.log("Datos recibidos para actualizar:", req.body);

  try {
    // Verificar si el usuario existe y las credenciales son correctas
    const usuarioExistente = await Usuarios.findOne({ email: emailAnterior });

    if (!usuarioExistente) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si la contraseña coincide
    if (passwordAnterior !== usuarioExistente.password) {
      console.log("Credenciales anteriores inválidas");
      return res.status(401).json({ message: "Credenciales anteriores inválidas" });
    }

    // Validar el nuevo correo electrónico
    if (email && !isValidEmail(email)) {
      console.log("Correo electrónico inválido");
      return res.status(400).json({ message: "Por favor, coloca un formato de correo válido para el nuevo correo electrónico" });
    }

    // Validar la nueva contraseña
    if (password && password.length < 8) {
      console.log("La contraseña debe tener al menos 8 caracteres");
      return res.status(400).json({ message: "Por favor, coloca una contraseña con al menos 8 caracteres para la nueva contraseña" });
    }

    // Actualizar solo los campos que se proporcionaron y son diferentes de los actuales
    Object.keys(req.body).forEach(key => {
      if (key !== 'emailAnterior' && key !== 'passwordAnterior' && req.body[key] !== usuarioExistente[key]) {
        usuarioExistente[key] = req.body[key];
      }
    });

    console.log("Datos actualizados:", usuarioExistente);

    // Guardar los cambios
    await usuarioExistente.save();

    console.log("Datos guardados correctamente");

    res.status(200).json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    res.status(500).json({ message: "Error al actualizar los datos" });
  }
};

// Función para validar el formato de correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

<<<<<<< HEAD
const bcrypt = require('bcrypt');

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



=======
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const usuario = await Usuarios.findOne({ email });

  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // Verificar si la contraseña coincide
  if (password !== usuario.password) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  res.status(200).json({ message: "Inicio de sesión exitoso" });
};
>>>>>>> origin/main
