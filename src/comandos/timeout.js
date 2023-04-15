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
            util.sendEmbed(msg, locale.usoIncorretoDoComando(servidor.locale), locale.usoTimeout(servidor.locale, { prefixo }), false);
            return;
        }

        const resultado = await ServidorService.update(servidor.id_servidor, { tempo_para_responder: novoTempo[0] });
        if (resultado.sucesso) {
            util.sendEmbed(msg, locale.tempoAtualizado(servidor.locale), locale.mensagemTempoAtualizado(servidor.locale, { novoTempo }));
        } else {
            util.sendEmbed(msg, locale.erroAoAtualizarDadosServidor(servidor.locale), resultado.erro(servidor.locale), false);
        }
    },

    'timeout (t)',

    (loc) => locale.descricaoTimeOut(loc, { prefixo })
);

module.exports = timeout;
