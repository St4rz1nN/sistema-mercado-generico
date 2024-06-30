class Usuario {
    constructor(id,nome,email,senha) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha= senha;
    }

    #GET

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

    #SET

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
}

module.exports = Usuario;