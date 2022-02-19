const Discord = require("discord.js");
const config = require("../../../config.json")
const db = require("quick.db");

module.exports = {
  name: "sicil",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.jail.staff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanabilmek için yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let member = message.mentions.users.first() || guild.members.cache.get(args[0]);
    const points = db.fetch(`points_${member.id}`) || 0
    if (!member) return message.reply({ embeds: [embed.setDescription(`Geçerli bir kullanıcı etiketlemelisin.`)] });
    let penals = db.get(`sicil_${member.user.id}`);
    if (!penals) return message.reply({ embeds: [embed.setDescription(`${member} sicil geçmişi yok.`)] });
      message.reply({ embeds: [embed.setDescription(penals.map((data) => `${data}`).join("\n"))] });

  }
}
