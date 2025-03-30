'use strict';

const { Client, GatewayIntentBits } = require('discord.js');
const respostaHandler = require('./src/respostaHandler');
const ServidorService = require('./src/services/ServidorService');
const { prefixo } = require('./src/constantes');
const token = require('./credenciais.json').token;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: ['CHANNEL', 'MESSAGE'],
});

client.on('ready', () => {
  console.log(`Logado como: ${client.user.tag}`);
  client.user.setActivity(prefixo + 'help', { type: 'PLAYING' });
});

client.on('guildCreate', async (guild) => {
  if (!(await ServidorService.exists(guild.id))) {
    ServidorService.registrar(guild.id);
  }
});

client.on('guildDelete', async (guild) => {
  console.log(await ServidorService.delete(guild.id));
});

client.on('messageCreate', respostaHandler);

client.login(token);
