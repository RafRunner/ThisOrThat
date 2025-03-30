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
      util.sendEmbed(
        msg,
        locale.usoIncorretoDoComando(servidor.locale),
        locale.usoLocale(servidor.locale, { prefixo, localesValidos }),
        false
      );
      return;
    }
    novoLocale = novoLocale[0];
    if (localesValidos.indexOf(novoLocale) === -1) {
      util.sendEmbed(
        msg,
        locale.modoInvalido(servidor.locale),
        locale.localesExistentes(servidor.locale, { localesValidos }),
        false
      );
      return;
    }

    const camposAlterados = { locale: novoLocale };

    const resultado = await ServidorService.update(servidor.id_servidor, camposAlterados);
    if (resultado.sucesso) {
      util.sendEmbed(
        msg,
        locale.localeAtualizado(novoLocale),
        locale.mensagemLocaleAtualizado(novoLocale, { novoLocale })
      );
    } else {
      util.sendEmbed(
        msg,
        locale.erroAoAtualizarDadosServidor(servidor.locale),
        resultado.erro(servidor.locale),
        false
      );
    }
  },

  'changeLanguage (cl)',

  (loc) => locale.descricaoLocale(loc, { prefixo, localesValidos })
);

module.exports = changeLanguage;
