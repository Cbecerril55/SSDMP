const { DataTypes } = require('sequelize');
const { db } = require('../db/db');

const Mascota = db.define('Mascota', {
    mascota_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    raza: { 
        type: DataTypes.STRING 
    },
    color: { 
        type: DataTypes.STRING 
    },
    edad: { 
        type: DataTypes.INTEGER 
    },
    estado: { 
        type: DataTypes.ENUM('perdido', 'encontrado'), 
        defaultValue: 'perdido' 
    },
    usuario_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: 'Usuarios', // Nombre exacto de la tabla en la DB
            key: 'usuario_id'
        }
    },
    ubicacion: { 
        type: DataTypes.STRING 
    }
}, {
    tableName: 'Mascotas',
    timestamps: true
});

module.exports = Mascota;

