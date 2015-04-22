var request = require('request');
var price = module.exports;

exports.bitcoinaverage = function (amount, currency, cb) {
  var jsonresult;
  request.get("https://api.bitcoinaverage.com/ticker/" + currency.toUpperCase(), function (err, head, body) {
    try {
      jsonresult = JSON.parse(body);
    }
    catch(x) {
      return cb(x);
    }
    return cb(err, parseFloat((amount/jsonresult.last).toFixed(6)));
  });
};