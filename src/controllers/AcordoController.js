const Acordos = require('../models/Acordos');
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


const AcordosController = {
  async listar(req, res) {
    try {
      const acordos = await Acordos.findAll();
      res.status(200).json(acordos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar os registros" });
    }
  },

  async show(req, res) {
    try {
      const acordo = await Acordos.findOne({ where: { id: req.params.id } });
      if (!acordo) {
        return res.status(404).json({ message: "registro não encontrado" });
      }
      res.status(200).json(acordo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o registro" });
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
      res.status(500).json({ message: "Erro ao criar o registro" });
    }
  },

  async update(req, res) {
    try {
      const acordo = await Acordos.findOne({ where: { id: req.params.id } });
      if (!acordo) {
        return res.status(404).json({ message: "registro não encontrado" });
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
      res.status(500).json({ message: "Erro ao atualizar o registro" });
    }
  },

  async delete(req, res) {
    try {
      const acordo = await Acordos.findOne({ where: { id: req.params.id } });
      if (!acordo) {
        return res.status(404).json({ message: "registro não encontrado" });
      }
      const url = acordo.url;
      await acordo.destroy();
      deleteImage(url);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o registro" });
    }
  },
};

module.exports = AcordosController;

