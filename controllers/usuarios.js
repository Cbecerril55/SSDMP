const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const Mascota = require('../models/mascota');
const ReporteExtravio = require('../models/reporteExtravio');
//const { Op, Sequelize } = require('sequelize');
const { Recompensa } = require('../models/recompensas');
const { ReporteHallazgo } = require('../models/reportesHallazgos');
const { Notificacion } = require('../models/notificacion');
const { db, Sequelize } = require('../db/db');
const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, telefono, ubicacion, password } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !email || !ubicacion || !password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      email,
      telefono,
      ubicacion,
      password: hashedPassword
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'No se pudieron obtener los usuarios' });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar que ambos campos estén presentes
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password son requeridos' });
    }

    // Buscar el usuario por email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar que la contraseña sea correcta
    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Crear un token para el usuario
    const token = jwt.sign(
      { usuario_id: usuario.usuario_id, email: usuario.email },
      process.env.JWT_SECRET || 'mi_secreto',
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Inicio de sesión exitoso', token });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    // Iniciar transacción usando Sequelize
    const transaction = await db.transaction();

    // Eliminar notificaciones
    await Notificacion.destroy({
      where: { usuario_id: id },
      transaction
    });

    // Eliminar reportes de hallazgo
    await ReporteHallazgo.destroy({
      where: { usuario_id: id },
      transaction
    });

    // Eliminar reportes de extravío
    await ReporteExtravio.destroy({
      where: { usuario_id: id },
      transaction
    });

    // Eliminar mascotas
    await Mascota.destroy({
      where: { usuario_id: id },
      transaction
    });

    // Eliminar usuario
    const usuarioEliminado = await Usuario.destroy({
      where: { usuario_id: id },
      transaction
    });

    // Confirmar la transacción
    await transaction.commit();

    if (usuarioEliminado === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente' });

  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    // Si algo falla, revierte la transacción
    if (transaction) await transaction.rollback();
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuario_id = req.params.id;
    const { nombre, email, telefono, ubicacion, password } = req.body;

    // Busca el usuario en la base de datos
    const usuario = await Usuario.findByPk(usuario_id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualiza los datos del usuario
    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (telefono) usuario.telefono = telefono;
    if (ubicacion) usuario.ubicacion = ubicacion;

    // Si se pasa una contraseña, se encripta antes de guardar
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);
    }

    await usuario.save();

    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  loginUsuario,
  eliminarUsuario,
  actualizarUsuario,
};
