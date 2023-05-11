const Curriculos = require('../models/Curriculos');
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

const CurriculosController = {
  async listar(req, res) {
    try {
      const curriculo = await Curriculos.findAll();
      res.status(200).json(curriculo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar os curriculo" });
    }
  },

  async show(req, res) {
    try {
      const curriculo = await Curriculos.findOne({ where: { id: req.params.id } });
      if (!curriculo) {
        return res.status(404).json({ message: "Curriculo não encontrado" });
      }
      res.status(200).json(curriculo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o serviço" });
    }
  },

  async criar(req, res) {
    try {
      const { nome, email, cargo, telefone } =  JSON.parse(req.body.curriculum);
      if (req.files ) {
        var url = req.files.curriculoFile[0].filename;
      }
      const novoCurriculos = await Curriculos.create({
        nome, email, cargo, telefone, url
      });
      res.status(201).json(novoCurriculos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar o serviço" });
    }
  },

  async update(req, res) {
    try {
      const curriculo = await Curriculos.findOne({ where: { id: req.params.id } });
      if (!curriculo) {
        return res.status(404).json({ message: "Curriculo não encontrado" });
      }
      const { nome, email, cargo, telefone } = JSON.parse(req.body.curriculum);
      if (req.files ) {
        var url = req.files.curriculoFile[0].filename;
      }
      const curriculoAtualizado = await curriculo.update({
        nome, email, cargo, telefone, url
      });
      res.status(200).json(curriculoAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar o serviço" });
    }
  },

  async delete(req, res) {
    try {
      const curriculo = await Curriculos.findOne({ where: { id: req.params.id } });
      if (!curriculo) {
        return res.status(404).json({ message: "Curriculo não encontrado" });
      }
      const url = curriculo.url;
      await curriculo.destroy();
      deleteImage(url);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o serviço" });
    }
  },
};

module.exports = CurriculosController;

