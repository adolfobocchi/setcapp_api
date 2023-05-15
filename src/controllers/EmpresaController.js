require('dotenv').config();
const fs = require('fs');
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

function deleteImage(imageName) {
    console.log(imageName);
    let imagePath = `${process.env.PATH_WWW}/public/images/${imageName}`;
    console.log(imagePath);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return false;
      }
      console.log('Arquivo excluído com sucesso');
      return true;
    });
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
                telefone, whatsapp, instagram, facebook, linkedin, email, latitude, longitude, institucional, diretoria, territorio, associadoPage } = JSON.parse(req.body.empresa);

            if (req.files && Object.keys(req.files).length > 0) {
                var logo = req.files.logoFile[0].filename;
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
                territorio,
                associadoPage
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
                telefone, whatsapp, instagram, facebook, linkedin, email, latitude, longitude, institucional, diretoria, territorio, associadoPage } = JSON.parse(req.body.empresa);

            const empresa = await Empresa.findByPk(id);
            if (!empresa) {
                return res.status(404).json({ error: 'Empresa não encontrada' });
            }
            if (req.files && Object.keys(req.files).length > 0) {
                var logo = req.files.logoFile?.[0].filename;
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
                territorio,
                associadoPage
            });
            adicionarImagensAoEmpresa(empresa.id, req.files.imagens);
            const empresaUpdate = await Empresa.findAll({
                where: {id: id},
                include: [{
                    model: EmpresaImages,
                    as: 'imagens'
                }]
            });
            return res.json(empresaUpdate);
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
    },

    async deleteImagensEmpresa(req, res) {
        try {
            const { id } = req.params;
            const empresaImages = await EmpresaImages.findByPk(id);
            if (!empresaImages) {
                return res.status(404).json({ error: 'Empresa não encontrada' });
            }
            
            deleteImage(empresaImages.url)
                
                await empresaImages.destroy();
                return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao deletar empresa' });
        }
    }
};
module.exports = EmpresaController;