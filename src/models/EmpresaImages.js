const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const EmpresaImages = sequelize.define('empresa_imagens', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = EmpresaImages;
