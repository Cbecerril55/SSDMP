const { db } = require('../db/db');
const { QueryTypes } = require('sequelize');

const crearReporteHallazgo = async (req, res) => {
    const { reporte_id, fecha_hallazgo, ubicacion, usuario_id } = req.body;

    try {
        const resultado = await db.query(
            `INSERT INTO Reportes_Hallazgo (reporte_id, fecha_hallazgo, ubicacion, usuario_id)
   VALUES (?, ?, ?, ?)`,
            {
                replacements: [reporte_id, fecha_hallazgo, ubicacion, usuario_id],
                type: QueryTypes.INSERT
            }
        );

        res.status(201).json({
            mensaje: 'Reporte de hallazgo registrado',
            hallazgo_id: resultado[0] // el ID insertado
        });
    } catch (error) {
        console.error('Error al registrar hallazgo:', error);
        res.status(500).json({ error: 'Error al registrar hallazgo' });
    }
};


module.exports = {
    crearReporteHallazgo,
    //crearReporteExtravio // si ya lo tienes aquí, mantenlo exportado también
};
