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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
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
router.post('/empresa', AuthController.private, upload.fields([{ name: 'logoFile' }, { name: 'territorioFile' }, { name: 'imagens', maxCount: 20 }]), EmpresaController.criar);
router.get('/empresa/:id', EmpresaController.show);
router.put('/empresa/:id', AuthController.private, upload.fields([{ name: 'logoFile' }, { name: 'territorioFile' }, { name: 'imagens', maxCount: 20 }]), EmpresaController.update);
router.delete('/empresa/:id', AuthController.private, EmpresaController.delete);

router.get('/noticia', NoticiaController.listar);
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

router.get('/contato', AuthController.private, ContatoController.listar);
router.get('/contato/:id', AuthController.private, ContatoController.show);
router.post('/contato',  ContatoController.criar);
router.put('/contato/:id', AuthController.private, ContatoController.update);
router.delete('/contato/:id', AuthController.private, ContatoController.delete);


router.get('/legislacao', LegislacaoController.listar);
router.get('/legislacao/:id', LegislacaoController.show);
router.post('/legislacao', AuthController.private, LegislacaoController.criar);
router.put('/legislacao/:id', AuthController.private, LegislacaoController.update);
router.delete('/legislacao/:id', AuthController.private, LegislacaoController.delete);

router.get('/associados', AssociadoController.listar);
router.get('/associados/:id', AssociadoController.show);
router.post('/associados', AuthController.private, AssociadoController.criar);
router.put('/associados/:id', AuthController.private, AssociadoController.update);
router.delete('/associados/:id', AuthController.private, AssociadoController.delete);

router.get('/evento', EventoController.listar);
router.get('/evento/:id', EventoController.show);
router.post('/evento', AuthController.private, upload.fields([{ name: 'imagens', maxCount: 10 }]), EventoController.criar);
router.put('/evento/:id', AuthController.private, upload.array('files'), EventoController.update);
router.delete('/evento/:id', AuthController.private, upload.array('files'), EventoController.delete);

module.exports = router;
