const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrito = sequelize.define('Carrito', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = Carrito;