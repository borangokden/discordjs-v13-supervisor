const Discord = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: "kilit",
    aliases: ["kilitle", "kanal"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const content = args[0];

        if (!content) return message.reply({ embeds: [embed.setDescription("Geçerli bir seçenek belirtin! `.kilit aç/kapat`")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

        if (content === "aç") {
            let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
            message.channel.permissionOverwrites.edit(everyone.id, {
                'SEND_MESSAGES': null,

            })
            return message.reply({ embeds: [embed.setDescription(`<#${message.channel.id}> kanalının kilidini, ${message.author} açtı.`)] });
        }

        if (content === "kapat") {
            let everyone = guild.roles.cache.find(r => r.name === "@everyone");
            message.channel.permissionOverwrites.edit(everyone.id, {
                SEND_MESSAGES: false
            });
            return message.reply({ embeds: [embed.setDescription(`<#${message.channel.id}> kanalının kilidini, ${message.author} kapattı.`)] });
        }
    }

}