const express = require('express');
const router = express.Router();
const CompraControllers = require('../routes-controllers/CompraControllers');
const compraControllers = new CompraControllers();

router.get('/getmaiorid', compraControllers.getmaiorid);
router.get('/getcompras', compraControllers.getcompras);
router.post('/selecionar/:id', compraControllers.selecionar);
router.get('/get', compraControllers.get);
router.get('/getByID/:id', compraControllers.getByID);
router.post('/finalizar', compraControllers.finalizar);

module.exports = router;

