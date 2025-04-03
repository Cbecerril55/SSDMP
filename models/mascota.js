const { DataTypes } = require('sequelize');
const { db } = require('../db/db');

const Mascota = db.define('Mascota', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    raza: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    edad: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.ENUM('perdido', 'encontrado'), defaultValue: 'perdido' },
    ubicacion: { type: DataTypes.STRING },
}, {
    timestamps: true,
});

module.exports = Mascota;
