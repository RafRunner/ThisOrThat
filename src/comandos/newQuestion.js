'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const PerguntaController = require('../controllers/PerguntaController');
const util = require('../util');

const newQuestion = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'newQuestion', 'nq'),

  async (msg, textoMensagemNormalizado) => {
    const pattrPrimeira = /(?<=1-).+(?=2-)/g;
    const pattrSegunda = /(?<=2-).+/g;

    const primeiraOpcao = pattrPrimeira.exec(textoMensagemNormalizado);
    const segundaOpcao = pattrSegunda.exec(textoMensagemNormalizado);

    if (!primeiraOpcao || !segundaOpcao) {
      msg.channel.send(util.criaMensagemEmbarcadaErro('Uso incorreto do comando! Para instruções use ' + prefixo + 'help'));
      return;
    }

    const resposta = await PerguntaController.create(primeiraOpcao[0].trim(), segundaOpcao[0].trim());
    msg.channel.send(util.criaMensagemEmbarcadaResultado(resposta.sucesso, resposta.mensagem));
  },

  'newQuestion (ou nq)',

  `Comando para criar uma nova pergunta. As opções devem ser escritas em uma linha e no máximo 255 caracteres.\nUso: ${prefixo}newQuestion 1- Coca cola 2- Pepsi`
);

module.exports = newQuestion;
