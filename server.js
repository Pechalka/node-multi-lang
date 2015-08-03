var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser')


var i18n = require('./i18n');

var app = express();

var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views' });
app.engine('.html', ectRenderer.render);
app.set('view engine', 'html');

app.use(cookieParser());

app.use(i18n);


app.get('/', function (req, res) {
	res.render('index', {})
});


app.get('/price', function (req, res) {
	res.render('price', {})
});

app.get('/about', function (req, res) {
	res.render('about', {})
});

app.get("/i18n/:locale", function (req, res) {
  	res.cookie('lang', req.params.locale, { maxAge: 900000, httpOnly: true });

    res.redirect('back');
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function () {
	console.log('app listening at http://%s:%s', 'localhost', 3000);
});