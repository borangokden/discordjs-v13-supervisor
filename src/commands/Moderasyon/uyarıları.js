const db = require("quick.db");
const config = require("../../../config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "warns",
    aliases: ["uyarılar"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.penals.warn.staff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const warns = await db.fetch(`warns_${member.id}`)
        if (!warns) return message.reply({ embeds: [embed.setDescription("Bu kullanıcının veri tabanında daha önceden uyarı verisi bulunmamakta.")] }).catch((err) => console.log(err), client.tick(message))
        message.reply({ embeds: [embed.setDescription(`${warns.map((data) => `${data}`).join("\n")}`)] }).catch((err) => console.log(err), client.tick(message))
    }
}