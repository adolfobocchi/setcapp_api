const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Curriculo = sequelize.define('curriculos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

sequelize.sync().then(() => {
    console.log('Tabela curriculos sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela curriculos:', error);
  });

module.exports = Curriculo;
