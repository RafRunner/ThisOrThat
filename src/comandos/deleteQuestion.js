'use stricy';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const PerguntaController = require('../controllers/PerguntaController');
const util = require('../util');

const deleteQuestion = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'deleteQuestion', 'dq'),

  async (msg, textoMensagem) => {
    const pattrid = /\d+/g;
    const id = pattrid.exec(textoMensagem);

    if (!id) {
      msg.channel.send(util.criaMensagemEmbarcadaErro('Uso incorreto do comando! Para instruções use ' + prefixo + 'help'));
      return;
    }

    const resposta = await PerguntaController.delete(id[0]);
    msg.channel.send(util.criaMensagemEmbarcadaResultado(resposta.sucesso, resposta.mensagem));
  },

  'deleteQuestion (ou dq)',

  `Comando para deletar uma pergunta. Deve ser seguido do id da pergunta. Para ver os ids e as perguntas use ${prefixo}listQuestion.\nUso: ${prefixo}deleteQuestion 13`
);

module.exports = deleteQuestion;
