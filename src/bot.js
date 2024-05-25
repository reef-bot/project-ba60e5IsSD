// bot.js

const { Client, Intents } = require('discord.js');
const winston = require('winston');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { token, prefix } = require('../config/auth');
const { setupCommands } = require('./utils/setupCommands');
const { handleModeration } = require('./utils/handleModeration');
const { handleUserVerification } = require('./utils/handleUserVerification');
const { handleCustomCommands } = require('./utils/handleCustomCommands');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  winston.info(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Handle moderation actions
  await handleModeration(message);

  // Handle user verification
  handleUserVerification(message);

  // Handle custom commands
  handleCustomCommands(message);
});

client.login(token);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => winston.info('Connected to MongoDB'))
  .catch((err) => winston.error(`Error connecting to MongoDB: ${err.message}`));

setupCommands(client, prefix);

module.exports = client;