'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const util = require('../util');
const ServidorService = require('../services/ServidorService');

const modos = ['normal', 'server', 'global'];

const mode = new Comando(
  (textoMensagem) => util.textoComecaComComando(textoMensagem, 'mode', 'm'),

  async (msg, textoMensagem) => {
    const pattrModo = /\w+/g;
    let novoModo = textoMensagem.match(pattrModo);

    if (!novoModo) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(`Uso: ${prefixo}m modo`, 'Uso incorreto do comando! '));
      return;
    }
    novoModo = novoModo[1].toLowerCase();
    if (modos.indexOf(novoModo) === -1) {
      msg.channel.send(util.criaMensagemEmbarcadaErro(`Modos existentes: ${modos}`, 'Modo inválido!'));
      return;
    }

    const camposAlterados = { somente_perguntas_servidor: false, somente_perguntas_globais: false };
    if (novoModo === 'server') {
      camposAlterados.somente_perguntas_servidor = true;
    } else if (novoModo === 'global') {
      camposAlterados.somente_perguntas_globais = true;
    }

    const resultado = await ServidorService.createIfNotExistsAndUpdate(msg.guild.id, camposAlterados);
    if (resultado.sucesso) {
      msg.channel.send(util.criaMensagemEmbarcada('Modo atualizado', 'O modo do bot foi atualizado para ' + novoModo));
    } else {
      msg.channel.send(util.criaMensagemEmbarcadaErro('Mensagem: ' + resultado.erro, 'Erro ao atualizar dados do servidor!'));
    }
  },

  'mode (ou m)',

  `Altera o modo do bot. Atualmente existem 3: normal (todas as perguntas são feitas), server (somente perguntas do servidor são feitas) e global (somente perguntas globais são feitas).\nUso: ${prefixo}mode modo`
);

module.exports = mode;
