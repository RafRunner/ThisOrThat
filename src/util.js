'use strict';

const Discord = require('discord.js');
const locale = require('./locale/locale');

module.exports = {
  criaMensagemEmbarcada(titulo, descricao) {
    return new Discord.MessageEmbed().setTitle(`**${titulo}**`).setColor(0x3477eb).setDescription(descricao);
  },

  criaMensagemEmbarcadaErro(titulo, descricao) {
    return new Discord.MessageEmbed().setTitle(titulo).setColor(0xff0000).setDescription(descricao);
  },

  criaMensagemEmbarcadaResultado(sucesso, descricao, servidor) {
    if (sucesso) {
      return this.criaMensagemEmbarcada(locale.sucesso(servidor.locale), descricao);
    }
    return this.criaMensagemEmbarcadaErro(locale.erro(servidor.locale), descricao);
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
