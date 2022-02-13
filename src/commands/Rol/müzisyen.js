const config = require("../../../config.json")
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");

module.exports = {
    name: "müzisyen",
    aliases: ["musicians", "vokal"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.roles.cache.has(config.registration.staff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Komutu kullanmak için geçerli yetkin olmalı!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Kendine bu rolü veremezsin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        guild.members.cache.get(member.id).roles.add(config.roles.müzisyen);
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısına <@&${config.roles.müzisyen}> rolü verildi.`)] });
        if (config.bot.dmMessages) member.send(`**${message.guild.name}** sunucumuzda başarıyla, **${message.author.tag}** yetkilisi tarafından özel rolün verildi.`).catch(() => {});
        
        embed.setColor("e4b400")
        client.channels.cache.get(config.logs.rollog).send({ embeds: [embed.setDescription(`${member} kullanıcısına ${message.author} tarafından <@&${config.roles.müzisyen}> rolü verildi.
      
        \`Rolü Alan Kullanıcı:\` ${member} - (**${member.id}**)
        \`Rolü Veren Yetkili:\` ${message.author} - (**${message.author.id}**)
        \`Verilen Rol:\` <@&${config.roles.müzisyen}>     
        \`Rol Verilme Tarihi:\` ${moment(Date.now()).format("LLL")}`)] });
    }
}
