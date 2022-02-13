const { MessageEmbed } = require("discord.js")
const config = require("../../../config.json");


module.exports = {
    name: "git",
    aliases: ["git"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Bu komutu kullanabilmek için öncelikle geçerli yetkin olmalı.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!Member || !Member.voice.channel || Member.id === message.author.id) message.reply({ embeds: [embed.setDescription(`Öncelikle seste bulunan geçerli birini belirtmelisin!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (Member.voice.channel === message.member.voice.channel) return message.reply({ embeds: [embed.setDescription(`Şuanda zaten aynı kanaldasınız.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

    if (!message.member.roles.cache.has(config.penals.transport.staff)  === true) {
        if (Member.voice.channel && message.member.voice.channel) message.member.voice.setChannel(Member.voice.channel)
        message.reply({ embeds: [embed.setDescription(`${Member} başarıyla kullanıcısının kanalına transfer oldunuz.`)] }).catch((err) => console.log(err), client.ytick(message))
    } else {
        const NewMessage = await message.reply({ content: `${Member}, ${message.author} kullanıcısı \`${message.member.voice.channel.name}\` yanınıza gelmek istiyor, kabul ediyor musun?`})
        await NewMessage.react("✅");
        const Collector = await NewMessage.createReactionCollector((reaction, user) => reaction.emoji.name === "✅" && user.id === Member.id, { max: 1, time: 60000 });

        Collector.on("collect", () => {
            NewMessage.delete({ timeout: 200 });
            message.reply({ embeds: [embed.setDescription(`${Member}, ${message.author} başarıyla kanalınıza taşındı.`)] }).catch((err) => console.log(err), client.ytick(message))
            if (Member.voice.channel && message.member.voice.channel) message.member.voice.setChannel(Member.voice.channel);
            Collector.stop();
        });

        Collector.on("end", () => Collector.stop());
    }
    }
}