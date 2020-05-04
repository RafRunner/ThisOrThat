'use strict';

const Comando = require('./Comando');

const teste = new Comando(
  (textoMensagemNormalizado) => textoMensagemNormalizado === 'teste',
  (msg) => msg.channel.send('Esse comando é um teste. Seu comportamento pode ser inesperado'),
  'teste',
  'Comando usado para testes. Cuidado ao usá-lo!'
);

module.exports = teste;
