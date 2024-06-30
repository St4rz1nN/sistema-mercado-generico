const Carrinho = require('../models/Carrinho');

const CompraDAO = require('../daos/CompraDAO');
const compraDAO = new CompraDAO();

const Compra = require('../models/Compra');

const axios = require('axios');

const baseURL = 'http://localhost:3000';

function formatDateToMySQL(date) {
    const pad = (n) => n < 10 ? '0' + n : n;
    return date.getUTCFullYear() + '-' +
           pad(date.getUTCMonth() + 1) + '-' +
           pad(date.getUTCDate()) + ' ' +
           pad(date.getUTCHours()) + ':' +
           pad(date.getUTCMinutes()) + ':' +
           pad(date.getUTCSeconds());
}


class CompraConstrollers {


    constructor(){

    }

    getmaiorid = async (req, res) =>{
        compraDAO.getMaiorID((error,results) =>{
            if(error){
                res.status(500).json(error);
            }else{
                res.status(200).json(results);
            }
        });
    };


    getcompras = async (req,res) => {
        const UsuarioID =  req.session.user.id;

        compraDAO.getCompras(UsuarioID, (error,results) =>{
            if(error){
                res.status(500).json(error);
            }else{
                res.status(200).json(results);
            }
        });
    };

    selecionar = async (req,res) => {
        const compraID = req.params.id;

        req.session.compraSelecionada = compraID;
        req.session.save();
        res.sendStatus(200);
    };

    get = async (req,res) => {
        const compraID = req.session.compraSelecionada;

        compraDAO.getCompraPorId(compraID, (error,results) =>{
            if (error){
                res.status(500).json(error);
            } else{
                res.status(200).json({resultado: results, compraid:compraID});
            }
        });
    };

    getByID = async (req,res) => {
        const compraID = req.params.id;

        compraDAO.getCompras(compraID, (error,results) =>{
            if(error){
                res.status(500).json(error);
            }else{
                res.status(200).json(results);
            }
        });
    };


    finalizar = async (req, res) =>{

        try {
            
            const carrinhoID = req.session.user.id;

            const carrinho = new Carrinho(carrinhoID);
            await carrinho.init();

            const response = await axios.get(`${baseURL}/compra/getmaiorid`);

            const maiorid = response.data+1;
            
            const responseEndereco = await axios.get(`${baseURL}/endereco/get/${carrinhoID}`);

            const enderecoRes = responseEndereco.data;

            await new Promise((resolve,reject) => {
                if (enderecoRes === false){
                    reject("Endereço não cadastrado!")
                }else{
                    resolve(enderecoRes);
                }
            });

            const produtoQuantia = await new Promise((resolve,reject) => {
                carrinho.getProdutos((results) => {
                    if(results.length < 1){
                        return reject('Nenhum produto encontrado');
                    } else{
                        resolve(results);
                    }
                });
            });


            const data = formatDateToMySQL(new Date());

            let compra;


            for (const produto of produtoQuantia) {
                compra = new Compra(maiorid,carrinhoID,produto.produto.id,produto.quantia,data,1);
                console.log(Compra);

                await new Promise((resolve, reject) => {
                    compraDAO.adicionarCompra(compra, (error) => {
                        if(error){
                            return reject(`Erro ao Finalizar Compra: ${error}`);
                        }
                        resolve();
                    });
                });
            };
            console.log("TESTE3")
            console.log(`CARRINHO: ${carrinho.id}`)
            await new Promise((resolve,reject) => {
                carrinho.finalizarCarrinho((error) => {
                    if (error){
                        return reject(`Erro ao Finalizar Carrinho: ${error}`);
                    }
                    resolve();
                });
            });

            res.status(200).json(`Sucesso ao Finalizar compra!`);
        } catch (error) {
            console.error("Erro durante o processamento:", error);
            res.status(500).json(`${error}`);
        }
    };
};


module.exports = CompraConstrollers;