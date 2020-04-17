console.log("hello world");
const Discord = require('discord.js')
const bot = new Discord.Client();

client.on('ready', () => {
  console.log(Logged in as ${bot.user.tag})
});