const mysql = require('mysql2');

class DataBase{
    constructor(){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'mb123157',
            database: 'sistemamercadogenerico'
        })
        
        this.connection.connect((error) =>{
            if (error){
                console.log('Erro ao se Conectar com o Banco de Dados: ' + error);
            } else{
                console.log('Conexão estabelecida com Sucesso!');
                this.inicializarDataBase()
            }
        }
        )
    }

    inicializarDataBase(){
        //Inicialização e Criação de Tabelas!

        // Tabela Usuario
        let query = 
        `CREATE TABLE IF NOT EXISTS Usuario ( 
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(50) UNIQUE,
            senha VARCHAR(50),
            nome VARCHAR(50)
        );`;


        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela Usuario: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela Usuario!');
            }
        })


        // Tabela Cargo
        query = 
        `CREATE TABLE IF NOT EXISTS Cargo ( 
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50) NOT NULL UNIQUE
        );`;


        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela Cargo: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela Cargo!');
            }
        })

        // Tabela Permissao
        query = 
        `CREATE TABLE IF NOT EXISTS Permissao ( 
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50) NOT NULL UNIQUE
        );`;


        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela Permissao: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela Premissao!');
            }
        })

        // Tabela UsuarioCargo
        query = 
        `CREATE TABLE IF NOT EXISTS UsuarioCargo ( 
            idusuario INT,
            idcargo INT,
            FOREIGN KEY (idusuario) REFERENCES usuario(id) ON DELETE CASCADE,
            FOREIGN KEY (idcargo) REFERENCES cargo(id) ON DELETE CASCADE,
            PRIMARY KEY(idusuario,idcargo)
        );`;


        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela UsuarioCargo: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela UsuarioCargo!');
            }
        })

        // Tabela CargoPermissao
        query = 
        `CREATE TABLE IF NOT EXISTS CargoPermissao ( 
            idcargo INT,
            idpermissao INT,
            FOREIGN KEY (idcargo) REFERENCES cargo(id) ON DELETE CASCADE,
            FOREIGN KEY (idpermissao) REFERENCES permissao(id) ON DELETE CASCADE,
            PRIMARY KEY(idcargo,idpermissao)
        );`;


        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela CargoPermissao: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela CargoPermissao!');
            }
        })

        // Tabela Produto
        query = 
        `CREATE TABLE IF NOT EXISTS Produto ( 
            id int AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50) UNIQUE,
            descricao VARCHAR(50),
            preco int,
            estoque int
        );`;

        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela Produto: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela Produto!');
            }
        })

        // Tabela Endereco
        query = 
        `CREATE TABLE IF NOT EXISTS Endereco ( 
            idusuario int PRIMARY KEY,
            cep VARCHAR(50),
            estado VARCHAR(50),
            cidade VARCHAR(50),
            bairro VARCHAR(50),
            rua VARCHAR(50),
            numero VARCHAR(50),
            complemento VARCHAR(255),
            FOREIGN KEY (idusuario) REFERENCES usuario(id) ON DELETE CASCADE
        );`;

        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela Endereco: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela Endereco!');
            }
        })

        // Tabela Carrinho
        query = 
        `CREATE TABLE IF NOT EXISTS Carrinho ( 
            id int PRIMARY KEY,
            FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
        );`;

        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela Carrinho: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela Carrinho!');
            }
        })

        // Tabela CarrinhoProduto
        query = 
        `CREATE TABLE IF NOT EXISTS CarrinhoProduto ( 
            idcarrinho int,
            idproduto int,
            quantia int,
            FOREIGN KEY (idcarrinho) REFERENCES carrinho(id) ON DELETE CASCADE,
            FOREIGN KEY (idproduto) REFERENCES produto(id) ON DELETE CASCADE
        );`;

        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela CarrinhoProduto: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela CarrinhoProduto!');
            }
        })

        // Tabela Compra
        query = 
        `CREATE TABLE IF NOT EXISTS compra ( 
            id INT,
            idcarrinho int,
            idproduto int,
            quantia int,
            data DATETIME,
            situacao int,
            FOREIGN KEY (idcarrinho) REFERENCES carrinho(id) ON DELETE CASCADE,
            FOREIGN KEY (idproduto) REFERENCES produto(id) ON DELETE CASCADE
        );`;

        this.connection.query(query, (error) => {
            if(error){
                console.log('Erro ao criar a tabela Compra: ', error);
            }else{
                console.log('Sucesso na Criação da Tabela Compra!');
            }
        })
    }

    //metodo de consulta do db
    query(sql, values, callback){
        this.connection.query(sql, values, callback);
    }

}

const db = new DataBase();
module.exports = db;
console.log('Classe DataBase exportada!');