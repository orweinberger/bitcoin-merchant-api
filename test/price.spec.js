var prices = require('../lib/prices');
var yaml = require('js-yaml');
var fs = require('fs');
var assert = require('assert');
var config = yaml.safeLoad(fs.readFileSync('./config/default.yml', 'utf8'));


describe("lib/prices", function () {
  it("should get the USD price from BitPay", function (done) {
    config.pricing.provider = 'bitpay';
    prices.init(config, function () {
      prices.getPrice(100, 'USD', function (err, result) {
        if (err) return done(err);
        if (isNaN(parseFloat(result)))
          return done(new Error('got NaN'));
        return done();
      });
    });
  });

  it("should get the USD price from Coindesk", function (done) {
    config.pricing.provider = 'coindesk';
    prices.init(config, function () {
      prices.getPrice(100, 'USD', function (err, result) {
        if (err) return done(err);
        if (isNaN(parseFloat(result)))
          return done(new Error('got NaN'));
        return done();
      });
    });
  });

  it("should get the USD price from BitcoinAverage", function (done) {
    config.pricing.provider = 'bitcoinaverage';
    prices.init(config, function () {
      prices.getPrice(100, 'USD', function (err, result) {
        if (err) return done(err);
        if (isNaN(parseFloat(result)))
          return done(new Error('got NaN'));
        return done();
      });
    });
  });

  it("should get the USD price from Bitstamp", function (done) {
    config.pricing.provider = 'bitstamp';
    prices.init(config, function () {
      prices.getPrice(100, 'USD', function (err, result) {
        if (err) return done(err);
        if (isNaN(parseFloat(result)))
          return done(new Error('got NaN'));
        return done();
      });
    });
  });

  it("should get the USD price from BTC-E", function (done) {
    config.pricing.provider = 'btc-e';
    prices.init(config, function () {
      prices.getPrice(100, 'USD', function (err, result) {
        if (err) return done(err);
        if (isNaN(parseFloat(result)))
          return done(new Error('got NaN'));
        return done();
      });
    });
  });

  it("should get the USD price even if provider config is empty", function (done) {
    config.pricing.provider = '';
    prices.init(config, function () {
      prices.getPrice(100, 'USD', function (err, result) {
        if (err) return done(err);
        if (isNaN(parseFloat(result)))
          return done(new Error('got NaN'));
        return done();
      });
    });
  });
});