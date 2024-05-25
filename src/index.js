// File: src/index.js

// Import necessary modules
const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const { prefix, token } = require('../config/auth');
const { logger } = require('./utils/logger');
const commands = require('./commands');
const { handleCommand } = require('./utils/commandHandler');

// Set up Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load all commands dynamically
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event listener for when the bot is ready
client.once('ready', () => {
    logger.info('Bot is ready');
});

// Event listener for incoming messages
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return;

    try {
        handleCommand(command, message, args);
    } catch (error) {
        logger.error(`Error executing command: ${error}`);
        message.reply('There was an error executing that command');
    }
});

// Login to Discord with bot token
client.login(token);