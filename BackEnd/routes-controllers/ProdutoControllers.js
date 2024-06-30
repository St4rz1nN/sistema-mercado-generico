const ProdutoDAO = require('../daos/ProdutoDAO');
const produtoDAO = new ProdutoDAO();

const baseURL = 'http://localhost:3000';

class ProdutoController {


    constructor(){

    }

    //PRODUTOS

    selecionar = async (req, res) =>{
        const produtoID = req.params.id;

        req.session.produtoSelecionado = produtoID;
        req.session.save();
        res.sendStatus(200);
    };

    get = async (req, res) =>{
        const produtoID = req.session.produtoSelecionado;
        if(produtoID){
            res.status(200).json(produtoID);
        }else{
            res.status(500).json('Produto não encontrado!');
        }
    };

    getByID = async (req, res) =>{
        const id = req.params.id;

        produtoDAO.getProdutoByID(id,(error, results) => {
            if(error){
                res.status(500).send(`Erro ao buscar o Produto por ID: ${error}`);
                console.log("Erro ao buscar o Produto Por ID: " + error);
            }else{
                res.status(200).json(results);
                console.log("Retornando produto: " + results);
            }
        });
    };

    cadastrar = async (req, res) =>{
        const produto = req.body;
        produto.id = null;
        produtoDAO.cadastrarProduto(produto,(error) => {
            if(error){
                res.status(500).json(`Erro ao cadastrar Produto: ${error}`);
                console.log("Erro ao cadastrar produto!")
            }else{
                res.status(200).json(`Sucesso ao cadastrar Produto!`);
                console.log("sUCESSO AO CADASTRAR PRODUTO!")
            }
        });
    };

    editar = async (req, res) =>{
        const produto = req.body;

        produtoDAO.editarProduto(produto,(error) => {
            if(error){
                res.status(500).json(`Erro ao editar Produto: ${error}`);
            }else{
                res.status(200).json(`Sucesso ao editar Produto!`);
            }
        });
    };


    remover = async (req, res) =>{
        const produtoID = req.params.id;

        produtoDAO.removerProduto(produtoID,(error) => {
            if(error){
                res.status(500).json(`${error}`);
            }else{
                res.status(200).json(`Sucesso ao remover Produto!`);
            }
        });
    };

    listar = async (req, res) =>{

        produtoDAO.listarProdutos((error, results) => {
            if(error){
                res.status(500).send(`Erro ao Listar Produtos: ${error}`);
                console.log("Erro ao listar produtos: " + error);
            }else{
                res.status(200).json(results);
                console.log("Retornando produtos: " + results);
            }
        });
    };
}

module.exports = ProdutoController;