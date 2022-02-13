const db = require('quick.db');
const config = require("../../../config.json")

module.exports = {
    name: "force-ban",
    aliases: ["kalıcı-ban", "forceban", "fban"],
    guildowner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        let member = message.mentions.members.first() || guild.members.cache.get(args[0]);
        if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription(`Öncelikle kalıcı banlanacak kullanıcıyı belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let reason = args.slice(1).join(' ')
        if (!reason) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir sebep belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        guild.members.ban(member.id, { reason: reason })
        db.add(`ceza_${guild.id}`, 1)
        message.reply({ embeds: [embed.setDescription(`**${member}** **(${member.id})** kullanıcısı ${author} tarafından **"${reason}"** sebebiyle sunucudan kalıcı olarak banlandı! (Ceza Numarası: \`#${db.fetch(`ceza_${guild.id}`)}\`)`)] }).catch((err) => console.log(err), client.ytick(message))
        client.channels.cache.get(config.penals.ban.log).send({ embeds: [embed.setDescription(`     
        ${member ? member.toString(): member.username} kullanıcısı kalıcı olarak sunucudan yasaklandı.

        Ceza ID: \`${db.fetch(`ceza_${guild.id}`)}\`
        Kullanıcı: ${member ? member.toString() : ""} - \`(${member.id})\`
        Yetkili: ${author} - \`(${author.id})\`
        Sebep: \`${reason}\`
        Tarih: \`${moment(Date.now()).format("LLL")}\``)] });
        db.set(`ban.${member.id}`, true)
    }
}