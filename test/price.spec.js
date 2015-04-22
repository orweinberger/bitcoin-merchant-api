var prices = require('../lib/prices');
describe("lib/prices", function () {
  it("should get the USD price from BitcoinAverage", function (done) {
    prices.bitcoinaverage(100, 'USD', function (err, result) {
      if (err) return done(err);
      if (isNaN(parseFloat(result)))
        done('Got NaN');
      done();
    });
  });
});