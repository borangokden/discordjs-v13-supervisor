const Discord = require("discord.js");
const config = require("../../../config.json");
module.exports = {
    name: "yetkili-bilgi",
    aliases: ["yt-bilgi", "yetkililer"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let ses = message.guild.members.cache.filter(x => x.voice.channel).size
        let role =  guild.roles.cache.find(rol => rol.id === config.registration.staff)
        let notag = message.guild.members.cache.filter(x => {
            return !x.user.username.includes("XXXX") && x.voice.channel
        }).size
        let yetkili = message.guild.members.cache.filter(x => {
            return x.user.username.includes("XXXXX") && x.voice.channel && x.roles.cache.has(config.registration.staff)
        }).size
        message.reply({ embeds: [embed.setDescription(`          
\`•\` Sunucuda toplam **${role.members.size}** yetkili bulunmaktadır!
\`•\` Ses kanallarında toplam **${yetkili}** yetkili bulunmaktadır!
`)] })
    }
}