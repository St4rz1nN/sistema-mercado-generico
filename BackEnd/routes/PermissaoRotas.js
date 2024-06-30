const express = require('express');
const router = express.Router();
const PermissaoControllers = require('../routes-controllers/PermissaoControllers');
const permissaoControllers = new PermissaoControllers();

router.get('/checkUsuarioSession', permissaoControllers.checkUsuarioSession);
router.get('/checkUsuarioPermissao/:id', permissaoControllers.checkUsuarioPermissao);

module.exports = router;

