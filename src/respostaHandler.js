'use strict';

const comandos = require('./comandos/todosOsComandos');
const ServidorService = require('./services/ServidorService');
const { prefixo } = require('./constantes');
const util = require('./util');
const locale = require('./locale/locale');

async function respostaHandler(msg) {
  if (!msg.content || msg.content[0] !== prefixo) {
    return;
  }

  const textoMensagem = msg.content.substring(1).trim();

  if (util.textoEhComando(textoMensagem, 'commands', 'c')) {
    const servidor = await ServidorService.tentaCriarEObterOuPadrao(msg.guild.id);
    const embed = montaMensagemComandos(comandos, servidor);
    msg.channel.send(embed);
    return;
  }

  comandos.forEach(async (comando) => {
    if (comando.funcaoMatch(textoMensagem)) {
      const servidor = await ServidorService.tentaCriarEObterOuPadrao(msg.guild.id);
      const textoSemComando = (/^\w+ (.+)/g.exec(textoMensagem) || [0, ''])[1].trim();

      comando.funcaoExecuta(msg, textoSemComando, servidor);
    }
  });
}

function montaMensagemComandos(comandos, servidor) {
  const mensagemEmbarcada = util.criaMensagemEmbarcada(
    locale.comandosExistentes(servidor.locale),
    locale.avisoPrefixos(servidor.locale, { prefixo })
  );
  const reducer = (mensagemEmbarcada, comando) => {
    if (comando.nome) {
      return mensagemEmbarcada.addField(comando.nome + ':', comando.descricao(servidor.locale));
    }
    return mensagemEmbarcada;
  };
  comandos.reduce(reducer, mensagemEmbarcada);
  return mensagemEmbarcada;
}

module.exports = respostaHandler;
