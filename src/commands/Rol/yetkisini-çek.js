const config = require("../../../config.json")
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");

module.exports = {
    name: "yetki-çek",
    aliases: ["yetki-al", "yt-çek", "ytçek"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.registration.yetkilialim) && !message.member.roles.cache.has(config.registration.yetkilialim) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Komutu kullanmak için gerekli yetkin olmalı!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        let total = db.get(`subs_${author.id}`) || 0;
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Kendine bu işlemi uygulayamazsın!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        guild.members.cache.get(member.id).roles.remove(config.registration.staff);
        guild.members.cache.get(member.id).roles.remove(config.registration.enaltyetkilirolü);
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısından <@&${config.registration.staff}> ve <@&${config.registration.enaltyetkilirolü}> rolleri alındı.`)] });
        if (config.bot.dmMessages) member.send(`**${message.guild.name}** sunucumuzda başarıyla, **${message.author.tag}** yöneticisi tarafından yetkili rollerin alındı!`).catch(() => {});
        
        client.channels.cache.get(config.logs.rollog).send({ content: `${member} - \`(${member.id})\` kullanıcısından \`(${message.author.id})\` tarafından **YETKİLİ** rolleri alındı.` });

            
        }
    }

