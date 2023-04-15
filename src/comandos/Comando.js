'use strict';

class Comando {
    constructor(funcaoMatch, funcaoExecuta, nome, descricao) {
        this.funcaoMatch = funcaoMatch;
        this.funcaoExecuta = funcaoExecuta;
        this.nome = nome;
        this.descricao = descricao;
    }
}

module.exports = Comando;
