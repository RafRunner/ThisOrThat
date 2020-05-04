'use strict';

const Discord = require('discord.js');

const util = {
  criaMensagemEmbarcada: (titulo, descricao) => {
    return new Discord.MessageEmbed()
      .setTitle(titulo)
      .setColor(0x3477eb)
      .setDescription(descricao);
  }
};

module.exports = util;
