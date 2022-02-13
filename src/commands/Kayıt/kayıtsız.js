const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
module.exports = {
    name: "unregistered",
    aliases: ["unreg", "ks", "kayıtsız"],
    execute: async (client, message, args, embed, author, channel, guild) => {


        const member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.roles.cache.has(config.registration.staff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Komutu kullanmak için geçerli yetkin olmalı!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if(!member) { message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir üye belirtmelisin.")] });
        return }
        if(message.author.id === member.id){ message.reply({ embeds: [embed.setDescription("Kendinizi kayıtsıza atamazsınız.")] });
        return}

        await member.roles.cache.has(config.roles.booster) ? member.roles.set([config.roles.booster, config.registration.unregistered]) : member.roles.set([config.registration.unregistered]).catch()
        await member.setNickname(config.registration.autonickname)
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı başarıyla kayıtsıza <@&${config.registration.unregistered}> atıldı.`)] });


    }
}