'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const util = require('../util');
const ServidorService = require('../services/ServidorService');
const locale = require('../locale/locale');

const localesValidos = Array.from(locale.suportedLocales.keys());

const changeLanguage = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'changelanguage', 'cl'),

  async (msg, textoMensagem, servidor) => {
    let novoLocale = /^\w{2}-\w{2}$/g.exec(textoMensagem);

    if (!novoLocale) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(locale.usoIncorretoDoComando(servidor.locale), locale.usoLocale(servidor.locale, { prefixo, localesValidos })));
      return;
    }
    novoLocale = novoLocale[0];
    if (localesValidos.indexOf(novoLocale) === -1) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(locale.modoInvalido(servidor.locale), locale.localesExistentes(servidor.locale, { localesValidos })));
      return;
    }

    const camposAlterados = { locale: novoLocale };

    const resultado = await ServidorService.update(servidor.id_servidor, camposAlterados);
    if (resultado.sucesso) {
      msg.channel.send(util.criaMensagemEmbarcada(locale.localeAtualizado(novoLocale), locale.mensagemLocaleAtualizado(novoLocale, { novoLocale })));
    } else {
      msg.channel.send(util.criaMensagemEmbarcadaErro(locale.erroAoAtualizarDadosServidor(servidor.locale), locale.mensagemErro(servidor.locale, { resultado })));
    }
  },

  'changeLanguage (cl)',

  (loc) => locale.descricaoLocale(loc, { prefixo, localesValidos })
);

module.exports = changeLanguage;
