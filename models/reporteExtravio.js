const { DataTypes } = require('sequelize');
const { db } = require('../db/db');

const ReporteExtravio = db.define('ReporteExtravio', {
    reporte_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mascota_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha_reporte: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    ubicacion: { type: DataTypes.STRING, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'Reportes_Extravio',
    timestamps: false
});

module.exports = ReporteExtravio;
