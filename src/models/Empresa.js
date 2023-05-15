const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const EmpresaImages = require('./EmpresaImages');

const Empresa = sequelize.define('empresa', {
  nome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  logo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: true
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true
  },
  institucional: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  diretoria: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  territorio:{
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  associadoPage:{
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
});

Empresa.hasMany(EmpresaImages, {as: 'imagens', onDelete: 'CASCADE'});
EmpresaImages.belongsTo(Empresa);

sequelize.sync().then(() => {
    console.log('Tabela empresa sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela empresa:', error);
  });
module.exports = Empresa;
