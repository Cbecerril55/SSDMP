const Notificacion = require('../models/notificacion');
const Usuario = require('../models/usuario');

const crearNotificacion = async (req, res) => {
    const { mensaje, usuario_id } = req.body;

    try {
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const nuevaNotificacion = await Notificacion.create({
            mensaje,
            usuario_id
        });

        res.status(201).json(nuevaNotificacion);
    } catch (error) {
        console.error('Error al crear notificación:', error);
        res.status(500).json({ error: 'Error al crear notificación' });
    }
};

const obtenerNotificaciones = async (req, res) => {
    try {
        const usuario_id = req.usuario.usuario_id;
        const notificaciones = await Notificacion.findAll({
            where: { usuario_id },
            order: [['fecha', 'DESC']]
        });
        res.json(notificaciones);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
};

const marcarComoLeida = async (req, res) => {
    try {
        const { id } = req.params;
        const notificacion = await Notificacion.findByPk(id);

        if (!notificacion) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        notificacion.leida = true;
        await notificacion.save();

        res.json({ mensaje: 'Notificación marcada como leída' });
    } catch (error) {
        console.error('Error al marcar notificación como leída:', error);
        res.status(500).json({ error: 'Error al marcar notificación como leída' });
    }
};

const eliminarNotificacion = async (req, res) => {
    try {
        const { id } = req.params;
        const notificacion = await Notificacion.findByPk(id);

        if (!notificacion) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        await notificacion.destroy();

        res.json({ mensaje: 'Notificación eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar notificación:', error);
        res.status(500).json({ error: 'Error al eliminar notificación' });
    }
};

module.exports = {
    crearNotificacion,
    obtenerNotificaciones,
    marcarComoLeida,
    eliminarNotificacion
};
