const Sindicals = require('../models/Sindical');
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

const SindicalController = {
  async listar(req, res) {
    try {
      const sindical = await Sindicals.findAll();
      res.status(200).json(sindical);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar os sindical" });
    }
  },

  async show(req, res) {
    try {
      const sindical = await Sindicals.findOne({ where: { id: req.params.id } });
      if (!sindical) {
        return res.status(404).json({ message: "Sindical não encontrado" });
      }
      res.status(200).json(sindical);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o sindical" });
    }
  },

  async criar(req, res) {
    try {
      const { conteudo } = JSON.parse(req.body.sindical);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.sindicalFile[0].filename;
      }
      const novoSindical = await Sindicals.create({
        conteudo,
        url
      });
      res.status(201).json(novoSindical);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar o sindical" });
    }
  },

  async update(req, res) {
    try {
      const sindical = await Sindicals.findOne({ where: { id: req.params.id } });
      if (!sindical) {
        return res.status(404).json({ message: "Sindical não encontrado" });
      }
      const { conteudo } = JSON.parse(req.body.sindical);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.sindicalFile[0].filename;
      }
      const sindicalAtualizado = await sindical.update({
        conteudo,
        url
      });
      res.status(200).json(sindicalAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar o sindical" });
    }
  },

  async delete(req, res) {
    try {
      const sindical = await Sindicals.findOne({ where: { id: req.params.id } });
      if (!sindical) {
        return res.status(404).json({ message: "Sindical não encontrado" });
      }
      const url = sindical.url;
      await sindical.destroy();
      deleteImage(url);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o sindical" });
    }
  },
};

module.exports = SindicalController;

