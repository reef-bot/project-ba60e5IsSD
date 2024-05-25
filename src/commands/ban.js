// File: src/commands/ban.js

const { Client, Intents } = require('discord.js');
const { token } = require('../../config/auth');
const { logger } = require('../utils/logger');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  logger.info('Bot is ready');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ban') {
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    try {
      await interaction.guild.members.ban(user, { reason: reason });
      interaction.reply({ content: `${user.tag} has been banned.`, ephemeral: true });
    } catch (error) {
      logger.error(`Error banning user: ${error.message}`);
      interaction.reply({ content: 'There was an error banning the user.', ephemeral: true });
    }
  }
});

client.login(token);