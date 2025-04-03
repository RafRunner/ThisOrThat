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
  console.log(
    `Mensagem recebida: "${textoMensagem}" no servidor '${msg.guild.name}' (${msg.guild.id}) \
pelo usuário '${msg.author.username}' (${msg.author.id})`
  );

  if (util.textoEhComando(textoMensagem, 'commands', 'c').match) {
    const servidor = await ServidorService.tentaCriarEObterOuPadrao(msg.guild.id);
    util.sendBuiltEmbed(msg, montaMensagemComandos(comandos, servidor));
    return;
  }

  for (const comando of comandos) {
    const matchComando = comando.funcaoMatch(textoMensagem);

    if (matchComando.match) {
      const servidor = await ServidorService.tentaCriarEObterOuPadrao(msg.guild.id);
      comando.funcaoExecuta(msg, matchComando.textoSemComando, servidor);
      break;
    }
  }
}

function montaMensagemComandos(comandos, servidor) {
  const mensagemEmbarcada = util.criaMensagemEmbarcada(
    locale.comandosExistentes(servidor.locale),
    locale.avisoPrefixos(servidor.locale, { prefixo })
  );

  const reducer = (mensagemEmbarcada, comando) => {
    if (comando.nome) {
      return mensagemEmbarcada.addFields([
        { name: comando.nome + ':', value: comando.descricao(servidor.locale) },
      ]);
    }
    return mensagemEmbarcada;
  };

  comandos.reduce(reducer, mensagemEmbarcada);
  return mensagemEmbarcada;
}

module.exports = respostaHandler;
