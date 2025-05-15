const { DataTypes } = require('sequelize');
const { db } = require('../db/db');

const Notificacion = db.define('Notificacion', {
    notificacion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    leida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'usuario_id'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Notificaciones',
    timestamps: false
});

module.exports = Notificacion;
