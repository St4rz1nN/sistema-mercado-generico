class ProdutoQuantia {
    constructor(produto,quantia) {
        this._produto = produto;
        this._quantia = quantia;
    }
    //get

    get produto(){
        return this._produto;
    }

    get quantia(){
        return this._quantia;
    }

    get valorTotal(){
        return this._produto.preco*this._quantia;
    }

    //set 


    set produto(produto) {
        this._produto = produto;
    }

    set quantia(quantia) {
        this._quantia = quantia;
    }

    
}

module.exports = ProdutoQuantia;