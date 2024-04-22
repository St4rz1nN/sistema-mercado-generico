class Produto {
    constructor(id,nome,descricao,preco,estoque) {
        this._id = id;
        this._nome = nome;
        this._descricao = descricao;
        this._preco = preco;
        this._estoque = estoque;
    }

    get nome() {
        return this._nome;
    }
    
    get id() {
        return this._id;
    }
    
    get descricao() {
        return this._descricao;
    }

    get preco() {
        return this._preco;
    }

    get estoque() {
        return this._estoque;
    }

    set id(id) {
        this._id = id;
    }

    set nome(nome) {
        this._nome = nome;
    }

    set descricao(descricao) {
        this._descricao = descricao;
    }

    set preco(preco) {
        this._preco = preco;
    }

    set estoque(estoque) {
        this._estoque = estoque;
    }

}
