const Antts = require('../models/Antt');
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

const AnttController = {
  async listar(req, res) {
    try {
      const antt = await Antts.findAll();
      res.status(200).json(antt);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar os serviços" });
    }
  },

  async show(req, res) {
    try {
      const antt = await Antts.findOne({ where: { id: req.params.id } });
      if (!antt) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      res.status(200).json(antt);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o serviço" });
    }
  },

  async criar(req, res) {
    try {
      const { conteudo } = JSON.parse(req.body.antt);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.anttFile[0].filename;
      }
      const novoAntt = await Antts.create({
        conteudo,
        url
      });
      res.status(201).json(novoAntt);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao criar o serviço" });
    }
  },

  async update(req, res) {
    try {
      const antt = await Antts.findOne({ where: { id: req.params.id } });
      if (!antt) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      const { conteudo } = JSON.parse(req.body.antt);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.anttFile[0].filename;
      }
      const anttAtualizado = await antt.update({
        conteudo,
        url
      });
      res.status(200).json(anttAtualizado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao atualizar o serviço" });
    }
  },

  async delete(req, res) {
    try {
      const antt = await Antts.findOne({ where: { id: req.params.id } });
      if (!antt) {
        return res.status(404).json({ message: "Serviço não encontrado" });
      }
      const url = antt.url;
      await antt.destroy();
      deleteImage(url);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o serviço" });
    }
  },
};

module.exports = AnttController;

