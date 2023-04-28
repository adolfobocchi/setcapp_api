const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Contato = sequelize.define('contatos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  assunto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mensagem: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
});

sequelize.sync().then(() => {
    console.log('Tabela contatos sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela contatos:', error);
  });

module.exports = Contato;
