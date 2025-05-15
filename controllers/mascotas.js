const Mascota = require('../models/mascota');

const crearMascota = async (req, res) => {
    try {
        const nueva = await Mascota.create(req.body);
        res.status(201).json(nueva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la mascota' });
    }
};

const obtenerDataMascotas = async (req, res) => {
    try {
        const mascotas = await Mascota.findAll();
        res.json(mascotas);
    } catch (error) {
        console.error('Error real:', error); // 👈 importante
        res.status(500).json({ error: 'Error al obtener datos de mascotas' });
    }
};

const eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que la mascota exista
        const mascota = await Mascota.findOne({ where: { mascota_id: id } });
        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }

        // Eliminar la mascota
        await mascota.destroy();
        res.json({ mensaje: 'Mascota eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar mascota:', error);
        res.status(500).json({ error: 'Error al eliminar mascota' });
    }
};

const actualizarMascota = async (req, res) => {
    const { id } = req.params;
    const { usuario_id } = req.usuario; // Usuario autenticado
    const { nombre, raza, color, edad, estado, ubicacion } = req.body;

    try {
        // Verificar que la mascota pertenezca al usuario autenticado
        const mascota = await Mascota.findOne({
            where: { mascota_id: id, usuario_id }
        });

        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada o no autorizada para actualizar' });
        }

        // Actualizar datos de la mascota
        mascota.nombre = nombre || mascota.nombre;
        mascota.raza = raza || mascota.raza;
        mascota.color = color || mascota.color;
        mascota.edad = edad || mascota.edad;
        mascota.estado = estado || mascota.estado;
        mascota.ubicacion = ubicacion || mascota.ubicacion;

        await mascota.save();

        res.json({ mensaje: 'Mascota actualizada correctamente', mascota });
    } catch (error) {
        console.error('Error al actualizar mascota:', error);
        res.status(500).json({ error: 'Error al actualizar mascota' });
    }
};


module.exports = {
    crearMascota,
    obtenerDataMascotas,
    eliminarMascota,
    actualizarMascota,
};
