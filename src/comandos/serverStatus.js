'use strict';

const Comando = require('./Comando');
const util = require('../util');
const locale = require('../locale/locale');

const serverStatus = new Comando(
  (textoMensagem) => util.textoEhComando(textoMensagem, 'serverstatus', 'ss'),

  async (msg, textoMensagem, servidor) => {
    let modo;
    if (servidor.somente_perguntas_servidor) {
      modo = locale.explicacaoSomenteServidor(servidor.locale);
    } else if (servidor.somente_perguntas_globais) {
      modo = locale.explicacaoSomenteGlobal(servidor.locale);
    } else {
      modo = locale.explicacaoNormal(servidor.locale);
    }

    const mensagemEmbarcada = util.criaMensagemEmbarcada(locale.tituloConfiguracoesServidor(servidor.locale), '');
    mensagemEmbarcada.addField(locale.tituloTimeOut(servidor.locale), servidor.tempo_para_responder + locale.segundos(servidor.locale));
    mensagemEmbarcada.addField(locale.tituloModo(servidor.locale), modo);
    mensagemEmbarcada.addField(locale.tituloLocale(servidor.locale), servidor.locale);
    msg.channel.send(mensagemEmbarcada);
  },

  'serverStatus (ss)',

  (loc) => locale.descricaoServerStatus(loc)
);

module.exports = serverStatus;
