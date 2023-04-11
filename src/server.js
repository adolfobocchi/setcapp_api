const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('./database/connection');
require('dotenv').config();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const server = express();

server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

server.use(express.static('public'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/api', routes);

server.use((req,res) => {
    res.send('Pagina nao encontrada');
});


server.listen(process.env.API_PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.API_PORT}`);
});


module.exports = server;