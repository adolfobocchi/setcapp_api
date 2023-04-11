const Associado = require('../models/Associados');

const EventoController = {
    async criar(req, res) {
        if (!req.body.razaoSocial || !req.body.nomeFantasia || !req.body.cnpj || !req.body.endereco) {
            res.status(400).send({ message: 'Erro: Informe todos os campos obrigatórios!' });
            return;
        }

        // Criar um objeto Associado com as informações recebidas na requisição
        const associado = {
            razaoSocial: req.body.razaoSocial,
            nomeFantasia: req.body.nomeFantasia,
            cnpj: req.body.cnpj,
            endereco: req.body.endereco,
            cidade: req.body.cidade || null,
            estado: req.body.estado || null,
            cep: req.body.cep || null,
            telefone: req.body.telefone || null,
            email: req.body.email || null,
            responsavel: req.body.responsavel || null,
            dataInicioAtividade: req.body.dataInicioAtividade || null,
            ie: req.body.ie || null,
            im: req.body.im || null,
            cargacomum: req.body.cargacomum || false,
            mudanca: req.body.mudanca || false,
            bebidas: req.body.bebidas || false,
            containers: req.body.containers || false,
            explosivos: req.body.explosivos || false,
            gases: req.body.gases || false,
            encomendas: req.body.encomendas || false,
            cargagranelsolida: req.body.cargagranelsolida || false,
            cargagranelliquida: req.body.cargagranelliquida || false,
            cargaviva: req.body.cargaviva || false,
            cargaaquecida: req.body.cargaaquecida || false,
            solidosInflamaveis: req.body.solidosInflamaveis || false,
            substanciasToxicas: req.body.substanciasToxicas || false,
            veiculosAutomotores: req.body.veiculosAutomotores || false,
            frigorificas: req.body.frigorificas || false,
            valores: req.body.valores || false,
            corrosiva: req.body.corrosiva || false,
            diversas: req.body.diversas || false
        };

        // Salvar o novo associado no banco de dados
        Associado.create(associado)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Ocorreu um erro ao criar o associado.'
                });
            });
    },

    async listar(req, res) {
        const nomeFantasia = req.query.nomeFantasia;
        const condicao = nomeFantasia ? { nomeFantasia: { [db.Sequelize.Op.like]: `%${nomeFantasia}%` } } : null;

        Associado.findAll({ where: condicao })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Ocorreu um erro ao buscar os associados.'
                });
            });
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const associado = await Associado.findByPk(id);

            if (!associado) {
                return res.status(404).json({ error: 'Associado não encontrado' });
            }

            return res.json(associado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar associado' });
        }
    },

    async update(req, res) {
        const associadoId = req.params.id;

        // Buscar o associado no banco de dados pelo ID
        Associado.findByPk(associadoId)
            .then((associado) => {
                // Verificar se o associado existe
                if (!associado) {
                    return res.status(404).json({ error: 'Associado não encontrado.' });
                }

                // Atualizar os dados do associado com os valores do corpo da requisição
                associado.update(req.body)
                    .then((updatedAssociado) => {
                        res.status(200).json({ associado: updatedAssociado });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ error: 'Não foi possível atualizar o associado.' });
                    });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Não foi possível buscar o associado.' });
            });
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            const associado = await Associado.findByPk(id);

            if (!associado) {
                return res.status(404).json({ error: 'Associado não encontrado' });
            }

            await associado.destroy();

            return res.json({ message: 'Associado excluído com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao excluir associado' });
        }
    }
}
module.exports = EventoController;