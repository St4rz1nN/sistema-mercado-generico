const express = require('express');
const router = express.Router();
const EnderecoControllers = require('../routes-controllers/EnderecoControllers');
const enderecoControllers = new EnderecoControllers();

router.get('/get/:id', enderecoControllers.get);
router.post('/cadastrar', enderecoControllers.cadastrar);
router.post('/editar', enderecoControllers.editar);

module.exports = router;

