'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const util = require('../util');
const locale = require('../locale/locale');

const help = new Comando(
  (textoMensagem) => util.textoEhComando(textoMensagem, 'help', 'h'),

  async (msg, textoMensagem, servidor) => {
    const mensagemEmbarcada = util.criaMensagemEmbarcada(locale.comoUsarOBot(servidor.locale), '');

    mensagemEmbarcada.addFields(
      {
        name: locale.oQueEOThisOrThat(servidor.locale),
        value: locale.respostaOQueEOThisOrThat(servidor.locale),
      },
      {
        name: locale.comoFazerPergunta(servidor.locale),
        value: locale.respostaComoFazerPergunta(servidor.locale, { prefixo }),
      },
      {
        name: locale.possoCriarPerguntas(servidor.locale),
        value: locale.respostaCriarPergutnas(servidor.locale, { prefixo }),
      },
      {
        name: locale.oQueMaisFazer(servidor.locale),
        value: locale.respostaOQueMaisFazer(servidor.locale, { prefixo }),
      }
    );

    msg.channel.send({
      embeds: [mensagemEmbarcada],
    });
  },

  '',

  (loc) => ''
);

module.exports = help;
