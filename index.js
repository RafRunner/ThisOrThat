'use strict';

const Discord = require('discord.js');
const fs = require('fs');
const respostaHandler = require('./src/respostaHandler');
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

client.on('message', (msg) => {
  respostaHandler(msg);
});

client.login(loadToken());
