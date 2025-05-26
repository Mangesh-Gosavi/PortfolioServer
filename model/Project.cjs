const mongoose = require('mongoose');

const portfolioProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: String,
  institute: String,
  description: String,
  skills: [String],
  imageUrl: String,
  githubUrl: [String],
  liveUrl: [String]
});

module.exports = mongoose.model('portfolioprojects', portfolioProjectSchema);
