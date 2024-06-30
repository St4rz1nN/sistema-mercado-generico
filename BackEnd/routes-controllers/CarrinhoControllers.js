const Carrinho = require('../models/Carrinho');

const CarrinhoProdutoDAO = require('../daos/CarrinhoProdutoDAO');
const carrinhoProdutoDAO = new CarrinhoProdutoDAO();
const axios = require('axios');

const baseURL = 'http://localhost:3000';

class CarrinhoControllers {

    constructor(){

    }

    get = async (req, res) => {
        const carrinhoID = req.session.user.id;

        const carrinho = new Carrinho(carrinhoID);
        await carrinho.init();

        carrinho.getProdutos((results) => {
            res.status(200).json(results);
        });
    };


    getValorTotal = async (req, res) => {
        const carrinhoID = req.session.user.id;
        const carrinho = new Carrinho(carrinhoID);
        await carrinho.init();

        console.log("Pegando Rota GetCarinhoValorTotal! ");

        carrinho.getValorTotal((results) => {
            console.log("Get Carrinho Valor Total: " + results + carrinhoID);
            res.status(200).json(results);
        });
    };

    remover = async (req, res) => {
        const productId = req.params.id;
        const carrinhoID = req.session.user.id;
        const response = await axios.get(`${baseURL}/produto/getByID/${productId}`);
        const produto = response.data[0];

        const carrinho = new Carrinho(carrinhoID);
        await carrinho.init();

        console.log("Pegando Rota RemoveCarrinho! ");

        carrinho.removerProduto(produto,1,(error) => {
            if(error){
                res.status(500).json(error);
            } else {
                res.status(200).json(null);
            }
        });
    };

    adicionar = async (req, res) =>{
        const productId = req.params.id;
        const carrinhoID = req.session.user.id;

        const response = await axios.get(`${baseURL}/produto/getByID/${productId}`);
        const produto = response.data[0];

        const carrinho = new Carrinho(carrinhoID);
        await carrinho.init();

        carrinho.adicionarProduto(produto, (error) => {
            if(error){
                res.status(500).send(`Erro ao Adicionar Produto ao Carrinho: ${error}`);
                console.log("Erro ao Adicionar Produto ao Carrinho: " + error);
            }else{
                res.status(200).send(`Produto Adicionado com Sucesso!`);
            }
        });
    };
}

module.exports = CarrinhoControllers;