const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const respostaHandler = require("./src/respostaHandler");

function loadToken() {
  const raw = fs.readFileSync("credenciais.json");
  const credenciais = JSON.parse(raw);
  return credenciais.token;
}

client.on("ready", () => {
  console.log(`Logado como: ${client.user.tag}`);
});

client.on("message", msg => {
  respostaHandler(msg);
});

client.login(loadToken());
