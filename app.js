var express = require('express');
path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('./routes/index');

var app = express();

var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./config/default.yml', 'utf8'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (config.general.token && req.query.token && req.query.token == config.general.token)
    next();
  else if (!config.general.token)
    next();
  else
    res.status(401).end();
});

app.use('/', routes);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    //res.status(err.status || 500);
    res.status(err.status || 500).end()
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500).end()
});

app.listen(config.general.port, config.general.bind, function () {
  console.log('Bitcoin Merchant API listening on port ' + config.general.port);
  if (config.general.bind === '0.0.0.0')
    console.log('WARNING: API Server bound to 0.0.0.0');
  if (!config.general.token)
    console.log('WARNING: No token defined');
});

module.exports = app;
