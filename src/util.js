'use strict';

const Discord = require('discord.js');

function criaMensagemEmbarcada(titulo, descricao) {
  return new Discord.MessageEmbed().setTitle(`**${titulo}**`).setColor(0x3477eb).setDescription(descricao);
}

function criaMensagemEmbarcadaErro(descricao) {
  return new Discord.MessageEmbed().setTitle('**Erro**').setColor(0xff0000).setDescription(descricao);
}

function criaMensagemEmbarcadaResultado(sucesso, descricao) {
  if (sucesso) {
    return this.criaMensagemEmbarcada('**Sucesso**', descricao);
  }
  return this.criaMensagemEmbarcadaErro(descricao);
}

const util = {
  criaMensagemEmbarcada,
  criaMensagemEmbarcadaErro,
  criaMensagemEmbarcadaResultado,

  textoEhComando(texto, comando, alias) {
    const t = texto.toLowerCase();
    return t === comando || t === alias;
  },

  textoComecaComComando(texto, comando, alias) {
    const t = texto.toLowerCase();
    return t.startsWith(comando) || t.startsWith(alias);
  },
};

module.exports = util;
