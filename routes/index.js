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

router.get('/payment/generate/:currency/:amount', function (req, res) {
  var currency = req.params.currency;
  var amount = parseFloat(req.params.amount);
  bitcoin.init(config.bitcoin, function (err) {
    if (err) return res.sendStatus(500);
    bitcoin.generatePaymentRequest(amount, currency, function (err, result) {
      if (err) return res.sendStatus(500);
      return res.json(result);
    });
  });
});

router.get('/payment/verify/:address', function (req, res) {
  var address = req.params.address;
  bitcoin.init(config.bitcoin, function (err) {
    if (err) return res.sendStatus(500);
    bitcoin.verifyPayment(address, function (err, result) {
      if (err) return res.sendStatus(500);
      return res.json(result);
    });
  });
});

router.get('/payment/secure/:address', function (req, res) {
  var address = req.params.address;
  bitcoin.init(config.bitcoin, function (err) {
    if (err) return res.sendStatus(500);
    bitcoin.securePayment(address, function (err, result) {
      if (err) return res.sendStatus(500);
      return res.json(result);
    });
  });
});

router.get('/payment/details/:address', function (req, res) {
  var address = req.params.address;
  bitcoin.init(config.bitcoin, function (err) {
    if (err) return res.sendStatus(500);
    bitcoin.getPaymentDetails(address, function (err, result) {
      if (err) return res.sendStatus(500);
      return res.json(result);
    });
  });
});

//Get new address
//Check balance for address
//Check balance for userid, what if more than one address was generated for this user?
//Get total balance

module.exports = router;
