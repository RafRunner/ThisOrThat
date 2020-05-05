'use strict';

const comandos = require('./comandos/todosOsComandos');
const { prefixo } = require('./constantes');
const util = require('./util');

function respostaHandler(msg) {
  if (!msg.content || msg.content[0] !== prefixo) {
    return;
  }

  const textoMensagem = msg.content.substring(1).trim();

  if (textoMensagem === 'help') {
    const embed = util.criaMensagemEmbarcada('Como Usar o Bot:', montaMensagemHelp(comandos));
    msg.channel.send(embed);
    return;
  }

  comandos.forEach((comando) => {
    if (comando.executarSeMatch(textoMensagem, msg)) {
      return;
    }
  });
}

function montaMensagemHelp(comandos) {
  const reducer = (acumulador, comando) => acumulador + comando.nome + ' -> ' + comando.descricao + '\n\n';
  return "**Todos os comando devem ser precedidos do prefixo: '" + prefixo + "'**\n\n" + comandos.reduce(reducer, '');
}

module.exports = respostaHandler;
