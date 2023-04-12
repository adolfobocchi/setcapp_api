const Contatos = require('../models/Contatos');

const ContatosController = {
  async listar(req, res) {
    try {
      const contatos = await Contatos.findAll();
      res.status(200).json(contatos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar os serviços" });
    }
  },

  async show(req, res) {
    try {
      const contato = await Contatos.findOne({ where: { id: req.params.id } });
      if (!contato) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      res.status(200).json(contato);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o serviço" });
    }
  },

  async criar(req, res) {
    try {
      const { nome, email, assunto, telefone, mensagem } = req.body;
      const novoContatos = await Contatos.create({
        nome, email, assunto, telefone, mensagem
      });
      res.status(201).json(novoContatos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar o serviço" });
    }
  },

  async update(req, res) {
    try {
      const contato = await Contatos.findOne({ where: { id: req.params.id } });
      if (!contato) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      const { nome, email, assunto, telefone, mensagem } = req.body;
      const contatoAtualizado = await contato.update({
        nome, email, assunto, telefone, mensagem
      });
      res.status(200).json(contatoAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar o serviço" });
    }
  },

  async delete(req, res) {
    try {
      const contato = await Contatos.findOne({ where: { id: req.params.id } });
      if (!contato) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      await contato.destroy();
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o serviço" });
    }
  },
};

module.exports = ContatosController;

