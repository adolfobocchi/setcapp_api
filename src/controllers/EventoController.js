const Evento = require('../models/Eventos');

const ImagemEvento = require('../models/EventosImages');

async function adicionarImagensAoEvento(eventoId, imagens) {
  try {
    const imagensDoEvento = await Promise.all(
      imagens.map(async (imagem) => {
        const imagemDoEvento = await ImagemEvento.create({ url: imagem.filename, EventoId: eventoId });
        return imagemDoEvento;
      })
    );

    return { sucesso: true };
  } catch (error) {
    return { sucesso: false, mensagem: error.message };
  }
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
      const evento = await Evento.findByPk(req.params.id);
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      } 
      evento.titulo = titulo;
      evento.descricao = descricao;
      evento.data = data;
      evento.hora = hora;
      evento.local = local;
      evento.ativo = ativo;
      await evento.save();
      return res.json(evento);
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
      await evento.destroy();
      return res.json({ message: 'Evento removido com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao remover evento' });
    }
  },
};

module.exports = EventoController;
