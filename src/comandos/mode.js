'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const util = require('../util');
const ServidorService = require('../services/ServidorService');
const locale = require('../locale/locale');
const { usoIncorretoDoComando } = require('../locale/locale');

const modos = ['normal', 'server', 'global'];

const mode = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'mode', 'm'),

  async (msg, textoMensagem, servidor) => {
    let novoModo = /^\w+$/g.exec(textoMensagem);

    if (!novoModo) {
      msg.channel.send({ embeds: [ util.criaMensagemEmbarcadaErro(locale, usoIncorretoDoComando(servidor.locale), locale.usoMode(servidor.locale, { prefixo })) ] });
      return;
    }
    novoModo = novoModo[0].toLowerCase();
    if (modos.indexOf(novoModo) === -1) {
      msg.channel.send({ embeds: [ util.criaMensagemEmbarcadaErro(locale.modoInvalido(servidor.locale), locale.modosExistentes(servidor.locale, { modos })) ] });
      return;
    }

    const camposAlterados = { somente_perguntas_servidor: false, somente_perguntas_globais: false };
    if (novoModo === 'server') {
      camposAlterados.somente_perguntas_servidor = true;
    } else if (novoModo === 'global') {
      camposAlterados.somente_perguntas_globais = true;
    }

    const resultado = await ServidorService.update(servidor.id_servidor, camposAlterados);
    if (resultado.sucesso) {
      msg.channel.send({ embeds: [ util.criaMensagemEmbarcada(locale.modoAtualizado(servidor.locale), locale.mensagemModoAtualizado(servidor.locale, { novoModo })) ] });
    } else {
      msg.channel.send({ embeds: [ util.criaMensagemEmbarcadaErro(locale.erroAoAtualizarDadosServidor(servidor.locale), resultado.erro(servidor.locale)) ] });
    }
  },

  'mode (m)',

  (loc) => locale.descricaoMode(loc, { prefixo })
);

module.exports = mode;
