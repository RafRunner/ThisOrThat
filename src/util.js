'use strict';

const { EmbedBuilder } = require('discord.js');
const locale = require('./locale/locale');

function criaMensagemEmbarcada(titulo, descricao, cor) {
  const embed = new EmbedBuilder().setColor(cor).setTitle(`**${titulo}**`);

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

  sendEmbed(msg, title, description, success = true) {
    const messageBuilder = success ? this.criaMensagemEmbarcada : this.criaMensagemEmbarcadaErro;
    return msg.channel.send({ embeds: [messageBuilder(title, description)] });
  },

  sendBuiltEmbed(msg, embed) {
    return msg.channel.send({ embeds: [embed] });
  },

  sendResultEmbed(msg, description, server, success) {
    const title = success ? locale.sucesso(server.locale) : locale.erro(server.locale);
    return this.sendEmbed(msg, title, description, success);
  },

  textoEhComando(texto, ...aliases) {
    const t = texto.toLowerCase();
    return { match: aliases.includes(t), textoSemComando: '' };
  },

  textoComecaComComando(texto, ...aliases) {
    texto += ' ';

    const regex = new RegExp(`^(${aliases.join('|')})\\s(.*)`, 'gi');
    const match = regex.exec(texto);
    // console.log(regex, JSON.stringify(texto), match);
    if (match) {
      return { match: true, textoSemComando: match[2].trim() };
    }
    return { match: false, textoSemComando: '' };
  },
};
