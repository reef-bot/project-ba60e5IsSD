// File: src/database/models/ModerationLog.js

const mongoose = require('mongoose');

const moderationLogSchema = new mongoose.Schema({
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ModerationLog = mongoose.model('ModerationLog', moderationLogSchema);

module.exports = ModerationLog;