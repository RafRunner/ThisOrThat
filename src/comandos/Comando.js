'use strict';

class Comando {
  constructor(funcaoMatch, funcaoExecuta, nome, descricao) {
    this.funcaoMatch = funcaoMatch;
    this.funcaoExecuta = funcaoExecuta;
    this.descricao = descricao;
    this.nome = nome;
  }

  executarSeMatch(textoMensagemNormalizado, msg) {
    if (this.funcaoMatch(textoMensagemNormalizado)) {
      this.funcaoExecuta(msg, textoMensagemNormalizado);
      return true;
    }
    return false;
  }
}

module.exports = Comando;
