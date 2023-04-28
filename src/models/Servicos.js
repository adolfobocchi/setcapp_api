const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Servico = sequelize.define('servicos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descricao: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

sequelize.sync().then(() => {
    console.log('Tabela servicos sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela servicos:', error);
  });

module.exports = Servico;
