var bitcoin = require('../lib/bitcoin'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  assert = require('assert')
var config = yaml.safeLoad(fs.readFileSync('./config/default.yml', 'utf8'));

describe("lib/bitcoin", function () {
  var paymentAddress;
  before(function (done) {
    if (process.env.BITCOIN_RPC_USERNAME)
      config.bitcoin.username = process.env.BITCOIN_RPC_USERNAME;
    if (process.env.BITCOIN_RPC_PASSWORD)
      config.bitcoin.password = process.env.BITCOIN_RPC_PASSWORD;
    bitcoin.init(config, function (err) {
      if (err) return done(err);
      return done();
    });
  });
  it("should generate a new payment request", function (done) {
    bitcoin.generatePaymentRequest(100, 'USD', function (err, result) {
      if (err) return done(err);
      assert.equal(100, result.amount);
      assert.equal('USD', result.currency);
      assert.equal(true, bitcoin.isAddress(result.address));
      if (isNaN(parseFloat(result.total)))
        return done(new Error('got NaN'));
      paymentAddress = result.address;
      return done();
    });
  });
  it("should fail when passing a stringed amount", function (done) {
    bitcoin.generatePaymentRequest('a', 'USD', function (err) {
      if (err) return done();
      else return done(new Error('Payment request generated with incorrect amount parameter'));
    });
  });

  it("should get payment information from leveldb", function (done) {
    bitcoin.getPaymentDetails(paymentAddress, function (err, result) {
      if (err) return done(err);
      assert.equal(100, result.amount);
      done();
    });
  });
});