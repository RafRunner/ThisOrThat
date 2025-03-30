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

    const mensagemEmbarcada = util.criaMensagemEmbarcada(
      locale.tituloConfiguracoesServidor(servidor.locale),
      ''
    );

    mensagemEmbarcada.addFields([
      {
        name: locale.tituloTimeOut(servidor.locale),
        value: servidor.tempo_para_responder + locale.segundos(servidor.locale),
      },
      { name: locale.tituloModo(servidor.locale), value: modo },
      { name: locale.tituloLocale(servidor.locale), value: servidor.locale },
    ]);

    util.sendBuiltEmbed(mensagemEmbarcada);
  },

  'serverStatus (ss)',

  (loc) => locale.descricaoServerStatus(loc)
);

module.exports = serverStatus;
