const express = require('express'),
  app = express(),
  history = require('connect-history-api-fallback'),
  mongoose = require('mongoose'),
  dotenv = require('dotenv'),
  bodyParser = require('body-parser');

app.use(history());

dotenv.config();

const index = require("./routes/index");

mongoose.connect(process.env.DB_ENV, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

app.use("/", index);
app.get("*", function (req, res) {
  res.sendFile(__dirname + "/catch.html");
});

const server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log("\nServer has started\n");
});
