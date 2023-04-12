const Confederados = require('../models/Confederados');

const ConfederadosController = {
  async listar(req, res) {
    try {
      const confederados = await Confederados.findAll();
      res.status(200).json(confederados);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar os serviços" });
    }
  },

  async show(req, res) {
    try {
      const confederado = await Confederados.findOne({ where: { id: req.params.id } });
      if (!confederado) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      res.status(200).json(confederado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o serviço" });
    }
  },

  async criar(req, res) {
    try {
      const { nome,  ativo, link } = JSON.parse(req.body.confederado);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.confederadoFile[0].filename;
      }
      const novoConfederados = await Confederados.create({
        nome,
        
        url,
        ativo,
        link,
      });
      res.status(201).json(novoConfederados);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar o serviço" });
    }
  },

  async update(req, res) {
    try {
      const confederado = await Confederados.findOne({ where: { id: req.params.id } });
      if (!confederado) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      const { nome,  ativo, link } = JSON.parse(req.body.confederado);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.confederadoFile[0].filename;
      }
      const confederadoAtualizado = await confederado.update({
        nome,
        
        url,
        ativo,
        link,
      });
      res.status(200).json(confederadoAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar o serviço" });
    }
  },

  async delete(req, res) {
    try {
      const confederado = await Confederados.findOne({ where: { id: req.params.id } });
      if (!confederado) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      await confederado.destroy();
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o serviço" });
    }
  },
};

module.exports = ConfederadosController;

