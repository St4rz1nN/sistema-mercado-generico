const UsuarioDAO = require('../daos/UsuarioDAO');
const usuarioDAO = new UsuarioDAO();


class UsuarioController{

    constructor(){

    }

    cadastrar = async (req, res) => {
        const usuario = req.body;

        usuarioDAO.fazerCadastro(usuario, (error, message) => {
            if (error) {
                res.status(500).json({error});
            } else {
                res.status(200).json({message: `Sucesso ao cadastrar usuário!`});
            }
        });
    };


    login = async (req, res) => {
        const { email, senha } = req.body;

        usuarioDAO.fazerLogin(email, senha, async (error, success, message, userInfo) => {
            if (error) {
                return res.status(500).json({error});
            }

            if (success) {
                req.session.user = { email: email, nome: userInfo.nome, id: userInfo.id };
                return res.status(200).json({ success, message });
            } else {
                return res.status(401).json({ success, message });
            }
        });
    };

    info = async (req, res) => {
        if(req.session.user) {
            res.json({success:true, user: req.session.user});
        } else {
            res.json({success:false, message: 'Usuário não está logado!'});
        }
    }

    remover = async (req, res) => {
        const { id } = req.body;

        usuarioDAO.removerCadastro(id, (error, message) => {
            if (error) {
                res.status(500).json({error});
            } else {
                res.status(200).json(message);
            }
        });
    };
};

module.exports = UsuarioController;