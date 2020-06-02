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

    if (resposta.paginas === 1) {
      return;
    }

    let page = 0;

    const filter = (reaction) => reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️';
    const collector = mensagemPerguntas.createReactionCollector(filter, { time: 180 * 1000, max: 1000, dispose: true });

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

      const novaResposta = await PerguntaService.getAllpaginado(page, msg.guild.id);

      if (novaResposta.sucesso) {
        mensagemPerguntas.edit(montaMensagemPerguntas(`Peguntas (página ${page + 1}/${resposta.paginas}):`, novaResposta.perguntas));
      }
    };

    collector.on('collect', (reaction, user) => mudarPagina(reaction, user));
    collector.on('remove', (reaction, user) => mudarPagina(reaction, user));
  },

  'listQuestions (ou lq)',

  `Comando para listar todas as perguntas desse servidor.`
);

module.exports = listQuestions;
