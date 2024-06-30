class Endereco {
    constructor(idusuario,cep,estado,cidade,bairro,rua,numero,complemento) {
        this._idusuario = idusuario;
        this._cep = String;
        this._estado = String;
        this._cidade = cidade;
        this._bairro = bairro;
        this._rua = rua;
        this._numero = numero;
        this._complemento = complemento;
    }

    //GET

    get idusuario() {
        return this._idusuario;
    }

    get cep() {
        return this._cep;
    }

    get estado() {
        return this._estado;
    }

    get cidade() {
        return this._cidade;
    }

    get bairro() {
        return this._bairro;
    }

    get rua() {
        return this._rua;
    }

    get numero() {
        return this._numero;
    }

    get complemento() {
        return this._complemento;
    }


    // SET


    set idusuario(idusuario) {
        this._idusuario = idusuario;
    }

    set cep(cep) {
        this._cep = cep;
    }

    set estado(estado) {
        this._estado = estado;
    }

    set cidade(cidade) {
        this._cidade = cidade;
    }

    set bairro(bairro) {
        this._bairro = bairro;
    }

    set rua(rua) {
        this._rua = rua;
    }

    set numero(numero) {
        this._numero = numero;
    }

    set complemento(complemento) {
        this._complemento = complemento;
    }
}

module.exports = Endereco;
