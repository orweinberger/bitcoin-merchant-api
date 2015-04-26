var request = require('request');

var price = module.exports;
var localConfig;

price.init = function (config, cb) {
  localConfig = config;
  return cb();
};

price.getPrice = function (amount, currency, cb) {
  var jsonresult;
  currency = currency.toUpperCase();

  // If pricing provider chosen in config
  if (localConfig.pricing.provider) {
    if (localConfig.pricing.provider == "bitpay") {
      request.get("https://bitpay.com/api/rates/" + currency, function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch (x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount / jsonresult.rate).toFixed(6)));
      });
    }

    else if (localConfig.pricing.provider == "coindesk") {
      request.get("https://api.coindesk.com/v1/bpi/currentprice/" + currency + ".json", function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch (x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount / jsonresult.bpi[currency]['rate']).toFixed(6)));
      });
    }

    else if (localConfig.pricing.provider == "coinbase") {
      request.get("https://api.coinbase.com/v1/currencies/exchange_rates", function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch (x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount / jsonresult['btc_to_' + currency.toLowerCase()]).toFixed(6)));
      });
    }

    else if (localConfig.pricing.provider == "bitstamp") {
      if (currency != 'USD')
        return cb(new Error('No support for the requested currency in Bitstamp'));
      request.get("https://www.bitstamp.net/api/ticker/", function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch (x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount / jsonresult.last).toFixed(6)));
      });
    }

    else if (localConfig.pricing.provider == "btc-e") {
      if (currency != 'USD')
        return cb(new Error('No support for the requested currency in Bitstamp'));
      request.get("https://btc-e.com/api/3/ticker/btc_usd", function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch (x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount / jsonresult.btc_usd.last).toFixed(6)));
      });
    }

    else {
      request.get("https://api.bitcoinaverage.com/ticker/" + currency, function (err, head, body) {
        try {
          jsonresult = JSON.parse(body);
        }
        catch (x) {
          return cb(x);
        }
        return cb(err, parseFloat((amount / jsonresult.last).toFixed(6)));
      });
    }
  }

  else {
    request.get("https://api.bitcoinaverage.com/ticker/" + currency, function (err, head, body) {
      try {
        jsonresult = JSON.parse(body);
      }
      catch (x) {
        return cb(x);
      }
      return cb(err, parseFloat((amount / jsonresult.last).toFixed(6)));
    });
  }
};