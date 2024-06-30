const PermissaoDAO = require('../daos/PermissaoDAO');
const permissaoDAO = new PermissaoDAO();


class PermissaoControllers{

    constructor(){

    }

    checkUsuarioSession = async (req,res) => {
        if (req.session && req.session.user && req.session.user.id) {
            res.status(200).json({ session: true });
        }else{
            res.status(500).json({ session: false });
        }
    };

    checkUsuarioPermissao = async (req,res) => {
        const permissionID = req.params.id;
        const usuarioID =  req.session.user.id;

        permissaoDAO.checkUsuarioPermissao(usuarioID,permissionID,(error,results) =>{
            if(error){
                res.status(500).json({ error });
            }else {
                res.status(200).json({ results });
            }
        });
    };
}


module.exports = PermissaoControllers;