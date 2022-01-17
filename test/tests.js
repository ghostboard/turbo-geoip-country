var geoip = require('../lib/geoip');

module.exports = {
	testLookup: function (test) {
		test.expect(3);

		var ip = '8.8.4.4';
		var ipv6 = '2001:4860:b002::68';
		var country = geoip.getCountry(ip);

		test.strictEqual(country, 'US', "should match country");
		test.ok(country, 'should return data about IPv4.');
		test.ok(geoip.getCountry(ipv6), 'should return data about IPv6.');

		test.done();
	},

	testDataIP4: function (test) {
		test.expect(1);

		test.strictEqual(geoip.getCountry('72.229.28.185'), 'US', "should match country");

		test.done();
	},

	testDataIP6: function (test) {
		test.expect(1);

		test.strictEqual(geoip.getCountry('2001:1c04:400::1'), 'NL', "should match country");

		test.done();
	},

	testUpdatedIps: function (test) {
		test.expect(2);

		test.strictEqual(geoip.getCountry('193.37.32.0'), 'SG', "should match country");
		test.strictEqual(geoip.getCountry('45.183.209.0'), 'BR', "should match country");

		test.done();
	}
};
