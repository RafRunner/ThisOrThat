'use strict';

const Comando = require('./Comando');
const PerguntaService = require('../services/PerguntaService');
const util = require('../util');
const locale = require('../locale/locale');

function montaMensagemPerguntas(titulo, perguntas, servidor) {
  const reducer = (acumulador, pergunta) => acumulador + locale.acumuladorPergunta(servidor.locale, { pergunta });
  const conteudo = perguntas.reduce(reducer, '');
  return util.criaMensagemEmbarcada(titulo, conteudo);
}

const listQuestions = new Comando(
  (textoMensagem) => util.textoEhComando(textoMensagem, 'listquestions', 'lq'),

  async (msg, textoMensagem, servidor) => {
    const resposta = await PerguntaService.getAllpaginado(0, servidor.id_servidor);

    if (!resposta.sucesso) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(locale.erro(servidor.locale), resposta.mensagem(servidor.locale)));
      return;
    }

    if (resposta.paginas === 0) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(locale.servidorSemPerguntas(servidor.locale), locale.cadastreNovasPerguntas(servidor.locale)));
      return;
    }

    const mensagemPerguntas = await msg.channel.send(
      montaMensagemPerguntas(locale.listagemPaginas(servidor.locale, { page: 0, resposta }), resposta.perguntas, servidor)
    );

    if (resposta.paginas === 1) {
      return;
    }

    let page = 0;

    const filter = (reaction) => reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️';
    const collector = mensagemPerguntas.createReactionCollector(filter, { time: 300 * 1000, max: 1000, dispose: true });

    await mensagemPerguntas.react('◀️');
    await mensagemPerguntas.react('▶️');

    const mudarPagina = async (reaction, user) => {
      if (user.id === mensagemPerguntas.author.id) {
        return;
      }

      if (reaction.emoji.name === '▶️') {
        if (page + 1 === resposta.paginas) {
          return;
        }
        page++;
      } else {
        if (page === 0) {
          return;
        }
        page--;
      }

      const novaResposta = await PerguntaService.getAllpaginado(page, servidor.id_servidor);

      if (novaResposta.sucesso) {
        mensagemPerguntas.edit(montaMensagemPerguntas(locale.listagemPaginas(servidor.locale, { page, resposta }), novaResposta.perguntas, servidor));
      }
    };

    collector.on('collect', mudarPagina);
    collector.on('remove', mudarPagina);
  },

  'listQuestions (lq)',

  (loc) => locale.descricaoListQuestions(loc)
);

module.exports = listQuestions;
