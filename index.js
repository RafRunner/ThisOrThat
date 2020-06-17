'use strict';

const Discord = require('discord.js');
const fs = require('fs');
const respostaHandler = require('./src/respostaHandler');
const ServidorService = require('./src/services/ServidorService');
const util = require('./src/util');
const { prefixo } = require('./src/constantes');

function loadToken() {
  const raw = fs.readFileSync('credenciais.json');
  const credenciais = JSON.parse(raw);
  return credenciais.token;
}

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logado como: ${client.user.tag}`);
  client.user.setActivity(prefixo + 'help', { type: 'PLAYING' });
});

client.on('guildCreate', async (guild) => {
  if (await ServidorService.exists(guild.id)) {
    return;
  }
  ServidorService.registrar(guild.id);
});

client.on('guildDelete', async (guild) => {
  console.log(await ServidorService.delete(guild.id));
});

client.on('message', (msg) => {
  respostaHandler(msg);
});

client.login(loadToken());
