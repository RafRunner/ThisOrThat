'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const util = require('../util');
const ServidorService = require('../services/ServidorService');

const help = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'timeout', 't'),

  async (msg, textoMensagem) => {
    const pattrTempo = /\d+/g;
    const novoTempo = pattrTempo.exec(textoMensagem)[0];

    if (!novoTempo) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(`Uso incorreto do comando! Uso: ${prefixo}t tempo_em_segundos`));
      return;
    }

    const resultado = await ServidorService.createAndUpdate(msg.guild.id, { tempo_para_responder: novoTempo });
    if (resultado.sucesso) {
      msg.channel.send(util.criaMensagemEmbarcada('Tempo atualizado', 'O tempo para responder foi atualizado para ' + novoTempo + ' segundos'));
    } else {
      msg.channel.send(util.criaMensagemEmbarcadaErro('Mensagem: ' + resultado.erro, 'Erro ao atualizar dados do servidor!'));
    }
  },

  'timeout (ou t)',

  `Altera por quanto tempo (em segundos) uma pergunta poderá ser respondida antes dos resultados serem mostrados.\nUso: ${prefixo}t tempo_em_segundos`
);

module.exports = help;
