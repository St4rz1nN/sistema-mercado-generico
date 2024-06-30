const CarrinhoProdutoDAO = require('../daos/CarrinhoProdutoDAO');
const ProdutoQuantia = require('./ProdutoQuantia');
const carrinhoProdutoDAO = new CarrinhoProdutoDAO();

const ProdutoDAO = require('../daos/ProdutoDAO');
const produtoDAO = new ProdutoDAO();

class Carrinho {

    constructor(id) {

        this._id = id;
        this._produtoQuantia=[];
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    async carregarProdutos() {
        return new Promise((resolve,reject) => {
            carrinhoProdutoDAO.getProdutos(this._id, (error,results) => {
                if(error){
                    console.error("Carrinho: erro ao carregar produtos: " + error);
                } else{
                    if (results === null) {
                        console.error("Erro: results é null");
                        this._produtoQuantia = [];
                        resolve();
                        return;
                    } else{
                        console.log("Carrinho: Sucesso ao Obter a Lista de Produtos! " + results)
                        results.forEach(element => {
                            console.log(element.produto.nome);
                            console.log(element.quantia);
                        });
                        this._produtoQuantia = results;
                        resolve();
                        return;
                    }
                }
            });
        });
    }


    async init() {
        await this.carregarProdutos();
        console.log("Carrinho Inicializado!")
        return this;
    }

    adicionarProduto(Produto,callback){

        const index = this._produtoQuantia.findIndex(item => item._produto.id === Produto.id);

        console.log("Estoque recebido: " + Produto.estoque);

        Produto.estoque = Produto.estoque - 1;

        console.log(Produto.estoque);

        produtoDAO.editarProduto(Produto,(error) => {
            if (error){
                callback(error)
            }
        });

        if(index !== -1){
            this._produtoQuantia[index]._quantia += 1;
            carrinhoProdutoDAO.updateCarrinho(this._id, Produto.id, this._produtoQuantia[index]._quantia, (error) => {
                if(error){
                    callback(error);
                } else {
                    callback(null);
                }
            });
        } else{
            const produtoQuantia = new ProdutoQuantia(Produto,1);
            this._produtoQuantia.push(produtoQuantia);
            carrinhoProdutoDAO.adicionarCarrinho(this._id,Produto.id,1,(error) => {
                if(error){
                    callback(error);
                } else {
                    callback(null);
                }
            });
        }
    }

    removerProduto(Produto, quantia, callback){
        const index = this._produtoQuantia.findIndex(item => item._produto.id === Produto.id);
        const carrinhoProdutoDAO = new CarrinhoProdutoDAO();

        Produto.estoque = Produto.estoque + 1;

        produtoDAO.editarProduto(Produto,(error) => {
            if (error){
                callback(error)
            }
        });

        if(index !== -1){
            this._produtoQuantia[index]._quantia -= 1;
            if (this._produtoQuantia[index]._quantia < 1){
                console.log("MENOR QUE 1!")
                this._produtoQuantia.splice(index, 1);
                carrinhoProdutoDAO.removerCarrinho(this._id,Produto.id,(error) => {
                    if(error){
                        callback(error);
                    } else {
                        callback(null);
                    }
                });
            } else {
                console.log("MAIOR QUE 1!")
                carrinhoProdutoDAO.updateCarrinho(this._id,Produto.id,this._produtoQuantia[index]._quantia,(error) => {
                    if(error){
                        callback(error);
                    } else {
                        callback(null);
                    }
                });
            }
        }
    }
    
    getProdutos(callback){
        console.log("Retornando Lista de Produtos!");
        callback(this._produtoQuantia);
    }

    getValorTotal(callback){
        let valorTotal = 0;
        this._produtoQuantia.forEach(produtoQuantia=> {
            valorTotal += produtoQuantia.valorTotal;
        });
        console.log("Retornando Valor Total: " + valorTotal);
        callback(valorTotal);
        //callback(valorTotal);
    }

    finalizarCarrinho(callback){
        carrinhoProdutoDAO.finalizarCarrinho(this._id, (error) => {
            if(error){
                callback(error);
            }else{
                callback(null);
            }
        });
    }

}


module.exports = Carrinho;
