// File: src/commands/kick.js

const { Client, Intents } = require('discord.js');
const { token } = require('../../config/auth');
const { logKick } = require('../utils/logger');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'kick') {
    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    const user = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    try {
      await user.kick(reason);
      logKick(user, interaction.user, reason);
      interaction.reply({ content: `Successfully kicked ${user.user.tag}`, ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'There was an error while trying to kick the user.', ephemeral: true });
    }
  }
});

client.login(token);