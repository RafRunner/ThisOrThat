'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const PerguntaService = require('../services/PerguntaService');
const util = require('../util');
const locale = require('../locale/locale');

const newQuestion = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'newquestion', 'nq'),

  async (msg, textoMensagem, servidor) => {
    const primeiraOpcao = /(?<=^1-|^1 -).+(?=2 ?-)/g.exec(textoMensagem);
    const segundaOpcao = /(?<=2-|2 -).+/g.exec(textoMensagem);

    if (!primeiraOpcao || !segundaOpcao) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(locale.usoIncorretoDoComando(servidor.locale), locale.usoNewQuestion(servidor.locale, { prefixo })));
      return;
    }

    const resposta = await PerguntaService.create(primeiraOpcao[0].trim(), segundaOpcao[0].trim(), servidor.id_servidor);
    msg.channel.send(util.criaMensagemEmbarcadaResultado(resposta.sucesso, resposta.mensagem(servidor.locale, { id: resposta.id }), servidor));
  },

  'newQuestion (nq)',

  (loc) => locale.descricaoNewQuestion(loc, { prefixo })
);

module.exports = newQuestion;
