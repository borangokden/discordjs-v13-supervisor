const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json")
module.exports = {
    name: 'say',
    aliases: ["sayy", "sayı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let aktif = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
        let uye = message.guild.memberCount
        let etiket = message.guild.members.cache.filter(u => u.user.discriminator.includes(config.registration.GuildDiscrim)).size;  
        var tag = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag)).size;
        let toplamtag = etiket + tag
        let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
        let boost = message.guild.premiumSubscriptionCount;
        message.reply({ embeds: [embed.setDescription(`
    \`•\` Sunucumuzda **${uye}** kullanıcı bulunuyor.
    \`•\` Sunucumuzda  **${aktif}** aktif kullanıcı bulunuyor.
    \`•\` Seste **${sesli}** kullanıcı bulunuyor.
    \`•\` Sunucuda **${toplamtag}** taglı bulunuyor.
    \`•\` Sunucuda **${boost}** takviye bulunuyor.
    `)] });
      
    }

}
