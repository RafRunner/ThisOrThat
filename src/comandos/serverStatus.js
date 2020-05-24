'use strict';

const Comando = require('./Comando');
const { prefixo } = require('../constantes');
const util = require('../util');
const ServidorService = require('../services/ServidorService');

const help = new Comando(
  (textoMensagem) => util.textoEhComando(textoMensagem, 'serverStatus', 'ss'),

  async (msg, textoMensagem) => {
    const servidor = await ServidorService.tentaCriarEObterOuPadrao(msg.guild.id);

    let modo;
    if (servidor.somente_perguntas_servidor) {
      modo = 'server, só serão feitas perguntas criadas nesse servidor';
    } else if (servidor.somente_perguntas_globais) {
      modo = 'global, só serão feitas perguntas do reposit´prio global do bot, perguntas que você criou não são feitas a menos que pedidas pelo id';
    } else {
      modo = 'normal, todas as perguntas são feitas, porém as que você criou no seu server podem demorar a aparecer!';
    }

    const mensagemEmbarcada = util.criaMensagemEmbarcada('Configurações atuais do servidor:', '');
    mensagemEmbarcada.addField('Tempo para responder as perguntas (timeOut):', servidor.tempo_para_responder + ' segundos');
    mensagemEmbarcada.addField('Modo (quais perguntas serão feitas):', modo);
    msg.channel.send(mensagemEmbarcada);
  },

  'serverStatus (ou ss)',

  `Mostra as configurações atuais do bot no servidor`
);

module.exports = help;
