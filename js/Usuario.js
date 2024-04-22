class Usuario {
    constructor(id,nome,email,senha,endereco) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha= senha;
    }

    get nome() {
        return this._nome;
    }

    get id() {
        return this._id;
    }
    
    get email() {
        return this._email;
    }

    get senha() {
        return this._senha;
    }
    set nome(nome) {
        this._nome = nome;
    }

    set id(id) {
        this._id = id;
    }

    set email(email) {
        this._email = email;
    }

    set senha(senha) {
        this._senha = senha;
    }

    fazerLogin(email,senha){

    }

    fazerCadastro(email,senha){

    }

    verCarrinho(){
        
    }

}

let pessoa = new Pessoa('Mikaell');

console.log(pessoa.nome)
  