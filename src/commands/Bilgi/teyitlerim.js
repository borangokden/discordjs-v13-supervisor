const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");
module.exports = {
    name: "kayıtsayı",
    aliases: ["teyitler", "kayıtsayım"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.roles.cache.has(config.youtube.staff2) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]) || author;
        let erkek = db.get(`erkek_${author.id}`) || 0;
        let kadın = db.get(`kadın_${author.id}`) || 0;
        let toplam = db.get(`toplam_${author.id}`) || 0;
        message.reply({ embeds: [embed.setDescription(`
 ${member} kullanıcısı toplam **${toplam}** kayıta sahip.
 
 Erkek Kayıt: **${erkek}**
 Kadın Kayıt: **${kadın}**`)] });
    }
}