const mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({});

module.exports = mongoose.model("URL", urlSchema);
