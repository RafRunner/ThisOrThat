'use strict';

const Discord = require('discord.js');

module.exports = {
  criaMensagemEmbarcada(titulo, descricao) {
    return new Discord.MessageEmbed().setTitle(`**${titulo}**`).setColor(0x3477eb).setDescription(descricao);
  },

  criaMensagemEmbarcadaErro(descricao) {
    return new Discord.MessageEmbed().setTitle('**Erro**').setColor(0xff0000).setDescription(descricao);
  },

  criaMensagemEmbarcadaResultado(sucesso, descricao) {
    if (sucesso) {
      return this.criaMensagemEmbarcada('**Sucesso**', descricao);
    }
    return this.criaMensagemEmbarcadaErro(descricao);
  },

  textoEhComando(texto, comando, alias) {
    const t = texto.toLowerCase();
    return t === comando || t === alias;
  },

  textoComecaComComando(texto, comando, alias) {
    const t = texto.toLowerCase();
    return t.startsWith(comando) || t.startsWith(alias);
  },
};
