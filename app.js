const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    URL = require('./models/url');

mongoose.connect(process.env.DB_ENV, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

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
app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

// create and save a new short url to a given (long) URL
app.post('/', function (req, res) {
    var shortURL = {
        success: false
    }

    if (!req.body || !req.body.fullUrl || typeof req.body.fullUrl !== 'string') {
        shortURL.error = 'No URL given!';
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
app.get('/stats', function (req, res) {
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

// redirect a shortUrl to the actual url
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
