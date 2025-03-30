'use stricy';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const PerguntaService = require('../services/PerguntaService');
const util = require('../util');
const locale = require('../locale/locale');

const deleteQuestion = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'deletequestion', 'dq'),

  async (msg, textoMensagem, servidor) => {
    const id = /^\d+$/g.exec(textoMensagem);

    if (!id) {
      util.sendEmbed(
        msg,
        locale.usoIncorretoDoComando(servidor.locale),
        locale.usoDeleteQuestion(servidor.locale, { prefixo }),
        false
      );
      return;
    }

    const resposta = await PerguntaService.delete(id[0], servidor.id_servidor);
    util.sendResultEmbed(msg, resposta.mensagem(servidor.locale), servidor, resposta.sucesso);
  },

  'deleteQuestion (dq)',

  (loc) => locale.descricaoDeleteQuestion(loc, { prefixo })
);

module.exports = deleteQuestion;
