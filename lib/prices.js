var request = require('request');
var price = module.exports;
var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./config/default.yml', 'utf8'));

exports.getPrice = function (amount, currency, cb) {
  var jsonresult;
  currency = currency.toUpperCase();

  // If pricing provider chosen in config
  if (config.pricing.provider) {
    if (config.pricing.provider == "bitpay") {
      request.get("https://bitpay.com/api/rates/" + currency, function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch(x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount/jsonresult.rate).toFixed(6)));
      });
    }

    if (config.pricing.provider == "coindesk") {
      request.get("https://api.coindesk.com/v1/bpi/currentprice/" + currency + ".json", function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch(x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount/jsonresult.bpi[currency]['rate']).toFixed(6)));
      });
    }

    if (config.pricing.provider == "coinbase") {
      request.get("https://api.coinbase.com/v1/currencies/exchange_rates", function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch(x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount/jsonresult['btc_to_' + currency.toLowerCase()]).toFixed(6)));
      });
    }

    else {
      request.get("https://api.bitcoinaverage.com/ticker/" + currency, function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch(x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount/jsonresult.last).toFixed(6)));
      });
    }
  }

  else {
    request.get("https://api.bitcoinaverage.com/ticker/" + currency, function (err, head, body) {
      try {
        jsonresult = JSON.parse(body);
      }
      catch(x) {
        return cb(x);
      }
      return cb(err, parseFloat((amount/jsonresult.last).toFixed(6)));
    });
  }
};