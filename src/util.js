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

    sendEmbededMessage(msg, title, description, success = true) {
        const messageBuilder = success
            ? this.criaMensagemEmbarcada
            : this.criaMensagemEmbarcadaErro;
        msg.channel.send({ embeds: [messageBuilder(title, description)] });
    },

    sendResultEmbededMessage(msg, description, server, success) {
        const title = success ? locale.sucesso(server.locale) : locale.erro(server.locale);
        this.sendEmbededMessage(msg, title, description, success);
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
