const express = require('express'),
  router = express.Router(),
  validator = require('validator'),
  URL = require('../models/url');

// check if the given url is a valid url
function checkURL(url) {
  if (typeof url !== 'string' || !validator.isURL(url)) {
    return false;
  }

  return true;
}

// generate a random 7 digit string for the short url
function genShortURL() {
  var text = '';
  var p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 7; i++) {
    text += p.charAt(Math.floor(Math.random() * p.length));
  }

  return text;
}

// create the short url entry in the database
function createShortURL(fullURL, req, res, shortURL) {
  URL.create({ short: genShortURL(), full: fullURL }).then(function (createdURL) {
    var data = {
      short: createdURL.short,
      full: createdURL.full
    }

    shortURL.data = data;
    shortURL.success = true;
    return res.send(JSON.stringify(shortURL));
  }).catch(function (err) {
    if (err.message.includes('E11000 duplicate key error collection')) {
      createShortURL(fullURL, req, res, shortURL);
      return;
    }
    shortURL.error = 'An error occurred. Please try again!';
    return res.send(JSON.stringify(shortURL));
  })
}

// landing page
router.get('/', function (req, res) {
  res.sendFile('/index.html');
});

// create and save a new short url to a given (long) URL
router.post('/api/url', function (req, res) {
  var shortURL = {
    success: false
  }

  if (!req.body || !req.body.fullUrl) {
    shortURL.error = 'No URL given!';
    return res.send(JSON.stringify(shortURL));
  }
  if (!checkURL(req.body.fullUrl)) {
    shortURL.error = 'Given URL is invalid!';
    return res.send(JSON.stringify(shortURL));
  }

  var fullURL = req.body.fullUrl;

  if (!(fullURL.startsWith('http://') || fullURL.startsWith('https://'))) {
    fullURL = 'http://' + fullURL;
  }

  URL.findOneAndUpdate({ full: fullURL }, { $inc: { shortened: 1 } }).then(function (foundURL) {
    if (foundURL !== null) {
      var data = {
        short: foundURL.short,
        full: foundURL.full
      }
      shortURL.data = data;
      shortURL.success = true;
      return res.send(JSON.stringify(shortURL));
    } else {
      createShortURL(fullURL, req, res, shortURL);
    }
  }).catch(function (err) {
    shortURL.error = 'Oops, something went wrong...';
    return res.send(JSON.stringify(shortURL));
  })
});

// load shortUrl stats
router.post('/api/stats', function (req, res) {
  var getURLs = {
    success: false
  }

  URL.find({}).then(function (allURLs) {
    var stats = allURLs.sort(function (a, b) { return b.shortened - a.shortened });

    var data = {
      stats: stats,
    }

    getURLs.success = true;
    getURLs.data = data;
    return res.send(JSON.stringify(getURLs));
  }).catch(function (err) {
    getURLs.error = 'Oops, something went wrong...';
    return res.send(JSON.stringify(getURLs));
  })
});

module.exports = router;
