const { DataTypes } = require('sequelize');
const { db } = require('../db/db');

const Mascota = db.define('Mascota', {
    mascota_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // 👈 este es el fix
    nombre: { type: DataTypes.STRING, allowNull: false },
    raza: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    edad: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.ENUM('perdido', 'encontrado'), defaultValue: 'perdido' },
    ubicacion: { type: DataTypes.STRING },
}, {
    tableName: 'Mascotas',
    timestamps: true
});

module.exports = Mascota;

