const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const EventoImagens = require('./EventosImages');

const Evento = sequelize.define('evento', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

Evento.hasMany(EventoImagens, {as: 'imagens', onDelete: 'CASCADE'});
EventoImagens.belongsTo(Evento);

sequelize.sync().then(() => {
    console.log('Tabela eventos sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela eventos:', error);
  });
module.exports = Evento;
