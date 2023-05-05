const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Antt = sequelize.define('antt', {
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  conteudo : {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
});

sequelize.sync().then(() => {
    console.log('Tabela antt sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela antt:', error);
  });

module.exports = Antt;
