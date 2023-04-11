const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const SliderItem = sequelize.define('slider_itens', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize.sync().then(() => {
    console.log('Tabela slider_itens sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela slider_itens:', error);
  });

module.exports = SliderItem;
