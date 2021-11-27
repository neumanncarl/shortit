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

  createShortURL(fullURL, req, res, shortURL);
});

// load and count shorted URLs stats
router.get('/api/stats', function (req, res) {
  var getURLs = {
    success: false
  }

  URL.find({}).then(function (allURLs) {

    // count the hits per URL
    var statsShortened = {};
    for (var i = 0; i < allURLs.length; i++) {
      if (statsShortened[allURLs[i].full]) {
        statsShortened[allURLs[i].full]++
      } else {
        statsShortened[allURLs[i].full] = 1;
      }
    }

    // create a sorted list of the URLs with the amount of entries (used for the score board)
    var statsShortenedList = [];
    var mostShortened;
    while (Object.keys(statsShortened).length > 0) {
      mostShortened = Object.keys(statsShortened).reduce(function (a, b) { return statsShortened[a] > statsShortened[b] ? a : b });
      statsShortenedList.push({ url: mostShortened, shortened: statsShortened[mostShortened] });
      delete statsShortened[mostShortened];
    }

    // create list of the shortURLs, sorted by hits
    var statsHitsList = allURLs.sort(function (a, b) { return b.hits - a.hits });

    var data = {
      shortened: statsShortenedList,
      hits: statsHitsList
    }

    // send back the stats
    getURLs.success = true;
    getURLs.data = data;
    return res.send(JSON.stringify(getURLs));
  }).catch(function (err) {
    getURLs.error = 'Oops, something went wrong...';
    return res.send(JSON.stringify(getURLs));
  })
});

module.exports = router;
