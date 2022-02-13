const db = require("quick.db");

module.exports = {
    name: 'kke',
    aliases: ["kayıtçı"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0])
        
        if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let kav = db.get(`kav_${member.id}`);
        if (!kav) return message.reply({ embeds: [embed.setDescription("Bu kullanıcının veri tabanında kayıt verisi bulunmamakta!")] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısının veri tabanındaki kayıt görevlisi:
        
        ${kav.join("\n")}`)] });
    }
}
