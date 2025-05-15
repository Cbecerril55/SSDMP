const { db } = require('../db/db');
const { QueryTypes } = require('sequelize');
const ReporteExtravio = require('../models/reporteExtravio');
const ReporteHallazgo = require('../models/reportesHallazgos');

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

const crearReporteExtravio = async (req, res) => {
    try {
        const { mascota_id, descripcion, ubicacion, usuario_id } = req.body;

        const nuevoReporte = await ReporteExtravio.create({
            mascota_id,
            descripcion,
            ubicacion,
            usuario_id
        });

        res.status(201).json(nuevoReporte);
    } catch (error) {
        console.error('Error al crear reporte de extravío:', error);
        res.status(500).json({ error: 'Error al crear reporte de extravío' });
    }
};

const obtenerReportesExtravio = async (req, res) => {
    try {
        const reportes = await ReporteExtravio.findAll();
        res.json(reportes);
    } catch (error) {
        console.error('Error al obtener reportes de extravío:', error);
        res.status(500).json({ error: 'Error al obtener reportes de extravío' });
    }
};

const registrarReporteHallazgoTx = async (req, res) => {
    const { reporte_id, usuario_id, ubicacion, comentario } = req.query;

    const transaction = await db.transaction();
    try {
        if (!reporte_id || !usuario_id || !ubicacion) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }

        const [resultado] = await db.query(
            `INSERT INTO Reportes_Hallazgo (reporte_id, usuario_id, ubicacion, comentario)
             VALUES (?, ?, ?, ?)`,
            {
                replacements: [reporte_id, usuario_id, ubicacion, comentario || null],
                type: QueryTypes.INSERT,
                transaction
            }
        );

        await transaction.commit();

        res.status(201).json({
            mensaje: 'Reporte de hallazgo registrado con transacción',
            hallazgo_id: resultado
        });

    } catch (error) {
        await transaction.rollback();
        console.error('Error en transacción de hallazgo:', error);
        res.status(500).json({ error: 'Error al registrar hallazgo con transacción' });
    }
};


module.exports = {
    crearReporteHallazgo,
    crearReporteExtravio,
    obtenerReportesExtravio,
    registrarReporteHallazgoTx,
};
