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
  bairro: {
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
  celular: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  ie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  juntacomercial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataInicioAtividade: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  matriz: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  veiculos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  funcionarios: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  responsavel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargacomum: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaliquidagranel: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargasolidagranel: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaindivisiveis: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaaquecida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargasiderurgica: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargamadeiras: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaviva: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaperecivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargalixo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargavalores: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaconcreto: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaveiculos: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargacontainer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cargaoutros: {
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
