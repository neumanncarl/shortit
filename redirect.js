const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  dotenv = require('dotenv'),
  URL = require('./models/url');

dotenv.config();

mongoose.connect(process.env.DB_ENV, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/l/:id', function (req, res) {
  URL.findOneAndUpdate({ short: req.params.id }, { $inc: { hits: 1 } }).then(function (foundURL) {
    if (foundURL === null) {
      res.sendFile(__dirname + "/catch.html");
      return;
    }
    res.redirect(foundURL.full);
  }).catch(function (err) {
    console.log(err)
    res.sendFile(__dirname + "/catch.html");
  })
})

const server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log("\nServer has started\n");
});
