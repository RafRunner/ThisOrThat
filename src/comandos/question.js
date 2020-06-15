'use strict';

const Comando = require('./Comando');
const PerguntaService = require('../services/PerguntaService');
const ServidorService = require('../services/ServidorService');
const { prefixo } = require('../constantes');
const util = require('../util');

const question = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'question', 'q'),

  async (msg, textoMensagem) => {
    const pattrid = /\d+/g;
    const id = pattrid.exec(textoMensagem);

    const servidor = await ServidorService.tentaCriarEObterOuPadrao(msg.guild.id);

    let resposta;
    if (id) {
      resposta = await PerguntaService.get(id[0], servidor.id_servidor);
    } else if (util.textoEhComando(textoMensagem, 'question', 'q')) {
      resposta = await PerguntaService.getRandonQuestion(servidor);
    } else {
      msg.channel.send(util.criaMensagemEmbarcadaErro(`Uso: ${prefixo}q ou ${prefixo}q id_da_pergunta`, 'Uso incorreto do comando!'));
      return;
    }

    if (!resposta.sucesso) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(resposta.mensagem));
      return;
    }

    const pergunta = resposta.pergunta;
    const mensagemPergunta = await msg.channel.send(
      util.criaMensagemEmbarcada('Você prefere...', `🅰️ ${pergunta.opcao_um}\n🅱️ ${pergunta.opcao_dois}`)
    );

    const filter = (reaction) => reaction.emoji.name === '🅰️' || reaction.emoji.name === '🅱️';
    const collector = mensagemPergunta.createReactionCollector(filter, { time: servidor.tempo_para_responder * 1000, max: 1000, dispose: true });

    await mensagemPergunta.react('🅰️');
    await mensagemPergunta.react('🅱️');

    collector.on('collect', async (reaction, user) => {
      if (user.id === mensagemPergunta.author.id) {
        return;
      }

      const outraReacao = reaction.emoji.name === '🅰️' ? mensagemPergunta.reactions.resolve('🅱️') : mensagemPergunta.reactions.resolve('🅰️');
      const usuarioReagiu = await outraReacao.users.resolve(user.id);
      if (usuarioReagiu) {
        outraReacao.users.remove(user.id).catch((e) => console.log('Error removing reaction: ', e));
      }
    });

    collector.on('end', (collected) => {
      const votosUm = collected.get('🅰️').count - 1;
      const votosDois = collected.get('🅱️').count - 1;

      const novoTotalUm = pergunta.votos_opcao_um + votosUm;
      const novoTotalDois = pergunta.votos_opcao_dois + votosDois;

      PerguntaService.updateVotos(pergunta, novoTotalUm, novoTotalDois);

      const porcentagemVotosUm = ((novoTotalUm / (novoTotalUm + novoTotalDois)) * 100).toFixed(0);
      const porcentagemVotosDois = 100 - porcentagemVotosUm;

      msg.channel.send(
        util.criaMensagemEmbarcada(
          'O Resultado foi:',
          `**${pergunta.opcao_um}:** ${votosUm} votos\n**${pergunta.opcao_dois}**: ${votosDois} votos\n\n` +
            `"${pergunta.opcao_um}" tem ${novoTotalUm} votos no total (${porcentagemVotosUm}%) e "${pergunta.opcao_dois}" tem ${novoTotalDois} (${porcentagemVotosDois}%)`
        )
      );
    });
  },

  'question (ou q)',

  `Será feita uma pergunta com duas opções (🅰️ e 🅱️). Reaja com uma dessas opções para votar. Opicinal: adicione o id da pergunta depois do comando para escolher uma pergunta`
);

module.exports = question;
