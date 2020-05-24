'use strict';

const Comando = require('./Comando');
const PerguntaService = require('../services/PerguntaService');
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
    const resposta = await PerguntaService.getAllpaginado(0, msg.guild.id);

    if (!resposta.sucesso) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(resposta.mensagem));
      return;
    }

    if (resposta.paginas === 0) {
      msg.channel.send(util.criaMensagemEmbarcadaErro('Esse servidor ainda não tem nenhuma pergunta cadastrada!', 'Cadastre novas perguntas!'));
      return;
    }

    const mensagemPerguntas = await msg.channel.send(
      montaMensagemPerguntas(`Perguntas do servidor (página 1/${resposta.paginas}):`, resposta.perguntas)
    );

    let page = 0;
    let nAnteriorReacoesProxima = 1;
    let nAnteriorReacoesAnterior = 1;

    mensagemPerguntas
      .react('◀️')
      .then(() => mensagemPerguntas.react('▶️'))
      .then(() => {
        const timer = setInterval(async () => {
          const nAtualReacoesProxima = mensagemPerguntas.reactions.resolve('▶️').count;
          const nAtualReacoesAnterior = mensagemPerguntas.reactions.resolve('◀️').count;

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

          const novaResposta = await PerguntaService.getAllpaginado(page, msg.guild.id);

          if (novaResposta.sucesso) {
            mensagemPerguntas.edit(montaMensagemPerguntas(`Peguntas (página ${page + 1}/${resposta.paginas}):`, novaResposta.perguntas));
          }
        }, 100);

        setTimeout(() => clearInterval(timer), 120 * 1000);
      });
  },

  'listQuestions (ou lq)',

  `Comando para listar todas as perguntas desse servidor.`
);

module.exports = listQuestions;
