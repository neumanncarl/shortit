const mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({
  short: { type: String, required: true, unique: true },
  full: { type: String, required: true },
  hits: { type: Number, required: true, default: 0 },
  shortened: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model("URL", urlSchema);
