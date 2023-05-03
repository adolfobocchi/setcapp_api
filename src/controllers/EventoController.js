const Evento = require('../models/Eventos');
const fs = require('fs');
const ImagemEvento = require('../models/EventosImages');

async function adicionarImagensAoEvento(eventoId, imagens) {
  try {
    const imagensDoEvento = await Promise.all(
      imagens.map(async (imagem) => {
        const imagemDoEvento = await ImagemEvento.create({ url: imagem.filename, eventoId: eventoId });
        return imagemDoEvento;
      })
    );

    return { sucesso: true };
  } catch (error) {
    return { sucesso: false, mensagem: error.message };
  }
}
function deleteImage(imageName) {
  let imagePath = `${process.env.PATH_WWW}/public/images/${imageName}`;
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      return false;
    }
    console.log('Arquivo excluído com sucesso');
    return true;
  });
}


const EventoController = {
  async listar(req, res) {
    try {
      const eventos = await Evento.findAll({
        include: [{
          model: ImagemEvento,
          as: 'imagens'
        }]
      });
      return res.json(eventos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
  },

  async show(req, res) {
    try {
      const evento = await Evento.findByPk(req.params.id);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      return res.json(evento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar evento' });
    }
  },

  async criar(req, res) {
    const { titulo, descricao, data, hora, local, ativo } = JSON.parse(req.body.evento);
    try {
      const evento = await Evento.create({
        titulo,
        descricao,
        data,
        hora,
        local,
        ativo
      });
      adicionarImagensAoEvento(evento.id, req.files.imagens);
      return res.status(201).json(evento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar evento' });
    }
  },

  async update(req, res) {
    const { titulo, descricao, data, hora, local, ativo } = JSON.parse(req.body.evento);
    try {
      const evento = await Evento.findByPk(req.params.id, {
        include: [{
          model: ImagemEvento,
          as: 'imagens'
        }]
      });
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      await evento.update({
        titulo,
        descricao,
        data,
        hora,
        local,
        ativo
      });
      adicionarImagensAoEvento(evento.id, req.files.imagens);
      const eventoUpdate = await Evento.findByPk(req.params.id, {
        include: [{
          model: ImagemEvento,
          as: 'imagens'
        }]
      });
      return res.status(201).json(eventoUpdate);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar evento' });
    }
  },

  async delete(req, res) {
    try {
      const evento = await Evento.findByPk(req.params.id);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      const ImagensEvento = await ImagemEvento.findAll({ where: { eventoId: evento.id } })
      ImagensEvento.forEach(async (imagemEvento) => {
        deleteImage(imagemEvento.url)
        await ImagemEvento.destroy({
          where: { id: imagemEvento.id }
        });
      }
      );
      await evento.destroy();
      return res.json({ message: 'Evento removido com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao remover evento' });
    }
  },

  async deleteImagensEvento(req, res) {
    try {
      const { id } = req.params;
      const eventoImages = await ImagemEvento.findByPk(id);
      if (!eventoImages) {
        return res.status(404).json({ error: 'Evento não encontrada' });
      }

      deleteImage(eventoImages.url)

      await eventoImages.destroy();
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao deletar evento' });
    }
  }
};

module.exports = EventoController;
