const express = require('express');
const router = express.Router();
const CarrinhoControllers = require('../routes-controllers/CarrinhoControllers');
const carrinhoControllers = new CarrinhoControllers();

router.get('/get', carrinhoControllers.get);
router.get('/getValorTotal', carrinhoControllers.getValorTotal);
router.post('/remover/:id', carrinhoControllers.remover);
router.post('/adicionar/:id', carrinhoControllers.adicionar);

module.exports = router;

