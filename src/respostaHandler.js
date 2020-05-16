'use strict';

const comandos = require('./comandos/todosOsComandos');
const { prefixo } = require('./constantes');
const util = require('./util');

function respostaHandler(msg) {
  if (!msg.content || msg.content[0] !== prefixo) {
    return;
  }

  const textoMensagem = msg.content.substring(1).trim();

  if (util.textoEhComando(textoMensagem, 'commands', 'c')) {
    const embed = montaMensagemHelp(comandos);
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
  const mensagemEmbarcada = util.criaMensagemEmbarcada(
    'Comandos existentes:',
    "**Todos os comando devem ser precedidos do prefixo: '" + prefixo + "'**"
  );
  const reducer = (mensagemEmbarcada, comando) => mensagemEmbarcada.addField(comando.nome + ':', comando.descricao);
  comandos.reduce(reducer, mensagemEmbarcada);
  return mensagemEmbarcada;
}

module.exports = respostaHandler;
