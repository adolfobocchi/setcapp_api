const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Associado = sequelize.define('associados', {
  razaoSocial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nomeFantasia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  responsavel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataInicioAtividade: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  im: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargacomum: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  mudanca: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  bebidas: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  containers: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  explosivos: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  gases: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  encomendas: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargagranelsolida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargagranelliquida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaviva: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaaquecida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  solidosInflamaveis: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  substanciasToxicas: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  veiculosAutomotores: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  frigorificas: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  valores: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  corrosiva: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  diversas: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

sequelize.sync().then(() => {
    console.log('Tabela associados sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela associados:', error);
  });

module.exports = Associado;
