require('dotenv').config();
const fs = require('fs');
const Empresa = require('../models/Empresa');

const EmpresaImages = require('../models/EmpresaImages');

async function adicionarImagensAoEmpresa(id, empresaId, legenda, imagens) {
    try {
        await Promise.all(
            imagens.map(async (imagem) => {
                if(id === 0) {
                    const imagemDoEmpresa = await EmpresaImages.create({ url: imagem.filename, legenda: legenda, empresaId: empresaId });
                    return imagemDoEmpresa;
                } else {
                    const empresaImagem = await EmpresaImages.findByPk(id);
                    await empresaImagem.update({ url: imagem.filename, legenda: legenda, empresaId: empresaId })
                    return empresaImagem;
                }
            })
        );

        return { sucesso: true };
    } catch (error) {
        console.log(error);
        return { sucesso: false, mensagem: error.message };
    }
}

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
            //adicionarImagensAoEmpresa(empresa.id, legenda || '', req.files.territorioFile)
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
            //adicionarImagensAoEmpresa(empresa.id, imagemEstruturaSelected,req.files.territorioFile);
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
    },

    async gravarImagemEmpresa(req, res) {
        try {
            const { empresaId } = req.params;
            let { id, legenda, url } = JSON.parse(req.body.imagemEmpresa);
            //const result = await adicionarImagensAoEmpresa(id, empresaId, legenda || '', req.files.territorioFile);
            if (req.files && Object.keys(req.files).length > 0) {
                url = req.files.territorioFile[0].filename;
            }
            if(id === 0) {
                await EmpresaImages.create({ url: url, legenda: legenda, empresaId: empresaId });
                
            } else {
                const empresaImagem = await EmpresaImages.findByPk(id);
                await empresaImagem.update({ url: url, legenda: legenda, empresaId: empresaId })
                
            }
            const empresaUpdate = await Empresa.findAll({
                where: {id: empresaId},
                include: [{
                    model: EmpresaImages,
                    as: 'imagens'
                }]
            });
            return res.status(201).json(empresaUpdate);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar empresa' });
        }
    },
};
module.exports = EmpresaController;