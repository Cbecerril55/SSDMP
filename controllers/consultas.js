const { db } = require('../db/db');
const { QueryTypes } = require('sequelize');

const obtenerHistorialMascota = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            `
      SELECT m.nombre AS mascota, r.fecha_reporte, r.ubicacion, h.fecha_hallazgo,
             h.ubicacion AS hallazgo_ubicacion, recompensas.monto
      FROM mascotas m
      LEFT JOIN reportes_extravio r ON m.mascota_id = r.mascota_id
      LEFT JOIN reportes_hallazgo h ON r.reporte_id = h.reporte_id
      LEFT JOIN recompensas ON r.reporte_id = recompensas.reporte_id
      WHERE m.mascota_id = :id;
      `,
            {
                replacements: { id },
                type: QueryTypes.SELECT
            }
        );

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el historial' });
    }
};


// Ejecutar procedimiento: Notificar usuarios cercanos
const notificarUsuariosCercanos = async (req, res) => {
    const { reporte_id } = req.body;

    try {
        const result = await db.query(
            `CALL Notificar_Usuarios_Cercanos(:id);`,
            {
                replacements: { id: reporte_id },
                type: QueryTypes.RAW
            }
        );

        res.status(200).json({ mensaje: 'Notificaciones generadas', resultado: result });
    } catch (error) {
        console.error('Error al ejecutar procedimiento:', error);
        res.status(500).json({ error: 'Error al notificar usuarios cercanos' });
    }
};

const obtenerNotificaciones = async (req, res) => {
    try {
      const notificaciones = await db.query(
        `SELECT * FROM Notificaciones ORDER BY notificacion_id DESC`,
        { type: QueryTypes.SELECT }
      );
      res.json(notificaciones);
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
  };
  

module.exports = {
    obtenerHistorialMascota,
    notificarUsuariosCercanos,
    obtenerNotificaciones,
};
