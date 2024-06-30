const db = require('../utils/DataBase');

class ProdutoDAO {

    constructor(){
        //Banco de Dados já Conectado e Importado!
    }

    getMaiorID(callback){
        let maiorid = 0;
        let query = 'SELECT MAX(id) as maiorid FROM produto';

        db.query(query,(error,results) => {
            if(error){
                callback (error,null);
            } else{
                if (results[0].maiorid !== null){
                    maiorid = results[0].maiorid;
                }
                callback (null,maiorid);
            }
        });
    }

    cadastrarProduto(Produto, callback) {
        const {id, nome, descricao, preco, estoque} = Produto;

        const query = 'INSERT INTO produto (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)';

        const values = [nome, descricao, preco, estoque];
        
        db.query(query, values, (error) => {
            if(error) {
                callback(error);
                console.log("RETORNANDO ERRO AO CADASTRAR PRODUTO");
            } else {
                callback(null);
                console.log("RETORNANDO SUCESSO AO CADASTRAR PRODUTO");
            }
        })
    }

    editarProduto(Produto, callback) {
        const {id, nome, descricao, preco, estoque} = Produto;

        const query = 'UPDATE produto SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?;';

        const values = [nome, descricao, preco, estoque,id];
        
        db.query(query, values, (error) => {
            if(error) {
                callback(error);
            } else {
                callback(null);
            }
        })
    }


    removerProduto(id,callback) {

        //Linha de pesquisa do MYSQL
        const query = 'DELETE FROM produto WHERE id = ?';
        
        db.query(query, id, (error) => {
            if(error) {
                callback(error);
            } else {
                callback(null);
            }
        })
    }

    listarProdutos(callback) {

        //Linha de pesquisa do MYSQL
        const query = 'SELECT * FROM produto';
        
        db.query(query, (error, results) => {
            if(error) {
                return callback(error);
            } else {
                if (results.length  > 0){
                    callback(null,results);
                } else {
                    callback('Nenhum produto encontrado!', null);
                }
            }
        })
    }

    getProdutoByID(id, callback) {

        //Linha de pesquisa do MYSQL
        const query = 'SELECT * FROM produto WHERE id=?';
        
        db.query(query,id, (error, results) => {
            if(error) {
                return callback(error);
            } else {
                if (results.length  > 0){
                    callback(null,results);
                } else {
                    callback('Nenhum produto encontrado com esse ID!', null);
                }
            }
        })
    }
}
module.exports = ProdutoDAO;