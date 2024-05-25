// File: src/commands/mute.js

const { Mute } = require('../../utils/roleManagement');
const { logMuteAction } = require('../../utils/logger');

module.exports = {
  name: 'mute',
  description: 'Mute a user in the server',
  execute(message, args) {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
      return message.reply('You do not have the required permissions to use this command.');
    }

    const target = message.mentions.users.first();
    if (!target) {
      return message.reply('Please mention the user you want to mute.');
    }

    const member = message.guild.members.cache.get(target.id);
    if (member) {
      Mute(member);
      logMuteAction(message.author, target, message.guild);
      message.channel.send(`${target} has been muted.`);
    } else {
      message.reply('That user is not in this server.');
    }
  },
};