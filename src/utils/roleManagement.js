// roleManagement.js

const { Client } = require('discord.js');

const client = new Client();

// Function to assign a role to a user
const assignRole = (userId, roleId) => {
  const user = client.users.cache.get(userId);
  const role = user.guild.roles.cache.get(roleId);

  if (!user || !role) {
    console.log('User or role not found.');
    return;
  }

  user.roles.add(role)
    .then(() => console.log(`Role ${role.name} assigned to ${user.tag} successfully.`))
    .catch((error) => console.error(`Error assigning role: ${error.message}`));
};

// Function to remove a role from a user
const removeRole = (userId, roleId) => {
  const user = client.users.cache.get(userId);
  const role = user.guild.roles.cache.get(roleId);

  if (!user || !role) {
    console.log('User or role not found.');
    return;
  }

  user.roles.remove(role)
    .then(() => console.log(`Role ${role.name} removed from ${user.tag} successfully.`))
    .catch((error) => console.error(`Error removing role: ${error.message}`));
};

module.exports = { assignRole, removeRole };