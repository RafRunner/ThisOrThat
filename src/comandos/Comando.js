'use strict';

class Comando {
  constructor(funcaoMatch, funcaoExecuta, nome, descricao) {
    this.funcaoMatch = funcaoMatch;
    this.funcaoExecuta = funcaoExecuta;
    this.descricao = descricao;
    this.nome = nome;
  }

  executarSeMatch(textoMensagem, msg) {
    if (this.funcaoMatch(textoMensagem)) {
      this.funcaoExecuta(msg, textoMensagem);
      return true;
    }
    return false;
  }
}

module.exports = Comando;
