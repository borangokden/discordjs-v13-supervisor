const config = require("../../../config.json");

module.exports = {
    name: "rolsüz",
    aliases: ["rolsuz"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        let bg = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
        if (args[0] == "ver") {
            bg.forEach(r => {
                r.roles.add(config.registration.unregistered)
            });
            message.reply({ embeds: [embed.setDescription("Sunucuda rolü olmayan \`"+ bg.size +"\` kişiye kayıtsız rolü verildi.")] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        } else if (!args[0]) {
            message.reply({ embeds: [embed.setDescription("Sunucumuzda rolü olmayan \`"+ bg.size +"\` kişi var.")] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        }
    }
}
