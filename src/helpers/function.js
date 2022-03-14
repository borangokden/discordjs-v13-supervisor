const { TextChannel, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const moment = require("moment");
moment.locale("tr");

module.exports = async client => {
    client.fetchUser = async (userID) => {
        try {
            return await client.users.fetch(userID);
        } catch (err) {
            return undefined;
        }
    };

    TextChannel.prototype.error = async function (message, text) {
        const ownerr = client.users.cache.get(config.bot.owner);
        const embed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor({name: message.member.displayName, iconURL: author.avatarURL({ dynamic: true, size: 2048 })})
        .setFooter({text: (config.bot.BotFooter) , iconURL: ownerr.avatarURL({ dynamic: true, size: 2048 })})
            .setTimestamp()
        this.send({ embeds: [embed.setDescription(text)] }).then(x => { if (x.deletable) setTimeout(() => { x.delete(); }, 10000) });
    };

    client.tick = async function (message) {
        if (config.emojis.yes) {
            message.react(config.emojis.no);
        }
    };

    client.ytick = async function (message) {
        if (config.emojis.no) {
            message.react(config.emojis.yes);
        }
    };
}
