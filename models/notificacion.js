const { DataTypes } = require('sequelize');
const { db } = require('../db/db');

const Notificacion = db.define('Notificacion', {
    notificacion_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    mensaje: { type: DataTypes.TEXT, allowNull: false },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'Notificaciones',
    timestamps: false
});

module.exports = { Notificacion };
