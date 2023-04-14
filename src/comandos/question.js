'use strict';

const Comando = require('./Comando');
const PerguntaService = require('../services/PerguntaService');
const { prefixo } = require('../constantes');
const util = require('../util');
const locale = require('../locale/locale');

const question = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'question', 'q'),

  async (msg, textoMensagem, servidor) => {
    const id = /^\d+$/g.exec(textoMensagem);

    let resposta;
    if (id) {
      resposta = await PerguntaService.get(id[0], servidor.id_servidor);
    } else if (textoMensagem === '') {
      resposta = await PerguntaService.getRandonQuestion(servidor);
    } else {
      msg.channel.send(
        util.criaMensagemEmbarcadaErro(locale.usoIncorretoDoComando(servidor.locale), locale.usoQuestion(servidor.locale, { prefixo }))
      );
      return;
    }

    if (!resposta.sucesso) {
      msg.channel.send({ embeds: [util.criaMensagemEmbarcadaErro(locale.erro(servidor.locale), resposta.mensagem(servidor.locale))] });
      return;
    }

    const pergunta = resposta.pergunta;
    const mensagemPergunta = await msg.channel.send({ embeds: [ util.criaMensagemEmbarcada(locale.vocePrefere(servidor.locale), `🅰️ ${pergunta.opcao_um}\n🅱️ ${pergunta.opcao_dois}`) ] });

    const filter = (reaction) => reaction.emoji.name === '🅰️' || reaction.emoji.name === '🅱️';
    const collector = mensagemPergunta.createReactionCollector({ filter, time: servidor.tempo_para_responder * 1000, max: 1000, dispose: true });

    await mensagemPergunta.react('🅰️');
    await mensagemPergunta.react('🅱️');

    collector.on('collect', async (reaction, user) => {
      if (user.id === mensagemPergunta.author.id) {
        return;
      }

      const outraReacao = reaction.emoji.name === '🅰️' ? mensagemPergunta.reactions.resolve('🅱️') : mensagemPergunta.reactions.resolve('🅰️');
      const usuarioReagiu = await outraReacao.users.resolve(user.id);
      if (usuarioReagiu) {
        outraReacao.users.remove(user.id).catch((e) => console.log('Erro removendo reação: ', e));
      }
    });

    collector.on('end', (collected) => {
      const votosUm = collected.get('🅰️').count - 1;
      const votosDois = collected.get('🅱️').count - 1;

      const novoTotalUm = pergunta.votos_opcao_um + votosUm;
      const novoTotalDois = pergunta.votos_opcao_dois + votosDois;

      PerguntaService.updateVotos(pergunta, novoTotalUm, novoTotalDois);

      const porcentagemVotosUm = ((novoTotalUm / (novoTotalUm + novoTotalDois)) * 100).toFixed(2);
      const porcentagemVotosDois = (100 - porcentagemVotosUm).toFixed(2);

      msg.channel.send({ embeds: [ util.criaMensagemEmbarcada(locale.oResultadoFoi(servidor.locale),locale.resultadoPergunta(servidor.locale, { pergunta, votosUm, votosDois, novoTotalUm, porcentagemVotosUm, novoTotalDois, porcentagemVotosDois })) ] });
    });
  },

  'question (q)',

  (loc) => locale.descricaoQuestion(loc)
);

module.exports = question;
