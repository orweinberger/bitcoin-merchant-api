var express = require('express');
var router = express.Router();
var bitcoin = require('../lib/bitcoin');
var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./config/default.yml', 'utf8'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/balance', function (req, res) {
  bitcoin.init(config.bitcoin, function (err) {
    if (err) return res.sendStatus(500);
    bitcoin.getTotalBalance(function (err, result) {
      return res.json({balance: result});
    });
  });
});

router.get('/generate/address', function (req, res) {
  bitcoin.init(config.bitcoin, function (err) {
    if (err) return res.sendStatus(500);
    bitcoin.generateNewAddress(1234,function (err, address) {
      if (err) return res.sendStatus(500);
      return res.json({address: address});
    });
  });
});

//Get new address
//Check balance for address
//Check balance for userid, what if more than one address was generated for this user?
//Get total balance

module.exports = router;
