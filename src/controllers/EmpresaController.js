const Empresa = require('../models/Empresa');

const EmpresaImages = require('../models/EmpresaImages');

async function adicionarImagensAoEmpresa(empresaId, imagens) {
    try {
        const imagensDoEmpresa = await Promise.all(
            imagens.map(async (imagem) => {
                const imagemDoEmpresa = await EmpresaImages.create({ url: imagem.filename, empresaId: empresaId });
                return imagemDoEmpresa;
            })
        );

        return { sucesso: true };
    } catch (error) {
        return { sucesso: false, mensagem: error.message };
    }
}

const EmpresaController = {
    async criar(req, res) {
        try {
            const { nome,
                endereco,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                telefone, whatsapp, instagram, facebook, linkedin, email, latitude, longitude, institucional, diretoria } = JSON.parse(req.body.empresa);
           
                if (req.files && Object.keys(req.files).length > 0) {
                var logo = req.files.logoFile[0].filename;
                var territorio = req.files.territorioFile[0].filename;
            }
            const empresa = await Empresa.create({
                nome,
                endereco,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                telefone,
                logo,
                whatsapp,
                instagram,
                facebook,
                linkedin,
                email,
                latitude,
                longitude,
                institucional,
                diretoria,
                territorio
            });
            adicionarImagensAoEmpresa(empresa.id, req.files.imagens)
            return res.status(201).json(empresa);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar empresa' });
        }
    },

    async listar(req, res) {
        try {
            const empresas = await Empresa.findAll({
                include: [{
                  model: EmpresaImages,
                  as: 'imagens'
                }]
              });
            return res.json(empresas);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar empresas' });
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const empresa = await Empresa.findByPk(id);
            if (!empresa) {
                return res.status(404).json({ error: 'Empresa não encontrada' });
            }
            return res.json(empresa);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar empresa' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome,
                endereco,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                telefone, whatsapp, instagram, facebook, linkedin, email, latitude, longitude, institucional, diretoria } = JSON.parse(req.body.empresa);

            const empresa = await Empresa.findByPk(id);
            if (!empresa) {
                return res.status(404).json({ error: 'Empresa não encontrada' });
            }
            if (req.files && Object.keys(req.files).length > 0) {
                var logo = req.files.logoFile[0].filename;
                var territorio = req.files.territorioFile[0].filename;
            }
            await empresa.update({
                nome,
                endereco,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                telefone,
                logo,
                whatsapp,
                instagram,
                facebook,
                linkedin,
                email,
                latitude,
                longitude,
                institucional,
                diretoria,
                territorio
            });
            adicionarImagensAoEmpresa(empresa.id, req.files.imagens)
            return res.json(empresa);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar empresa' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const empresa = await Empresa.findByPk(id);
            if (!empresa) {
                return res.status(404).json({ error: 'Empresa não encontrada' });
            }
            await empresa.destroy();
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao deletar empresa' });
        }
    }
};
module.exports = EmpresaController;