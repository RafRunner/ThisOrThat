'use stricy';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const PerguntaService = require('../services/PerguntaService');
const util = require('../util');

const deleteQuestion = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'deletequestion', 'dq'),

  async (msg, textoMensagem) => {
    const pattrid = /\d+/g;
    const id = pattrid.exec(textoMensagem);

    if (!id) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(`Uso: ${prefixo}dq id_da_pergunta`, 'Uso incorreto do comando! '));
      return;
    }

    const resposta = await PerguntaService.delete(id[0]);
    msg.channel.send(util.criaMensagemEmbarcadaResultado(resposta.sucesso, resposta.mensagem));
  },

  'deleteQuestion (ou dq)',

  `Comando para deletar uma pergunta. Deve ser seguido do id da pergunta. Para ver os ids e as perguntas use ${prefixo}listQuestion.\nUso: ${prefixo}deleteQuestion id_da_pergunta`
);

module.exports = deleteQuestion;
