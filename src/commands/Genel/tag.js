const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js")
const config = require("../../../config.json");

module.exports = {
    name: "tag",
    aliases: ["tag"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        message.reply({ content: `${config.registration.GuilDTag}`}) 
    }
}
