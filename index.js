// declaration and initialization of modules, models and functions
const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      dotenv = require('dotenv'),
      bodyParser = require('body-parser');

// configures dotenv to use env variagbles based on the .env file
dotenv.config();

const index = require("./routes/index");

// connect to the database
mongoose.connect(process.env.DB_ENV, {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));

app.use("/", index);
app.get("*", function (req, res) {
  res.render("catch");
});

// starting the server
const server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log("\nServer has started\n");
});
