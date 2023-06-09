const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Noticias = sequelize.define('noticias', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  data_hora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

sequelize.sync().then(() => {
    console.log('Tabela noticias sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela noticias:', error);
  });

module.exports = Noticias;
