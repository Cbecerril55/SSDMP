const { DataTypes } = require('sequelize');
const { db } = require('../db/db');

const ReporteHallazgo = db.define('ReporteHallazgo', {
    hallazgo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    reporte_id: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha_hallazgo: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    ubicacion: { type: DataTypes.STRING, allowNull: false },
    comentario: { type: DataTypes.TEXT }
}, {
    tableName: 'Reportes_Hallazgo',
    timestamps: false
});

module.exports = { ReporteHallazgo };
