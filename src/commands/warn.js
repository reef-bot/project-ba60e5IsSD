// File: src/commands/warn.js

const { MessageEmbed } = require('discord.js');
const { logWarn } = require('../utils/logger');

module.exports = {
  name: 'warn',
  description: 'Warn a user for violating server rules',
  execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention the user you want to warn.');
    }

    const reason = args.slice(1).join(' ');
    if (!reason) {
      return message.reply('Please provide a reason for the warning.');
    }

    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle(`User Warned: ${user.tag}`)
      .addField('Moderator', message.author.tag)
      .addField('Reason', reason)
      .setTimestamp();

    try {
      user.send(`You have been warned in ${message.guild.name} for: ${reason}`);
    } catch (error) {
      console.error(`Could not send warning DM to ${user.tag}. Error: ${error}`);
    }

    logWarn(user, message.author, reason);

    message.channel.send(embed);
  },
};