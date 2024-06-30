const express = require('express');
const router = express.Router();
const ProdutoControllers = require('../routes-controllers/ProdutoControllers');
const produtoControllers = new ProdutoControllers();

router.post('/selecionar/:id', produtoControllers.selecionar);
router.get('/get', produtoControllers.get);
router.get('/getByID/:id', produtoControllers.getByID);
router.post('/cadastrar', produtoControllers.cadastrar);
router.post('/editar', produtoControllers.editar);
router.delete('/remover/:id', produtoControllers.remover);
router.get('/listar', produtoControllers.listar);

module.exports = router;

