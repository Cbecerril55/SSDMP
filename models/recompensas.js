const { DataTypes } = require('sequelize');
const { db } = require('../db/db');

const Recompensa = db.define('Recompensa', {
    recompensa_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    reporte_id: { type: DataTypes.INTEGER, allowNull: false },
    monto: { type: DataTypes.FLOAT, allowNull: false }
}, {
    tableName: 'Recompensas',
    timestamps: false
});

module.exports = { Recompensa };
