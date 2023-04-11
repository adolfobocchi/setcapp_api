const LegislacaoController = {};

const Legislacao = require('../models/Legislacao');

LegislacaoController.listar = async (req, res) => {
  try {
    const legis = await Legislacao.findAll();
    return res.status(200).json(legis);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching legislations' });
  }
};

LegislacaoController.show = async (req, res) => {
  const { id } = req.params;

  try {
    const legis = await Legislacao.findByPk(id);

    if (!legis) {
      return res.status(404).json({ message: 'Legislation not found' });
    }

    return res.status(200).json(legis);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching legislation' });
  }
};

LegislacaoController.criar = async (req, res) => {
  console.log(req.body)
  const { conteudo } = req.body;

  try {
    const newLegis = await Legislacao.create({
      conteudo,
    });

    return res.status(201).json(newLegis);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating legislation' });
  }
};

LegislacaoController.update = async (req, res) => {
  const { id } = req.params;
  const { conteudo } = req.body;
  try {
    const legis = await Legislacao.findByPk(id);

    if (!legis) {
      return res.status(404).json({ message: 'Legislation not found' });
    }

    await Legislacao.update(
      {
        conteudo,
      },
      { where: { id } },
    );

    return res.status(200).json({ message: 'Legislation updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating legislation' });
  }
};

LegislacaoController.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const legis = await Legislacao.findByPk(id);

    if (!legis) {
      return res.status(404).json({ message: 'Legislation not found' });
    }

    await Legislacao.destroy({ where: { id } });

    return res.status(200).json({ message: 'Legislation deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting legislation' });
  }
};

module.exports = LegislacaoController;
