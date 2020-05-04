'use strict';

const Discord = require('discord.js');
const comandos = require('./comandos/todosOsComandos');
const { prefixo } = require('./constantes');

function respostaHandler(msg) {
  if (!msg.content || msg.content[0] !== prefixo) {
    return;
  }

  const textoMensagemNormalizado = msg.content.substring(1).toString();

  if (textoMensagemNormalizado === 'help') {
    const embed = new Discord.MessageEmbed()
      .setTitle('Comandos Dispoíveis:')
      .setColor(0xff0000)
      .setDescription(montaMensagemHelp(comandos));
    msg.channel.send(embed);
    return;
  }

  comandos.forEach((comando) => {
    if (comando.executarSeMatch(textoMensagemNormalizado, msg)) {
      return;
    }
  });
}

function montaMensagemHelp(comandos) {
  const reducer = (acumulador, comando) => acumulador + prefixo + comando.nome + ' -> ' + comando.descricao + '\n';
  return comandos.reduce(reducer, '');
}

module.exports = respostaHandler;
