const Associado = require('../models/Associados');

const EventoController = {
    async criar(req, res) {
        // Criar um objeto Associado com as informações recebidas na requisição
        const associado = {
            razaoSocial: req.body.razaoSocial || '',
            nomeFantasia: req.body.nomeFantasia || '',
            endereco: req.body.endereco || '',
            cidade: req.body.cidade || '',
            estado: req.body.estado || '',
            bairro: req.body.bairro || '',
            cep: req.body.cep || '',
            telefone: req.body.telefone || '',
            celular: req.body.celular || '',
            email: req.body.email || '',
            cnpj: req.body.cnpj || '',
            ie: req.body.ie || '',
            juntacomercial: req.body.juntacomercial || '',
            dataInicioAtividade: req.body.dataInicioAtividade || null,
            matriz: req.body.matriz || false,
            veiculos: req.body.veiculos || 0,
            funcionarios: req.body.funcionarios || 0,
            responsavel: req.body.responsavel || null,
            cargacomum: req.body.cargacomum || false,
            cargaliquidagranel: req.body.cargaliquidagranel || false,
            cargasolidagranel: req.body.cargasolidagranel || false,
            cargaindivisiveis: req.body.cargaindivisiveis || false,
            cargaaquecida: req.body.cargaaquecida || false,
            cargasiderurgica: req.body.cargasiderurgica || false,
            cargamadeiras: req.body.cargamadeiras || false,
            cargaviva: req.body.cargaviva || false,
            cargaperecivel: req.body.cargaperecivel || false,
            cargalixo: req.body.cargalixo || false,
            cargavalores: req.body.cargavalores || false,
            cargaconcreto: req.body.cargaconcreto || false,
            cargaveiculos: req.body.cargaveiculos || false,
            cargacontainer: req.body.cargacontainer || false,
            cargaoutros: req.body.cargaoutros || false
        };
        console.log(associado);
        // Salvar o novo associado no banco de dados
        Associado.create(associado)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                    message: err.message || 'Ocorreu um erro ao criar o associado.'
                });
            });
    },

    async listarPage(req, res) {
        try {
            const { page, ativo } = req.params;
            let associados = null;
            if (ativo == 1) {
                associados = await Associado.findAll({
                    order: [['razaoSocial', 'asc']],
                    limit: page * 10,
                    offset: (page - 1) * 10

                });
            } else {
                associados = await Associado.findAll({
                    order: [['razaoSocial', 'asc']],
                    limit: page * 10,
                    offset: (page - 1) * 10

                });
            }
            res.status(200).json(associados);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async listar(req, res) {
        try {
            const associados = await Associado.findAll();
            res.status(200).json(associados);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao buscar os associados" });
        }
    },

    async show(req, res) {
        try {
            const associado = await Associado.findByPk(req.params.id);
            if (associado) {
                res.status(200).json(associado);
            } else {
                res.status(404).json({ message: 'Associado não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
            const associado = await Associado.findByPk(req.params.id);
            if (associado) {

              //const {titulo, conteudo, data_hora, ativo } = req.body;
              await associado.update(
                {
                    razaoSocial: req.body.razaoSocial || '',
                    nomeFantasia: req.body.nomeFantasia || '',
                    endereco: req.body.endereco || '',
                    cidade: req.body.cidade || '',
                    estado: req.body.estado || '',
                    bairro: req.body.bairro || '',
                    cep: req.body.cep || '',
                    telefone: req.body.telefone || '',
                    celular: req.body.celular || '',
                    email: req.body.email || '',
                    cnpj: req.body.cnpj || '',
                    ie: req.body.ie || '',
                    juntacomercial: req.body.juntacomercial || '',
                    dataInicioAtividade: req.body.dataInicioAtividade || null,
                    matriz: req.body.matriz || false,
                    veiculos: req.body.veiculos || 0,
                    funcoinarios: req.body.funcoinarios || 0,
                    responsavel: req.body.responsavel || null,
                    cargacomum: req.body.cargacomum || false,
                    cargaliquidagranel: req.body.cargaliquidagranel || false,
                    cargasolidagranel: req.body.cargasolidagranel || false,
                    cargaindivisiveis: req.body.cargaindivisiveis || false,
                    cargaaquecida: req.body.cargaaquecida || false,
                    cargasiderurgica: req.body.cargasiderurgica || false,
                    cargamadeiras: req.body.cargamadeiras || false,
                    cargaviva: req.body.cargaviva || false,
                    cargaperecivel: req.body.cargaperecivel || false,
                    cargalixo: req.body.cargalixo || false,
                    cargavalores: req.body.cargavalores || false,
                    cargaconcreto: req.body.cargaconcreto || false,
                    cargaveiculos: req.body.cargaveiculos || false,
                    cargacontainer: req.body.cargacontainer || false,
                    cargaoutros: req.body.cargaoutros || false
                }
              );
              res.status(200).json(associado);
            } else {
              res.status(404).json({ message: 'Associado não encontrada' });
            }
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    },

    async delete(req, res) {
        try {
            const associado = await Associado.findByPk(req.params.id);
            if (associado) {
              await associado.destroy();
              res.status(204).send();
            } else {
              res.status(404).json({ message: 'Associado não encontrada' });
            }
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    }
}
module.exports = EventoController;