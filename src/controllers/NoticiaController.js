const Noticia = require('../models/Noticias');

const NoticiaController = {
async listar (req, res) {
  try {
    const noticias = await Noticia.findAll({ where: { ativo: true } });
    res.status(200).json(noticias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

// Criar uma nova noticia
async criar(req, res) {
  try {
    const {titulo, conteudo, data_hora, ativo } = req.body;
    const novaNoticia = await Noticia.create({titulo, conteudo, data_hora, ativo });
    res.status(201).json(novaNoticia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},

// Buscar uma noticia pelo ID
async show (req, res) {
  try {
    const noticia = await Noticia.findByPk(req.params.id);
    if (noticia) {
      res.status(200).json(noticia);
    } else {
      res.status(404).json({ message: 'Notícia não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

// Atualizar uma noticia existente
async update(req, res) {
  try {
    const noticia = await Noticia.findByPk(req.params.id);
    if (noticia) {
      const {titulo, conteudo, data_hora, ativo } = req.body;
      await noticia.update(
        {titulo, conteudo, data_hora, ativo }
      );
      res.status(200).json(noticia);
    } else {
      res.status(404).json({ message: 'Notícia não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},

// Deletar uma noticia existente
async delete(req, res) {
  try {
    const noticia = await Noticia.findByPk(req.params.id);
    if (noticia) {
      await noticia.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Notícia não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
};

module.exports = NoticiaController;