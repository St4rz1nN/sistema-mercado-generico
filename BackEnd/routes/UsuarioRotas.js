const express = require('express');
const router = express.Router();
const UsuarioControllers = require('../routes-controllers/UsuarioControllers');
const usuarioControllers = new UsuarioControllers();

router.post('/cadastrar', usuarioControllers.cadastrar);
router.post('/login', usuarioControllers.login);
router.delete('/remover', usuarioControllers.remover);
router.get('/info', usuarioControllers.info);

module.exports = router;

