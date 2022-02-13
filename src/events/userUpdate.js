const Discord = require('discord.js');
const config = require("../../config.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
const client = global.client;


module.exports = async function(oldUser, newUser) {
    const guild = client.guilds.cache.get(config.Guild.GuildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === config.roles.team)
    const member = guild.members.cache.get(newUser.id)
    let taglıüye = await guild.members.cache.filter(member => member.user.username.includes(config.registration.GuilDTag)).size
    const embed = new MessageEmbed().setTimestamp().setFooter(`Toplam ${taglıüye} taglımız var.`).setAuthor(" " + newUser.username + " ", newUser.avatarURL())
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(config.registration.GuilDTag) && !newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.remove(config.roles.team)
            client.channels.cache.get(config.logs.taglog).send({ embeds: [embed.setDescription(`${newUser} isminden \`${config.registration.GuilDTag}\` çıkartarak ailemizden ayrıldı!  \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
        } else if (!oldUser.username.includes(config.registration.GuilDTag) && newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.add(config.roles.team)
            client.channels.cache.get(config.channels.chat).send(`${config.emojis.tada} Tebrikler, ${newUser} \`${config.registration.GuilDTag}\` tag alarak ailemize katıldı!`)
            client.channels.cache.get(config.logs.taglog).send({ embeds: [embed.setDescription(`${newUser} ismine \`${config.registration.GuilDTag}\` alarak ailemize katıldı!  \n─────────────────\nÖnce ki kullanıcı adı: \`${oldUser.tag}\` - Sonra ki kullanıcı adı: \`${newUser.tag}\``)]})
        }
    }
}

module.exports.conf = {
    name: "userUpdate"
}