const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Acordo = sequelize.define('acordos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

sequelize.sync().then(() => {
    console.log('Tabela acordos sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela acordos:', error);
  });

module.exports = Acordo;
