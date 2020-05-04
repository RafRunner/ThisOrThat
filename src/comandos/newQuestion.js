'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const PerguntaController = require('../controllers/PerguntaController');

const newQuestion = new Comando(
  textoMensagemNormalizado => textoMensagemNormalizado.startsWith('newQuestion') || textoMensagemNormalizado.startsWith('nq'),

  async (msg, textoMensagemNormalizado) => {
    const pattrPrimeira = /(?<=1-).+(?=2-)/g;
    const pattrSegunda = /(?<=2-).+/g;
    const texto = textoMensagemNormalizado.trim();

    const primeiraOpcao = pattrPrimeira.exec(texto);
    const segundaOpcao = pattrSegunda.exec(texto);

    if (!primeiraOpcao || !segundaOpcao) {
      msg.channel.send('Uso incorreto do comando! Para instruções use ' + prefixo + 'help');
      return;
    }

    const resultado = await PerguntaController.create(primeiraOpcao[0], segundaOpcao[0]);
    msg.channel.send(resultado.mensagem);
  },

  'newQuestion(nq)',

  `Comando para criar uma nova pergunta. Uso: ${prefixo}newQuestion 1- Coca cola 2- Pepsi`
);

module.exports = newQuestion;
