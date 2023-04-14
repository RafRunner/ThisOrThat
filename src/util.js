'use strict';

const { EmbedBuilder } = require('discord.js');
const locale = require('./locale/locale');

function criaMensagemEmbarcada(titulo, descricao, cor) {
  const embed = new EmbedBuilder().setColor(0x3477eb).setTitle(`**${titulo}**`);

  if (descricao.toString().length > 0) {
    embed.setDescription(descricao);
  }

  return embed;
}

module.exports = {
  criaMensagemEmbarcada(titulo, descricao) {
    return criaMensagemEmbarcada(titulo, descricao, 0x3477eb);
  },

  criaMensagemEmbarcadaErro(titulo, descricao) {
    return criaMensagemEmbarcada(titulo, descricao, 0xff0000);
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
