const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const ms = require('ms');

module.exports = async (message) => {

    const afkembed = new MessageEmbed()
    .setColor(message.member.displayHexColor)
    .setTimestamp()
const etiket = message.mentions.users.first()
const uye = db.fetch(`user_${message.author.id}_${message.guild.id}`)
const nickk = db.fetch(`nick_${message.author.id}_${message.guild.id}`)
if (etiket) {
    const reason = db.fetch(`sebep_${etiket.id}_${message.guild.id}`)
    const uye2 = db.fetch(`user_${etiket.id}_${message.guild.id}`)
    if (message.content.includes(uye2)) {
        const time = db.fetch(`afktime_${message.guild.id}`);
        const timeObj = ms(Date.now() - time);
        message.reply({ embeds: [afkembed.setDescription(`${etiket} kullanıcısı **${reason}** sebebiyle \`${timeObj}\` süresi boyunca afk.`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    }
}
if (message.author.id === uye) {
    message.member.setNickname(nickk).catch(err => console.log(" "))
    db.delete(`sebep_${message.author.id}_${message.guild.id}`)
    db.delete(`user_${message.author.id}_${message.guild.id}`)
    db.delete(`nick_${message.author.id}_${message.guild.id}`)
    db.delete(`user_${message.author.id}_${message.guild.id}`);
    db.delete(`afktime_${message.guild.id}`)
    message.reply({ embeds: [afkembed.setDescription(`Başarıyla **AFK** modundan çıkış yaptınız!`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
}
    const ownerr = client.users.cache.get(config.bot.owner);
    if (config.bot.prefix && !message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(command));
    const author = message.author
    const channel = message.channel
    const guild = message.guild
    const embed = new MessageEmbed()        
        .setColor(message.member.displayHexColor)
        .setAuthor({name: message.member.displayName})
        .setFooter({text: (config.bot.BotFooter)})
    if (cmd) {
        if (cmd.owner && config.bot.owner !== author.id) return;
        if (cmd.guildowner && config.bot.owner !== author.id && guild.owner.id !== author.id) return;
        if (client.cooldown.has(author.id) === config.bot.cooldown) {
            client.commandblocked.push(author.id)
            message.reply({ embeds: [embed.setDescription(`${author} komutları kötüye kullandığın için engellendin.`)] });
        }
        if (client.commandblocked.includes(message.author)) return;
        cmd.execute(client, message, args, embed, author, channel, guild);
        if (config.bot.owner !== author && guild.owner !== author) {
            if (!client.cooldown.has(author)) client.cooldown.set(author, 1);
            else client.cooldown.set(author.id, client.cooldown.get(author.id) + 1);
        }
        setTimeout(() => {
            if (client.cooldown.has(author.id)) {
                client.cooldown.delete(author.id)
            }
        }, 1000 * 60 * 5);
    }
}

module.exports.conf = {
    name: "messageCreate"
}
