// index.js

const mongoose = require('mongoose');
const ModerationLog = require('./models/ModerationLog');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/discord_bot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = {
  ModerationLog,
};