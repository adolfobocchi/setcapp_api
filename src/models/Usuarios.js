const bcrypt = require('bcrypt'); 
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Usuario = sequelize.define(
    'usuarios',
    {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 255],
            },
        },
    }
);

sequelize.sync().then(() => {
    console.log('Tabela usuario sincronizada!');
  }).catch((error) => {
    console.error('Erro ao sincronizar a tabela Usuarios:', error);
  });

module.exports = Usuario;
