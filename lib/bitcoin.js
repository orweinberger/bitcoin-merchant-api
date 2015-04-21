var bitcoind = require('bitcoin');
var bitcoin = module.exports;
var levelup = require('levelup')
var db = levelup('./db');

bitcoin.init = function (config, cb) {
  bitcoin.client = new bitcoind.Client({
    host: config.host,
    port: config.port,
    user: config.username,
    pass: config.password,
    timeout: 5000
  });
  bitcoin.client.getBalance('*', 6, function (err) {
    if (err) return cb(err);
    return cb();
  });
};

bitcoin.getTotalBalance = function (cb) {
  bitcoin.client.getBalance('*', 6, function (err, result) {
    if (err) return cb(err);
    return cb(null, result);
  })
};

bitcoin.generateNewAddress = function (userid, cb) {
  if (!userid)
    var userid = 123456;
  bitcoin.client.getNewAddress('', function (err, result) {
    if (err) return cb(err);
    db.put(userid, '{"test": "aaa"}', function (err) {
      if (err) return cb(err);
      db.get(userid, function (err, value) {
        if (err) return cb(err);
        return cb(null, JSON.parse(value));
      });
    });
    //return cb(null, result);
  })
};