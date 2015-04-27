var bitcoin = require('../lib/bitcoin'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  assert = require('assert'),
  request = require('request');
var config = yaml.safeLoad(fs.readFileSync('./config/default.yml', 'utf8'));

describe("security", function () {
  var app = require('../app');
  it("should fail to generate a payment request without a valid token", function (done) {
    request.get('http://' + config.general.bind + ':' + config.general.port + '/payment/generate/USD/10?token=1', function (err, head, body) {
      assert.equal(401, head.statusCode);
      done();
    });
  });

  it("should fail to generate a payment request without any token defined", function (done) {
    request.get('http://' + config.general.bind + ':' + config.general.port + '/payment/generate/USD/10', function (err, head, body) {
      assert.equal(401, head.statusCode);
      done();
    });
  });
  
  it("should be able to generate a payment request with a valid token", function (done) {
    request.get('http://' + config.general.bind + ':' + config.general.port + '/payment/generate/USD/10?token=' + config.general.token, function (err, head, body) {
      assert.equal(200, head.statusCode);
      done();
    });
  });
});