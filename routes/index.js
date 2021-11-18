const express = require('express'),
      router  = express.Router(),
      ejs = require('ejs'),
      validator = require('validator'),
      URL = require('../models/url');

// checks if the given url is a valid url
function checkURL(url) {
  if (typeof url !== 'string' || !validator.isURL(url))
    return false;

  return true;
}

// generates a random 7 digit string for the short url
function genShortURL() {
  var text = '';
  var p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 7; i++)
    text += p.charAt(Math.floor(Math.random() * p.length));

  return text;
}

// creates the short url entry in the database
function createShortURL(req, res, shortURL) {
  URL.create({short: genShortURL(), full: req.body.url}).then(function (createdURL) {
    var data = {
      short: createdURL.short,
      full: createdURL.full
    }

    shortURL.data = data;
    shortURL.success = true;
    return res.send(JSON.stringify(shortURL));
  }).catch(function (err) {
    if (err.message.includes('E11000 duplicate key error collection')) {
      createShortURL(req, res, shortURL);
      return;
    }
    shortURL.error = 'An error occurred. Please try again!';
    return res.send(JSON.stringify(shortURL));
  })
}

// landing page
router.get('/', function (req, res) {
  res.render('home/index');
});

// creates and saves a new short url to a given (long) url
router.post('/', function (req, res) {
  var shortURL = {
    success: false
  }

  if (!req.body || !req.body.url) {
    shortURL.error = 'No URL given!';
    return res.send(JSON.stringify(shortURL));
  }
  if (!checkURL(req.body.url)) {
    shortURL.error = 'Given URL is invalid!';
    return res.send(JSON.stringify(shortURL));
  }

  createShortURL(req, res, shortURL);
});

// loads and counts shorted URLs
router.get('/stats', function (req, res) {
  var getURLs = {
    success: false
  }

  URL.find({}).then(function (allURLs) {

    // counts the hits per URL
    var statsShortened = {};
    for (var i = 0; i < allURLs.length; i++) {
      if (statsShortened[allURLs[i].full]) {
        statsShortened[allURLs[i].full]++
      } else {
        statsShortened[allURLs[i].full] = 1;
      }
    }

    // creates a sorted list of the URLs with the amount of entries (used for the score board)
    var statsShortenedList = [];
    var mostShortened;
    while (Object.keys(statsShortened).length > 0) {
      mostShortened = Object.keys(statsShortened).reduce(function(a, b){ return statsShortened[a] > statsShortened[b] ? a : b });
      statsShortenedList.push({url: mostShortened, shortened: statsShortened[mostShortened]});
      delete statsShortened[mostShortened];
    }

    // creates list of the shortURLs, sorted by hits
    var statsHitsList = allURLs.sort(function(a, b){return b.hits - a.hits});

    var data = {
      shortened: statsShortenedList,
      hits: statsHitsList
    }

    getURLs.success = true;
    getURLs.data = data;
    return res.send(JSON.stringify(getURLs));
  }).catch(function (err) {
    getURLs.error = 'Oops, something went wrong...';
    return res.send(JSON.stringify(getURLs));
  })
});

router.get('/:id', function (req, res) {
  if (req.params.id.length !== 7) {
    return;
  }
  URL.findOneAndUpdate(req.params.id, {$inc: {hits: 1}}).then(function (foundURL) {
    if ((foundURL.full.length >= 7 && foundURL.full.substring(0,7) !== 'http://') || foundURL.full.length < 7) {
      res.redirect('http://' + foundURL.full);
    } else {
      res.redirect(foundURL.full);
    }
  }).catch(function (err) {
    res.render('catch');
  })
})

module.exports = router;
