const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Antt = sequelize.define('antt', {
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
    console.log('Tabela antt sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela antt:', error);
  });

module.exports = Antt;
