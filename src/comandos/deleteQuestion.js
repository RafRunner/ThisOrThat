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
      msg.channel.send(
        util.criaMensagemEmbarcadaErro(locale.usoIncorretoDoComando(servidor.locale), locale.usoDeleteQuestion(servidor.locale, { prefixo }))
      );
      return;
    }

    const resposta = await PerguntaService.delete(id[0], servidor.id_servidor);
    msg.channel.send(util.criaMensagemEmbarcadaResultado(resposta.sucesso, resposta.mensagem(servidor.locale), servidor));
  },

  'deleteQuestion (dq)',

  (loc) => locale.descricaoDeleteQuestion(loc, { prefixo })
);

module.exports = deleteQuestion;
