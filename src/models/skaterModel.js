// src/models/skaterModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

export const Skater = sequelize.define('Skater', {
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  anos_experiencia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'skaters'
});

// Si deseas sincronizar el modelo con la base de datos (esto creará la tabla automáticamente):
async function syncTables() {
  await Skater.sync({ alter: true });
}

syncTables().catch(console.error);
