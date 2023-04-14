'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const util = require('../util');
const ServidorService = require('../services/ServidorService');
const locale = require('../locale/locale');

const timeout = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'timeout', 't'),

  async (msg, textoMensagem, servidor) => {
    const novoTempo = /^\d+$/g.exec(textoMensagem);

    if (!novoTempo) {
      msg.channel.send({ embeds: [ util.criaMensagemEmbarcadaErro(locale.usoIncorretoDoComando(servidor.locale), locale.usoTimeout(servidor.locale, { prefixo })) ] });
      return;
    }

    const resultado = await ServidorService.update(servidor.id_servidor, { tempo_para_responder: novoTempo[0] });
    if (resultado.sucesso) {
      msg.channel.send({ embeds: [ util.criaMensagemEmbarcada(locale.tempoAtualizado(servidor.locale), locale.mensagemTempoAtualizado(servidor.locale, { novoTempo })) ] });
    } else {
      msg.channel.send({ embeds: [ util.criaMensagemEmbarcadaErro(locale.erroAoAtualizarDadosServidor(servidor.locale), resultado.erro(servidor.locale)) ] });
    }
  },

  'timeout (t)',

  (loc) => locale.descricaoTimeOut(loc, { prefixo })
);

module.exports = timeout;
