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


module.exports = {
    crearMascota,
    obtenerDataMascotas
};
