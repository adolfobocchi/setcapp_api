const Acordo = require('../models/Acordos');
const Antt = require('../models/Antt');
const Empresa = require('../models/Empresa');
const Evento = require('../models/Eventos');
const Legislacao = require('../models/Legislacao');
const Noticia = require('../models/Noticias');
const Servico = require('../models/Servicos');
const Sindical = require('../models/Sindical');
const { Op } = require('sequelize');

const SearchController = {
  async listar (req, res) {
    try {
      const resultado = [];
      const {q} = req.query;
      console.log(q);
      const acordos = await Acordo.findAll({
        attributes: ['nome'],
        where: {
          nome: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(acordos) {
        acordos.map(acordo => {
          resultado.push({descricao: acordo.nome, link: '/acordos'})
        });
      }
      const antt = await Antt.findAll({
        attributes: ['conteudo'],
        where: {
          conteudo: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(antt) {
        antt.map(antt => {
          resultado.push({descricao: antt.conteudo, link: '/antt'})
        });
      }

      var empresa = await Empresa.findAll({
        attributes: ['institucional'],
        where: {
          institucional: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(empresa) {
        empresa.map(empresa => {
          resultado.push({descricao: 'o sindicato setcapp', link: '/institucional'})
        });
      }
      var empresa = await Empresa.findAll({
        attributes: ['diretoria'],
        where: {
          diretoria: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(empresa) {
        empresa.map(empresa => {
          resultado.push({descricao: 'sobre a diretoria', link: '/diretoria'})
        });
      }
      var empresa = await Empresa.findAll({
        attributes: ['territorio'],
        where: {
          territorio: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(empresa) {
        empresa.map(empresa => {
          resultado.push({descricao: 'Territorio de atendimento', link: '/territorio'})
        });
      }
      var empresa = await Empresa.findAll({
        attributes: ['associadoPage'],
        where: {
          associadoPage: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(empresa) {
        empresa.map(empresa => {
          resultado.push({descricao: empresa.associadoPage, link: '/associado'})
        });
      }
      var eventos = await Evento.findAll({
        attributes: ['id', 'titulo'],
        where: {
          descricao: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(eventos) {
        eventos.map(evento => {
          resultado.push({descricao: evento.titulo, link: `/eventos/${evento.id}/${evento.titulo}`})
        });
      }
      var legislacao = await Legislacao.findAll({
        attributes: [ 'conteudo'],
        where: {
          conteudo: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(legislacao) {
        legislacao.map(legislacao => {
          resultado.push({descricao: legislacao.conteudo, link: `/legislacao`})
        });
      }
      var noticias = await Noticia.findAll({
        attributes: ['id', 'titulo'],
        where: {
          conteudo: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(noticias) {
        noticias.map(noticia => {
          resultado.push({descricao: noticia.titulo, link: `/noticias/${noticia.id}/${noticia.titulo}`})
        });
      }

      
      var servicos = await Servico.findAll({
        attributes: ['id', 'nome'],
        where: {
          descricao: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(servicos) {
        servicos.map(noticia => {
          resultado.push({descricao: noticia.nome, link: `/servicos`})
        });
      }
      var sindical = await Sindical.findAll({
        attributes: [ 'conteudo'],
        where: {
          conteudo: {
            [Op.like]: `%${q}%`
          }
       }
      });
      if(sindical) {
        sindical.map(sindical => {
          resultado.push({descricao: sindical.conteudo, link: `/sindical`})
        });
      }
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = SearchController;