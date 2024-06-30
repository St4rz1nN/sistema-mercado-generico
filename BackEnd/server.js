// /project/server/server.js
//netstat -ano | findstr :3000
//taskkill /PID 3000 /F
const db = require('./utils/DataBase')
const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session); // Importa o MySQLStore
const axios = require('axios');

const usuarioRotas = require('./routes/UsuarioRotas');
const produtoRotas = require('./routes/ProdutoRotas');
const permissaoRotas = require('./routes/PermissaoRotas');
const carrinhoRotas = require('./routes/CarrinhoRotas');
const compraRotas = require('./routes/CompraRotas');
const enderecoRotas = require('./routes/EnderecoRotas');

const app = express();
const port = 3000;

const baseURL = 'http://localhost:3000';

app.use(bodyParser.json());

const corsOptions = {
    credentials: true,
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const sessionConfig = {
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30,
        sameSite: 'lax', 
        secure: false,
        httpOnly: true
    }
};

app.use(session(sessionConfig));

app.use('/usuario', usuarioRotas);
app.use('/produto', produtoRotas);
app.use('/permissao', permissaoRotas);
app.use('/carrinho', carrinhoRotas);
app.use('/compra', compraRotas);
app.use('/endereco', enderecoRotas);

app.listen(port, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${port}`);
});