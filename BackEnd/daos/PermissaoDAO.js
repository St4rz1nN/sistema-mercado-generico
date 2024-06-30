const db = require('../utils/DataBase');

class PermissaoDAO {

    constructor(){
        //Banco de Dados já Conectado e Importado!
    }


    checkUsuarioPermissao(idusuario,idpermissao,callback){
        let query = 'SELECT idcargo FROM usuariocargo WHERE idusuario=?';
        

        db.query(query, idusuario, (error, results) => {
            if(error){
                callback(error);
                return;
            }
            if(results.length < 1){
                callback(null,false);
                return;
            }
            let idcargo = results[0].idcargo;
            console.log("ID CARGO: " + idcargo);

            query = 'SELECT idpermissao FROM cargopermissao WHERE idcargo=?';

            db.query(query, idcargo, (error, results) => {
                if(error){
                    callback(error,null);
                    return;
                }

                const contains = results.some(result => result.idpermissao === parseInt(idpermissao,10));

                console.log(results);

                console.log(contains);
                callback(null,contains);
            });

        });
    }
}

module.exports = PermissaoDAO;