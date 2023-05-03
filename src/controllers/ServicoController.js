const Servico = require('../models/Servicos');
const fs = require('fs');

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
      const { nome, descricao, ativo, link } = JSON.parse(req.body.servico);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.servicoFile[0].filename;
      }
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
      const { nome, descricao, ativo, link } = JSON.parse(req.body.servico);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.servicoFile[0].filename;
      }
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
      const { id } = req.params; 
      const servico = await Servico.findOne({ where: { id: id} });
      if (!servico) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      const url = servico.url;
      await servico.destroy();
      deleteImage(url);
      res.status(204).json({ message: 'SliderItem excluído com sucesso' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o serviço" });
    }
  },
};

module.exports = ServicoController;

