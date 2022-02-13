const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "un-cmute",
  aliases: ["unmute", "uncmute", "susturma-kaldir"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.mute.staff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.reply({ embeds: [embed.setDescription('Öncelikle susturulması kaldırılacak kullanıcıyı belirtmelisin!')] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    await guild.members.cache.get(user.id).roles.remove(config.penals.mute.roles);
    message.reply({ embeds: [embed.setDescription(`${user} kullanıcısının susturulması ${author} tarafından kaldırıldı.`)] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    client.channels.cache.get(config.penals.mute.log).send({ embeds: [embed.setDescription(`     
    ${user} kullanıcısının susturulması kaldırıldı.
         
    Kullanıcı: ${user} - \`(${user.id})\`
    Yetkili: ${author} - \`(${author.id})\`
    Tarih: \`Bulunamadı.\``)] }); 
      db.set(`mute_${user.id}`, false)
  }
};