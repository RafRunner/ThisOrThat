'use strict';

const Comando = require('./Comando');
const PerguntaController = require('../controllers/PerguntaController');
const util = require('../util');

function montaTextoPerguntas(perguntas) {
  const reducer = (acumulador, pergunta) =>
    acumulador + '**Id: ' + pergunta.id + "** - Você prefere '" + pergunta.opcao_um + "' ou '" + pergunta.opcao_dois + "'?\n";
  return perguntas.reduce(reducer, '');
}

const listQuestions = new Comando(
  (textoMensagem) => util.textoEhComando(textoMensagem, 'listquestions', 'lq'),

  async (msg, textoMensagem) => {
    const resposta = await PerguntaController.index();
    if (resposta.sucesso) {
      const textoPerguntas = montaTextoPerguntas(resposta.perguntas);

      msg.channel.send(util.criaMensagemEmbarcada('Perguntas:', textoPerguntas));
      return;
    }
    msg.channel.send(util.criaMensagemEmbarcadaErro(resposta.mensagem));
  },

  'listQuestions (ou lq)',

  `Comando para listar todas as perguntas.`
);

module.exports = listQuestions;
