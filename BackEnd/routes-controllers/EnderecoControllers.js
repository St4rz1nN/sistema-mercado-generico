
const EnderecoDAO = require('../daos/EnderecoDAO');
const enderecoDAO= new EnderecoDAO();

class EnderecoControllers{

    constructor(){

    }

    get = async (req,res) => {
        let usuarioID = req.params.id;
        if (usuarioID < 0){
            usuarioID = req.session.user.id
        }

        enderecoDAO.getEndereco(usuarioID, (error,results) =>{
            if(error){
                res.status(500).json(`${error}`);
            }else{
                res.status(200).json(results);
            }
        });
    };

    cadastrar = async (req,res) => {
        let endereco = req.body;

        endereco.idusuario = req.session.user.id;

        enderecoDAO.cadastrarEndereco(endereco, (error) =>{
            if(error){
                res.status(500).json(`${error}`);
                console.log("Erro Cadastro Endereco!: " + error)
            }else{
                res.status(200).json(`Sucesso ao Cadastrar Endereço!`);
                console.log("Sucesso Cadastro Endereco!")
            }
        });
    };


    editar = async (req,res) => {
        let endereco = req.body;

        endereco.idusuario = req.session.user.id;

        enderecoDAO.editarEndereco(endereco, (error) =>{
            if(error){
                res.status(500).json(`${error}`);
            }else{
                res.status(200).json(`Sucesso ao Editar Endereço!`);
                
            }
        });
    };
};

module.exports = EnderecoControllers;