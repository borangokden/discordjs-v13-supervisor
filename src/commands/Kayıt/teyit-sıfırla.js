const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")
module.exports = {
  name: "kayıt-sıfırla",
  aliases: ["kayıt-sifirla", "teyit-sıfırla"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    
    if (!message.member.roles.cache.has(config.bot.owner) && !message.member.roles.cache.has(config.bot.owner) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Komutu kullanmak için geçerli yetkin olmalı!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  
    var member = message.mentions.users.first() || guild.members.cache.get(args[0]);

if (!member) {
let erkek = db.delete(`erkek_${member}`) || [];
let kadın = db.delete(`kadın_${member}`) || [];
let toplam = db.delete(`toplam_${member}`) || [];
message.reply({ embeds: [embed.setDescription(`Kayıt verilerin silindi.`)] });
}
  
if(member) {
let erkek = db.delete(`erkek_${member}`) || [];
let kadın = db.delete(`kadın_${member}`) || [];
let toplam = db.delete(`toplam_${member}`) || [];
message.reply({ embeds: [embed.setDescription(`${member} kullanıcısının kayıt verileri başarıyla silindi.`)] });

};
  
}
  

  }