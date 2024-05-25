// File Name: settings.js

const settings = {
  moderationActions: {
    kick: {
      enabled: true,
      logToDatabase: true,
      logChannel: 'mod-logs',
      permissionsRequired: ['KICK_MEMBERS'],
    },
    ban: {
      enabled: true,
      logToDatabase: true,
      logChannel: 'mod-logs',
      permissionsRequired: ['BAN_MEMBERS'],
    },
    mute: {
      enabled: true,
      logToDatabase: true,
      logChannel: 'mod-logs',
      permissionsRequired: ['MANAGE_ROLES'],
    },
    warn: {
      enabled: true,
      logToDatabase: true,
      logChannel: 'mod-logs',
      permissionsRequired: ['KICK_MEMBERS'],
    },
  },
  messageFiltering: {
    spam: {
      enabled: true,
      action: 'mute',
    },
    profanity: {
      enabled: true,
      action: 'warn',
    },
    inappropriateContent: {
      enabled: true,
      action: 'kick',
    },
  },
  roleManagement: {
    roleAssignment: {
      enabled: true,
      permissionsRequired: ['MANAGE_ROLES'],
      logToDatabase: true,
      logChannel: 'mod-logs',
    },
    roleRemoval: {
      enabled: true,
      permissionsRequired: ['MANAGE_ROLES'],
      logToDatabase: true,
      logChannel: 'mod-logs',
    },
  },
  userVerification: {
    enabled: true,
    verificationLevel: 'MEDIUM',
  },
  customCommands: {
    enabled: true,
    prefix: '!',
  },
};

module.exports = settings;