'use strict';

const Comando = require('./Comando');
const PerguntaController = require('../controllers/PerguntaController');

function montaTextoPerguntas(perguntas) {
  const reducer = (acumulador, pergunta) => acumulador + 'Você prefere' + pergunta.opcao_um + ' ou ' + pergunta.opcao_dois + '\n';
  return perguntas.reduce(reducer, '');
}

const listQuestions = new Comando(
  textoMensagemNormalizado => textoMensagemNormalizado === 'listQuestions' || textoMensagemNormalizado === 'lq',

  async (msg, textoMensagemNormalizado) => {
    const perguntas = await PerguntaController.index();
    if (perguntas.sucesso) {
      const textoPerguntas = montaTextoPerguntas(perguntas.perguntas);

      msg.channel.send('Perguntas:\n' + textoPerguntas);
      return;
    }
    msg.channel.send(perguntas.mensagem);
  },

  'listQuestions(lq)',

  `Comando para listar todas as perguntas. Uso somente para desenvolvimento, não será para sempre.`
);

module.exports = listQuestions;
