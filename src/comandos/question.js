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
    const timeout = servidor.tempo_para_responder;

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

    await mensagemPergunta.react('🅰️');
    await mensagemPergunta.react('🅱️');

    setTimeout(() => {
      const votosUm = mensagemPergunta.reactions.resolve('🅰️').count - 1;
      const votosDois = mensagemPergunta.reactions.resolve('🅱️').count - 1;

      const novoTotalUm = pergunta.votos_opcao_um + votosUm;
      const novoTotalDois = pergunta.votos_opcao_dois + votosDois;

      PerguntaService.updateVotos(pergunta, novoTotalUm, novoTotalDois);

      const porcentagemVotosUm = ((novoTotalUm / (novoTotalUm + novoTotalDois)) * 100).toFixed(0);
      const porcentagemVotosDois = 100 - porcentagemVotosUm;

      msg.channel.send(
        util.criaMensagemEmbarcada(
          'O Resultado foi:',
          `**${pergunta.opcao_um}:** ${votosUm} votos\n**${pergunta.opcao_dois}**: ${votosDois} votos\n\n` +
            `'${pergunta.opcao_um}' tem ${porcentagemVotosUm}% dos votos (no total) e '${pergunta.opcao_dois}' tem ${porcentagemVotosDois}%`
        )
      );
    }, timeout * 1000);
  },

  'question (ou q)',

  `Será feita uma pergunta com duas opções (🅰️ e 🅱️). Reaja com uma dessas opções para votar. Opicinal: adicione o id da pergunta depois do comando para escolher uma pergunta`
);

module.exports = question;
