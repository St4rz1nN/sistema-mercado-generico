const db = require('../utils/DataBase');

class EnderecoDAO {

    constructor(){
        //Banco de Dados já Conectado e Importado!
    }

    cadastrarEndereco(Endereco,callback) {
        const {idusuario, cep, estado, cidade, bairro, rua, numero, complemento} = Endereco;
        const query = 'INSERT INTO endereco (idusuario, cep, estado, cidade, bairro, rua, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        const values = [idusuario, cep, estado, cidade, bairro, rua, numero, complemento];
        
        db.query(query, values, (error) => {
            if(error) {
                callback(error);
            } else {
                callback(null);
            }
        })
    }

    editarEndereco(Endereco,callback) {

        const {idusuario, cep, estado, cidade, bairro, rua, numero, complemento} = Endereco;
        //Linha de pesquisa do MYSQL
        const query = 'UPDATE endereco SET cep = ?, estado = ?, cidade = ?, bairro = ?, rua = ?, numero = ?, complemento = ? WHERE idusuario = ?';
        
        const values = [cep, estado, cidade, bairro, rua, numero, complemento,idusuario];

        db.query(query, values, (error) => {
            if(error) {
                callback(error);
            } else {
                callback(null);
            }
        })
    }

    removerEndereco(idusuario,callback) {

        //Linha de pesquisa do MYSQL
        const query = 'DELETE FROM endereco WHERE idusuario = ?';
        
        db.query(query, idusuario, (error) => {
            if(error) {
                callback(error);
            } else {
                callback(null);
            }
        })
    }

    getEndereco(idusuario,callback){
        const query = 'SELECT * FROM endereco WHERE idusuario = ?';

        db.query(query, idusuario, (error,results) => {
            if(error) {
                callback(error,null);
            } else {
                if(results.length > 0){
                    callback(null,results);
                }else{
                    callback(null,false);
                }
            }
        })
    }
}
module.exports = EnderecoDAO;