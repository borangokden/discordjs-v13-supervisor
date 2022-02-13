const config = require("../../../config.json");
const db = require("quick.db");

module.exports = {
  name: "zengin",
  aliases: ["booster"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.roles.booster) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle booster olmalısın.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let name = args.slice(0).join(' ');
    if (!name) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir kullanıcı adı giriniz!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (name.length > 32) message.reply({ embeds: [embed.setDescription(`Öncelikle **32** karakteri geçmeyen bir isim belirtiniz!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    guild.members.cache.get(author.id).setNickname(name).then(x => message.reply({ embeds: [embed.setDescription(`Kullanıcı adın başarıyla \`${name}\` olarak değiştirildi!`)] }))
  }
}