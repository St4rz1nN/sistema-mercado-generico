const mysql = require('mysql2');
const db = require('../utils/DataBase');

class CompraDAO {

    constructor(){
        //Banco de Dados já Conectado e Importado!
    }

    getMaiorID(callback){
        let maiorid = 0;
        let query = 'SELECT MAX(id) as maiorid FROM compra';

        db.query(query,(error,results) => {
            if(error){
                callback (error,null);
            } else{
                if (results[0].maiorid !== null){
                    maiorid = results[0].maiorid;
                }
                console.log(results[0].maiorid + 'e' + maiorid);
                callback (null,maiorid);
            }
        });
    }

    adicionarCompra(compra,callback) {
        const { id, idcarrinho, idproduto, quantia, data, situacao } = compra;

        let query = 'INSERT INTO compra (id,idcarrinho, idproduto, quantia, data, situacao) VALUES (?, ?, ?, ?, ?, ?)';

        let values = [id,idcarrinho,idproduto,quantia,data,situacao];
        
        db.query(query, values, (error) => {
            if(error) {
                callback(error);
            } else {
                callback(null);
            }
        })
    }

    removerCompra(id) {

        let query = 'DELETE FROM compra WHERE id = ?';
        
        db.query(query, id, (error) => {
            if(error) {
                callback(error);
            } else {
                callback(null);
            }
        })
    }


    getCompras(idusuario,callback) {

        let query = 'SELECT * FROM compra WHERE idcarrinho = ?';
        
        db.query(query, idusuario, (error,results) => {
            if(error) {
                callback(error,null);
            } else {
                const comprasPorId = results.reduce((acc, compra) =>{
                    let id = compra.id;

                    if(!acc[id]){
                        acc[id] = [];
                    }
                    acc[id].push(compra);
                    return acc;
                },{});
                callback(null,comprasPorId);
            }
        })
    }

    getCompraPorId(id,callback){
        let query = 'SELECT * FROM compra WHERE id = ?';
        
        db.query(query, id, (error,results) => {
            if(error){
                callback(error,null);
            }else{
                callback(null,results);
            }
        });
    }

}

module.exports = CompraDAO;