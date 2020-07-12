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
    return { match: t === comando || t === alias, textoSemComando: '' };
  },

  textoComecaComComando(texto, comando, alias) {
    const match = new RegExp(`^(${comando}|${alias})(.*)$`, 'gi').exec(texto);
    if (match) {
      return { match: true, textoSemComando: match[2].trim() };
    }
    return { match: false, textoSemComando: '' };
  },
};
