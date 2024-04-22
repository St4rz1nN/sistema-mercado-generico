class Compra {
    constructor(id,carrinho, data) {
        this._id = id;
        this._data = data;
        this._carrinho = carrinho;
    }
    
    get id() {
        return this._id;
    }

    get Data() {
        return this._data;
    }

    get Carrinho() {
        return this._carrinho;
    }

    set id(id) {
        this._id = id;
    }

    set Data(data) {
        this._data = data;
    }

    set Carrinho(carrinho) {
        this._carrinho = carrinho;
    }

}
