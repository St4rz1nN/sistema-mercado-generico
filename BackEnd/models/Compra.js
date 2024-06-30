class Compra {
    constructor(id,idcarrinho,idproduto,quantia,data,situacao) {
        this._id = id;
        this._idcarrinho = idcarrinho;
        this._idproduto = idproduto;
        this._quantia = quantia;
        this._data = data;
        this._situacao = situacao;
    }
    
    
    //GET


    get id() {
        return this._id;
    }
    get idcarrinho() {
        return this._idcarrinho;
    }
    get idproduto() {
        return this._idproduto;
    }
    get quantia() {
        return this._quantia;
    }
    get data() {
        return this._data;
    }
    get situacao() {
        return this._situacao;
    }


    //SET


    set id(id) {
        this._id = id;
    }

    set idcarrinho(idcarrinho) {
        this._idcarrinho = idcarrinho;
    }

    set idproduto(idproduto) {
        this._idproduto = idproduto;
    }

    set quantia(quantia) {
        this._quantia = quantia;
    }

    set data(data) {
        this._data = data;
    }
    
    set situacao(situacao){
        this._situacao = situacao;
    }

}

module.exports = Compra;
