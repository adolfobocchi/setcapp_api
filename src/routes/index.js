require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const AuthController = require('../controllers/AuthController');
const EmpresaController = require('../controllers/EmpresaController');
const LegislacaoController = require('../controllers/LegislacaoController');
const NoticiaController = require('../controllers/NoticiaController');
const ServicoController = require('../controllers/ServicoController');
const SliderItemController = require('../controllers/SliderItemController');
const AssociadoController = require('../controllers/AssociadoController');
const EventoController = require('../controllers/EventoController');
const ConfederadoController = require('../controllers/ConfederadosController');
const AcordoController = require('../controllers/AcordoController');
const ContatoController = require('../controllers/ContatoController');
const CurriculoController = require('../controllers/CurriculoController');
const AnttController = require('../controllers/AnttController');
const SindicalController = require('../controllers/SindicalController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${process.env.PATH_WWW}/public/images/`)
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[file.originalname.split('.').length-1];
        const novoNomeArquivo = crypto.randomBytes(16).toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

router.get('/ping', (req,res) => res.send('pong'));

router.post('/login', AuthController.login);
router.post('/signup', AuthController.private, AuthController.signup);
router.post('/logout', AuthController.logout);
router.post('/token', AuthController.isTokenValid);

router.get('/empresa', EmpresaController.listar);
router.post('/empresa', AuthController.private, upload.fields([{ name: 'logoFile' }, { name: 'imagens', maxCount: 20 }]), EmpresaController.criar);
router.get('/empresa/:id', EmpresaController.show);
router.put('/empresa/:id', AuthController.private, upload.fields([{ name: 'logoFile' }, { name: 'imagens', maxCount: 20 }]), EmpresaController.update);
router.delete('/empresa/:id', AuthController.private, EmpresaController.delete);
router.delete('/empresa/imagemempresa/:id', AuthController.private, EmpresaController.deleteImagensEmpresa);

router.get('/noticia/page/:page/:ativo', NoticiaController.listar);
router.get('/noticia/:id', NoticiaController.show);
router.post('/noticia', AuthController.private, NoticiaController.criar);
router.put('/noticia/:id', AuthController.private, NoticiaController.update);
router.delete('/noticia/:id', AuthController.private, NoticiaController.delete);

router.get('/slider', SliderItemController.listar);
router.get('/slider/:id', SliderItemController.show);
router.post('/slider', AuthController.private, upload.fields([{name: 'sliderFile'}]), SliderItemController.criar);
router.put('/slider/:id', AuthController.private, upload.fields([{name: 'sliderFile'}]), SliderItemController.update);
router.delete('/slider/:id', AuthController.private, SliderItemController.delete);

router.get('/servico', ServicoController.listar);
router.get('/servico/:id', ServicoController.show);
router.post('/servico', AuthController.private, upload.fields([{name: 'servicoFile'}]), ServicoController.criar);
router.put('/servico/:id', AuthController.private, upload.fields([{name: 'servicoFile'}]), ServicoController.update);
router.delete('/servico/:id', AuthController.private, ServicoController.delete);

router.get('/confederado', ConfederadoController.listar);
router.get('/confederado/:id', ConfederadoController.show);
router.post('/confederado', AuthController.private, upload.fields([{name: 'confederadoFile'}]), ConfederadoController.criar);
router.put('/confederado/:id', AuthController.private, upload.fields([{name: 'confederadoFile'}]), ConfederadoController.update);
router.delete('/confederado/:id', AuthController.private, ConfederadoController.delete);

router.get('/acordo', AcordoController.listar);
router.get('/acordo/:id', AcordoController.show);
router.post('/acordo', AuthController.private, upload.fields([{name: 'acordoFile'}]), AcordoController.criar);
router.put('/acordo/:id', AuthController.private, upload.fields([{name: 'acordoFile'}]), AcordoController.update);
router.delete('/acordo/:id', AuthController.private, AcordoController.delete);

router.get('/contato', AuthController.private, ContatoController.listarPage);
router.get('/contato/:id', AuthController.private, ContatoController.show);
router.post('/contato',  ContatoController.criar);
router.put('/contato/:id', AuthController.private, ContatoController.update);
router.delete('/contato/:id', AuthController.private, ContatoController.delete);


router.get('/curriculo', AuthController.private, CurriculoController.listar);
router.get('/curriculo/:id', AuthController.private, CurriculoController.show);
router.post('/curriculo', upload.fields([{name: 'curriculoFile'}]), CurriculoController.criar);
router.put('/curriculo/:id', upload.fields([{name: 'curriculoFile'}]), AuthController.private, CurriculoController.update);
router.delete('/curriculo/:id', AuthController.private, CurriculoController.delete);



router.get('/legislacao', LegislacaoController.listar);
router.get('/legislacao/:id', LegislacaoController.show);
router.post('/legislacao', AuthController.private, LegislacaoController.criar);
router.put('/legislacao/:id', AuthController.private, LegislacaoController.update);
router.delete('/legislacao/:id', AuthController.private, LegislacaoController.delete);

router.get('/associado/page/:page/:ativo', AuthController.private, AssociadoController.listarPage);
router.get('/associado/:id', AuthController.private, AssociadoController.show);
router.post('/associado', AssociadoController.criar);
router.put('/associado/:id', AuthController.private, AssociadoController.update);
router.delete('/associado/:id', AuthController.private, AssociadoController.delete);

router.get('/evento/page/:page/:ativo', EventoController.listar);
router.get('/evento/:id', EventoController.show);
router.post('/evento', AuthController.private, upload.fields([{ name: 'imagens', maxCount: 10 }]), EventoController.criar);
router.put('/evento/:id', AuthController.private, upload.fields([{ name: 'imagens', maxCount: 10 }]), EventoController.update);
router.delete('/evento/:id', AuthController.private, EventoController.delete);
router.delete('/evento/imagemevento/:id', AuthController.private, EventoController.deleteImagensEvento);

router.get('/antt', AnttController.listar);
router.get('/antt/:id', AnttController.show);
router.post('/antt', AuthController.private, upload.fields([{name: 'anttFile'}]), AnttController.criar);
router.put('/antt/:id', AuthController.private, upload.fields([{name: 'anttFile'}]), AnttController.update);
router.delete('/antt/:id', AuthController.private, AnttController.delete);

router.get('/sindical', SindicalController.listar);
router.get('/sindical/:id', SindicalController.show);
router.post('/sindical', AuthController.private, upload.fields([{name: 'sindicalFile'}]), SindicalController.criar);
router.put('/sindical/:id', AuthController.private, upload.fields([{name: 'sindicalFile'}]), SindicalController.update);
router.delete('/sindical/:id', AuthController.private, SindicalController.delete);


module.exports = router;
