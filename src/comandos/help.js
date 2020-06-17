'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const util = require('../util');
const locale = require('../locale/locale');

const help = new Comando(
  (textoMensagem) => util.textoEhComando(textoMensagem, 'help', 'h'),

  async (msg, textoMensagem, servidor) => {
    const mensagemEmbarcada = util.criaMensagemEmbarcada(locale.comoUsarOBot(servidor.locale), '');
    mensagemEmbarcada.addField(locale.oQueEOThisOrThat(servidor.locale), locale.respostaOQueEOThisOrThat(servidor.locale));
    mensagemEmbarcada.addField(locale.comoFazerPergunta(servidor.locale), locale.respostaComoFazerPergunta(servidor.locale, { prefixo }));
    mensagemEmbarcada.addField(locale.possoCriarPerguntas(servidor.locale), locale.respostaCriarPergutnas(servidor.locale, { prefixo }));
    mensagemEmbarcada.addField(locale.oQueMaisFazer(servidor.locale), locale.respostaOQueMaisFazer(servidor.locale, { prefixo }));
    msg.channel.send(mensagemEmbarcada);
  },

  '',

  (loc) => ''
);

module.exports = help;
