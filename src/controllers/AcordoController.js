const Acordos = require('../models/Acordos');

const AcordosController = {
  async listar(req, res) {
    try {
      const acordos = await Acordos.findAll();
      res.status(200).json(acordos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar os serviços" });
    }
  },

  async show(req, res) {
    try {
      const acordo = await Acordos.findOne({ where: { id: req.params.id } });
      if (!acordo) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      res.status(200).json(acordo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o serviço" });
    }
  },

  async criar(req, res) {
    try {
      const { nome } = JSON.parse(req.body.acordo);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.acordoFile[0].filename;
      }
      const novoAcordos = await Acordos.create({
        nome,
        url
      });
      res.status(201).json(novoAcordos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar o serviço" });
    }
  },

  async update(req, res) {
    try {
      const acordo = await Acordos.findOne({ where: { id: req.params.id } });
      if (!acordo) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      const { nome } = JSON.parse(req.body.acordo);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.acordoFile[0].filename;
      }
      const acordoAtualizado = await acordo.update({
        nome,
        url
      });
      res.status(200).json(acordoAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar o serviço" });
    }
  },

  async delete(req, res) {
    try {
      const acordo = await Acordos.findOne({ where: { id: req.params.id } });
      if (!acordo) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      await acordo.destroy();
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o serviço" });
    }
  },
};

module.exports = AcordosController;

