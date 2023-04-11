const Servico = require('../models/Servicos');

const ServicoController = {
  async listar(req, res) {
    try {
      const servicos = await Servico.findAll();
      res.status(200).json(servicos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar os serviços" });
    }
  },

  async show(req, res) {
    try {
      const servico = await Servico.findOne({ where: { id: req.params.id } });
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      res.status(200).json(servico);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o serviço" });
    }
  },

  async criar(req, res) {
    try {
      const { nome, descricao, url, ativo, link } = req.body;
      const novoServico = await Servico.create({
        nome,
        descricao,
        url,
        ativo,
        link,
      });
      res.status(201).json(novoServico);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar o serviço" });
    }
  },

  async update(req, res) {
    try {
      const servico = await Servico.findOne({ where: { id: req.params.id } });
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      const { nome, descricao, url, ativo, link } = req.body;
      const servicoAtualizado = await servico.update({
        nome,
        descricao,
        url,
        ativo,
        link,
      });
      res.status(200).json(servicoAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar o serviço" });
    }
  },

  async delete(req, res) {
    try {
      const servico = await Servico.findOne({ where: { id: req.params.id } });
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      await servico.destroy();
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o serviço" });
    }
  },
};

module.exports = ServicoController;

