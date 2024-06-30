const db = require('../utils/DataBase');
const ProdutoQuantia = require('../models/ProdutoQuantia');

class CarrinhoProdutoDAO {

    constructor(){
        //Banco de Dados já Conectado e Importado!
    }

    adicionarCarrinho(idcarrinho,idproduto,quantia,callback) {

        let query = 'INSERT INTO carrinhoproduto (idcarrinho, idproduto, quantia) VALUES (?, ?, ?)';

        let values = [idcarrinho,idproduto,quantia];
        
        db.query(query, values, (error) => {
            if(error) {
                console.log(error);
                callback(error);
            } else {
                callback(null);
                console.log('CarrinhoProdutoDAO: Sucesso ao Adicionar Produto!');
            }
        })
    }

    updateCarrinho(idcarrinho,idproduto,quantia,callback) {

        let query = 'UPDATE carrinhoproduto SET quantia = ? WHERE idcarrinho = ? and idproduto = ?';

        let values = [quantia,idcarrinho,idproduto];
        
        db.query(query, values, (error) => {
            if(error) {
                console.log('CarrinhoProdutoDAO: Erro ao Atualizar um Produto do Carrinho: ', error);
                callback(error);
            } else {
                console.log('CarrinhoProdutoDAO: Produto Atualizado com Sucesso!');
                callback(null);
            }
        })
    }

    removerCarrinho(idcarrinho,idproduto,callback) {

        const query = 'DELETE FROM carrinhoproduto WHERE idcarrinho = ? and idproduto = ?';

        let values = [idcarrinho,idproduto];
        
        db.query(query, values, (error) => {
            if(error) {
                callback(error);
                console.log('CarrinhoProdutoDAO: Erro ao remover produto!')
            } else {
                callback(null);
                console.log('CarrinhoProdutoDAO: Sucesso ao remover produto!')
            }
        })
    }

    getProdutos(idcarrinho, callback) {

        let query = 'SELECT idproduto, quantia FROM carrinhoproduto WHERE idcarrinho = ?';
        let produtoQuantia;

        db.query(query, idcarrinho, (error,results) => {
            if(error) {
                callback("Erro ao ver Carrinho: " + error,null);
                console.log('Carrinho ProdutoDAO: Erro ao Achar Produtos do Carrinho: ', error);
            } else {
                const produtosid = results.map(item => item.idproduto);
                const quantias = results.reduce((acc, item) => {
                    acc[item.idproduto] = item.quantia;
                    return acc;
                }, {});

                console.log(`Taste33: ${produtosid.join(',')}`);

                query = `SELECT * FROM produto WHERE id IN (${produtosid.map(() => '?').join(',')})`;

                db.query(query, produtosid, (error, produtos) => {
                    if (error) {
                        callback(null, null);
                        console.log('CarrinhoProdutoDAO: Erro ao obter produtos: ', error);
                    } else {
                        let produtosQuantia = [];
                        if (produtos.length === 0) {
                            callback(null, produtosQuantia);
                            console.log('CarrinhoProdutoDAO: Enviando Lista Vazia!');
                        } else {
                            produtos.forEach(produto => {
                                let produtoQuantia = new ProdutoQuantia(produto, quantias[produto.id]);
                                produtosQuantia.push(produtoQuantia);
                            });
                            callback(null, produtosQuantia);
                            console.log('CarrinhoProdutoDAO: Enviando Lista de Carrinho!' + JSON.stringify(produtosQuantia));
                        }
                    }
                });
            };
        });
    };

    finalizarCarrinho(idcarrinho,callback){
        let query = 'DELETE FROM carrinhoproduto WHERE idcarrinho = ?;';
        db.query(query, idcarrinho, (error) => {
            if(error){
                callback(error);
            }else{
                callback(null);
            }
        });
    }
};

module.exports = CarrinhoProdutoDAO;