'use strict';

const Comando = require('./Comando');
const PerguntaController = require('../controllers/PerguntaController');
const util = require('../util');

function montaMensagemPerguntas(titulo, perguntas) {
  const reducer = (acumulador, pergunta) =>
    acumulador + '**Id: ' + pergunta.id + "** - Você prefere '" + pergunta.opcao_um + "' ou '" + pergunta.opcao_dois + "'?\n";
  const conteudo = perguntas.reduce(reducer, '');
  return util.criaMensagemEmbarcada(titulo, conteudo);
}

const listQuestions = new Comando(
  (textoMensagem) => util.textoEhComando(textoMensagem, 'listquestions', 'lq'),

  async (msg, textoMensagem) => {
    const resposta = await PerguntaController.index();

    if (!resposta.sucesso) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(resposta.mensagem));
      return;
    }

    const mensagemPerguntas = await msg.channel.send(montaMensagemPerguntas(`Perguntas (página 1/${resposta.paginas}):`, resposta.perguntas));

    let page = 0;
    let nAnteriorReacoesProxima = 0;
    let nAnteriorReacoesAnterior = 0;

    mensagemPerguntas
      .react('◀️')
      .then(() => mensagemPerguntas.react('▶️'))
      .then(() => {
        const timer = setInterval(async () => {
          const nAtualReacoesProxima = mensagemPerguntas.reactions.resolve('▶️').count - 1;
          const nAtualReacoesAnterior = mensagemPerguntas.reactions.resolve('◀️').count - 1;

          if (nAtualReacoesProxima === nAnteriorReacoesProxima && nAtualReacoesAnterior === nAnteriorReacoesAnterior) {
            return;
          }
          if (nAtualReacoesProxima !== nAnteriorReacoesProxima) {
            nAnteriorReacoesProxima = nAtualReacoesProxima;
            if (page + 1 === resposta.paginas) {
              return;
            }
            page++;
          }
          if (nAtualReacoesAnterior !== nAnteriorReacoesAnterior) {
            nAnteriorReacoesAnterior = nAtualReacoesAnterior;
            if (page === 0) {
              return;
            }
            page--;
          }

          const novaResposta = await PerguntaController.index(page);

          if (resposta.sucesso) {
            mensagemPerguntas.edit(montaMensagemPerguntas(`Peguntas (página ${page + 1}/${novaResposta.paginas}):`, novaResposta.perguntas));
          }
        }, 100);

        setTimeout(() => clearInterval(timer), 90 * 1000);
      });
  },

  'listQuestions (ou lq)',

  `Comando para listar todas as perguntas.`
);

module.exports = listQuestions;
