const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar que no falte ningún dato
    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Verificar que el email no esté ya registrado
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'Ese email ya está registrado' });
    }

    // Encriptar la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password_hash,
    });

    res.status(201).json({
      mensaje: 'Usuario registrado con éxito',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
    }

    // Buscar al usuario por email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Comparar la contraseña enviada con el hash guardado
    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

module.exports = { registrar, login };