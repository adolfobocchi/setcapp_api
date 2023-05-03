const SliderItem = require('../models/SliderItem');
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

const SliderItemController = {
  async listar(req, res) {
    try {
      const sliderItems = await SliderItem.findAll({
        order: [['order', 'ASC']]
      });
      return res.json(sliderItems);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar sliderItems' });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const sliderItem = await SliderItem.findByPk(id);

      if (!sliderItem) {
        return res.status(404).json({ error: 'SliderItem não encontrado' });
      }

      return res.json(sliderItem);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar sliderItem' });
    }
  },

  async criar(req, res) {
    try {

      const { order, descricao, link, ativo } = JSON.parse(req.body.slider);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.sliderFile[0].filename;
      }
      const sliderItem = await SliderItem.create({
        url,
        order,
        descricao,
        link,
        ativo
      }
      );
      return res.status(201).json(sliderItem);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao criar sliderItem' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const slider = await SliderItem.findByPk(id);

      if (!slider) {
        return res.status(404).json({ error: 'SliderItem não encontrado' });
      }

      const { order, descricao, link, ativo } = JSON.parse(req.body.slider);
      if (req.files && Object.keys(req.files).length > 0) {
        var url = req.files.sliderFile[0].filename;
      }
      await slider.update({
        url,
        order,
        descricao,
        link,
        ativo
      }
      );

      return res.json(slider);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar sliderItem' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await SliderItem.findByPk(id);
      if (!deleted) {
        return res.status(404).json({ error: 'SliderItem não encontrado' });
      }
      const url = deleted.url;
      await deleted.destroy()
      deleteImage(url);
      return res.json({ message: 'SliderItem excluído com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao excluir sliderItem' });
    }
  },
};

module.exports = SliderItemController;