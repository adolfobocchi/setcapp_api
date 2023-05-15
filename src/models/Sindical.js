const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Sindical = sequelize.define('sindical', {
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
    console.log('Tabela sindical sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela sindical:', error);
  });

module.exports = Sindical;
