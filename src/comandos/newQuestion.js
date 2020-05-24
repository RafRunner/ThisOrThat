'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const PerguntaService = require('../services/PerguntaService');
const util = require('../util');

const newQuestion = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'newquestion', 'nq'),

  async (msg, textoMensagem) => {
    const pattrPrimeira = /(?<=1-|1 -).+(?=2 ?-)/g;
    const pattrSegunda = /(?<=2-|2 -).+/g;

    const primeiraOpcao = pattrPrimeira.exec(textoMensagem);
    const segundaOpcao = pattrSegunda.exec(textoMensagem);

    if (!primeiraOpcao || !segundaOpcao) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(`Uso incorreto do comando! Uso: ${prefixo}nq 1- primeira opção 2- segunda opção`));
      return;
    }

    const resposta = await PerguntaService.create(primeiraOpcao[0].trim(), segundaOpcao[0].trim(), msg.guild.id);
    msg.channel.send(util.criaMensagemEmbarcadaResultado(resposta.sucesso, resposta.mensagem));
  },

  'newQuestion (ou nq)',

  `Comando para criar uma nova pergunta. As opções devem ser escritas em uma linha e no máximo 255 caracteres.\nUso: ${prefixo}newQuestion 1- primeira opção 2- segunda opção`
);

module.exports = newQuestion;
