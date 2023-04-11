const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Confederado = sequelize.define('confederados', {
  nome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

sequelize.sync().then(() => {
    console.log('Tabela confederados sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela confederados:', error);
  });

module.exports = Confederado;
