# turbo-geoip-country

This is an updated, performance-focused fork of [node-geoip](https://github.com/geoip-lite/node-geoip) with only country data. Inspired by [danielstjules/geoip-ultralight](https://github.com/danielstjules/geoip-ultralight)

This product uses GeoLite data created by MaxMind, available from http://maxmind.com/
You would need to create an account and get a license key to update by yourself

[![Build Status](https://travis-ci.org/bluesmoon/node-geoip.svg?branch=master "node-geoip on Travis")](https://travis-ci.org/bluesmoon/node-geoip)

## Why `turbo-geoip-country` ⚡️

- 🚀 Get country code (2 letter ISO-3166-1) by IP v4/v6
- 🔥 Performance focused (see the section below)
- ✅ Around 25 MB memory footprint (instead of +110 MB of node-geoip)
- ⚡️ Updated dependencies and 1 removed
- 🤓 Code reduced and deprecations updated
- ⏰ Data updated at 1st September 2021

## Performance 🔥

💡 Based on the best performance of 10 executions of each package on a 2018 Mac Mini i7 6c12t 16GB

| Metric | node-geoip | turbo-geoip-country | delta  |
| ------- | ------- | ------- | ------- |
| Startup time | 47 ms | 17 ms | 63.83 % faster |
| Time to find 1 ip | 7 μs/ip | 4 μs/ip | 42.86 % faster |
| IP lookups per second | 139534.884 ip/s | 250000.000 ip/s | 44.19 % more ip/s |


Test yourself `node test/performance.js`

```bash
Found 30000 (17030/12970) ips in 120ms (250000.000 ip/s) (4μs/ip)
Took 17 ms to startup
```

vs [node-geoip](https://github.com/geoip-lite/node-geoip) `node test/geo-lookup.js`

```bash
Found 30000 (16917/13083) ips in 215ms (139534.884 ip/s) (7μs/ip)
Took 47 ms to startup
```

## How to install 🎁

```bash
npm install turbo-geoip-country --save
```
## How to use it 🤖

```javascript
var turboGeoip = require('turbo-geoip-country');

var ip = "207.97.227.239";
var country = turboGeoip.getCountry(ip);

console.log(country);
'US'

```

## How to update the data 🔑

Run `cd node_modules/turbo-geoip-country && npm run-script updatedb license_key=YOUR_LICENSE_KEY`

👉 Replace `YOUR_LICENSE_KEY` with your license key obtained from [maxmind.com](https://support.maxmind.com/account-faq/account-related/how-do-i-generate-a-license-key/). You can create a maxmind account [here](https://www.maxmind.com/en/geolite2/signup)

💡 This takes about 1 minute

## Tests ✅

Run `npm t`

```bash
> nodeunit test/tests.js


tests.js
✔ testLookup
✔ testDataIP4
✔ testDataIP6
✔ testUpdatedIps

OK: 7 assertions (19ms)
```

## References

  - <a href="http://www.maxmind.com/app/iso3166">Documentation from MaxMind</a>
  - <a href="http://en.wikipedia.org/wiki/ISO_3166">ISO 3166 (1 & 2) codes</a>
  - <a href="http://en.wikipedia.org/wiki/List_of_FIPS_region_codes">FIPS region codes</a>

## Copyright

`geoip-lite` is Copyright 2011-2018 Philip Tellis <philip@bluesmoon.info> and the latest version of the code is
available at https://github.com/bluesmoon/node-geoip

## License

There are two licenses for the code and data.  See the [LICENSE](https://github.com/bluesmoon/node-geoip/blob/master/LICENSE) file for details.
