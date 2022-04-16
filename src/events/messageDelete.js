const config = require("../../config.json");
const db = require("quick.db");
const client = global.client;
const moment = require("moment");
const { MessageEmbed } = require("discord.js")

moment.locale("tr")

module.exports = async message => {
    if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
    const snipe = {
        icerik: message.content,
        yazar: message.author.id,
        yazilmaTarihi: message.createdTimestamp,
        silinmeTarihi: Date.now(),
    }
    await db.set(`snipe.${message.guild.id}.${message.channel.id}`, snipe)
    let embed = new MessageEmbed().setColor('BLUE')
    let user = message.member
    client.channels.cache.get(config.logs.messagelog).send({ embeds: [embed.setDescription(`     
    ${user ? user.toString(): user.username} kullanıcısı **${message.channel.name}** kanalında bir mesaj sildi.

    ${message.content}`)] });
}

module.exports.conf = {
    name: "messageDelete"
}
