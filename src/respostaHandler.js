'use strict';

const Discord = require('discord.js');
const comandos = require('./comandos/todosOsComandos');
const { prefixo } = require('./constantes');
const util = require('./util');

function respostaHandler(msg) {
  if (!msg.content || msg.content[0] !== prefixo) {
    return;
  }

  const textoMensagemNormalizado = msg.content.substring(1).trim();

  if (textoMensagemNormalizado === 'help') {
    const embed = util.criaMensagemEmbarcada('Como Usar o Bot:', montaMensagemHelp(comandos));
    msg.channel.send(embed);
    return;
  }

  comandos.forEach(comando => {
    if (comando.executarSeMatch(textoMensagemNormalizado, msg)) {
      return;
    }
  });
}

function montaMensagemHelp(comandos) {
  const reducer = (acumulador, comando) => acumulador + prefixo + comando.nome + ' -> ' + comando.descricao + '\n\n';
  return comandos.reduce(reducer, '');
}

module.exports = respostaHandler;
