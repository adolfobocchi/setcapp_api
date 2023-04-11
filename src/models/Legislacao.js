const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Legislacao = sequelize.define('legislacao', {
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

sequelize.sync().then(() => {
    console.log('Tabela legislacao sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela legislacao:', error);
  });

module.exports = Legislacao;
