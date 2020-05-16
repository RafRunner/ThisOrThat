'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const util = require('../util');

const help = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'help', 'h'),

  async (msg, textoMensagem) => {
    const mensagemEmbarcada = util.criaMensagemEmbarcada('Como usar o bot:', '');
    mensagemEmbarcada.addField(
      'O que é o ThisOrThat?',
      'Ele é um bot que oderece situações onde as pessoas do servidor devem votar em um entre dois cenários propostos por perguntas feitas pelo bot!'
    );
    mensagemEmbarcada.addField(
      'Como faço para o bot fazer um pergunta?',
      `Basta usar o comando ${prefixo}q, o bot fara uma pergunta e você deve votar atravez das reações 🅰️ ou 🅱️, depois de um tempo o bot irá enviar uma mensagem com os resultados`
    );
    mensagemEmbarcada.addField(
      'Posso criar minhas própriar perguntas?',
      `Claro! Basta usar o comando ${prefixo}nq, porém essa pergunta só irá aparecer nesse servidor`
    );
    mensagemEmbarcada.addField('O que mais posso fazer?', `Para uma lista compelta de comandos e suas explicações, use o comando ${prefixo}c`);
    msg.channel.send(mensagemEmbarcada);
  },

  'commands (ou c)',

  'Lista todos os comandos existentes e seus usos.'
);

module.exports = help;
