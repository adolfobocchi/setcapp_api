const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const EventoImagens = sequelize.define('eventos_imagens', {
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

module.exports = EventoImagens;
