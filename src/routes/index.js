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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[1];
        const novoNomeArquivo = crypto.randomBytes(16).toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

router.post('/login', AuthController.login);
router.post('/signup', AuthController.private, AuthController.signup);
router.post('/logout', AuthController.private, AuthController.logout);

router.get('/empresa', EmpresaController.listar);
router.post('/empresa', AuthController.private, upload.fields([{ name: 'logoFile' }, { name: 'territorioFile' }, { name: 'imagens', maxCount: 20 }]), EmpresaController.criar);
router.get('/empresa/:id', EmpresaController.show);
router.put('/empresa/:id', AuthController.private, upload.fields([{ name: 'logoFile' }, { name: 'territorioFile' }, { name: 'imagens', maxCount: 20 }]), EmpresaController.update);
router.delete('/empresa/:id', AuthController.private, EmpresaController.delete);

router.get('/noticias', NoticiaController.listar);
router.get('/noticias/:id', NoticiaController.show);
router.post('/noticias', AuthController.private, upload.array('files'), NoticiaController.criar);
router.put('/noticias/:id', AuthController.private, upload.array('files'), NoticiaController.update);
router.delete('/noticias/:id', AuthController.private, NoticiaController.delete);

router.get('/slider', SliderItemController.listar);
router.get('/slider/:id', SliderItemController.show);
router.post('/slider', AuthController.private, upload.fields([{name: 'sliderFile'}]), SliderItemController.criar);
router.put('/slider/:id', AuthController.private, upload.array('files'), SliderItemController.update);
router.delete('/slider/:id', AuthController.private, SliderItemController.delete);

router.get('/servicos', ServicoController.listar);
router.get('/servicos/:id', ServicoController.show);
router.post('/servicos', AuthController.private, upload.array('files'), ServicoController.criar);
router.put('/servicos/:id', AuthController.private, upload.array('files'), ServicoController.update);
router.delete('/servicos/:id', AuthController.private, ServicoController.delete);

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
