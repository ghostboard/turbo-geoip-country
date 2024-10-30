# turbo-geoip-country

This is an updated, performance-focused fork of [node-geoip](https://github.com/geoip-lite/node-geoip) with only country data. Inspired by [geoip-ultralight](https://github.com/danielstjules/geoip-ultralight)

This product uses GeoLite data created by MaxMind, available from [https://www.maxmind.com/](https://www.maxmind.com/)

💡 You would need to create an account and get a license key to update data by yourself

[![Build Status](https://travis-ci.com/ghostboard/turbo-geoip-country.svg?branch=master "turbo-geoip-country on Travis")](https://app.travis-ci.com/github/ghostboard/turbo-geoip-country)

## How to install 🎁

```bash
npm install turbo-geoip-country --save
```
## How to use it 🤖

```javascript
const turboGeoip = require('turbo-geoip-country');

const ip = "207.97.227.239";
const country = turboGeoip.getCountry(ip);
console.log(country);
'US'

// Also it works with anonymized ip
const ip = "207.97.227.0";
const country = turboGeoip.getCountry(ip);
console.log(country);
'US'
```

## Why `turbo-geoip-country` ⚡️

- 🚀 Get country code (2 letter ISO-3166-1) by IP v4/v6
- 🔒 Works also with anonymized IP
- 🔥 Performance focused (see the section below)
- ✅ Less than 19 MB memory footprint (instead of +110 MB of node-geoip)
- ⏰ Data updated on 30th October 2024
- 📅 Using [Calendar versioning](https://calver.org/)
- 🌐 Production-ready, used by [Ghostboard.io](https://ghostboard.io)
- ⚡️ Dependencies updated and 5 of them removed
- 🤓 Code reduced

## Performance 🔥

💡 Based on the average performance of 10 executions of each package on a 2018 Mac Mini i7 6c12t 16GB

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

## How to update the data 🔑

- Log in into your MaxMind account
  - 💡 You can create a MaxMind account [here](https://www.maxmind.com/en/geolite2/signup)
- Go to "GeoIP 2 / GeoLite 2" > Downloads
- Download the "GeoLite2 Country: CSV Format" zip
- Unzip and put the files into the input folder
- Run `npm run regenerate`
  - 💡 This takes about 1 minute or less

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

- [Documentation from MaxMind](http://www.maxmind.com/app/iso3166)
- [ISO 3166 (1 & 2) codes](http://en.wikipedia.org/wiki/ISO_3166)
- [FIPS region codes](http://en.wikipedia.org/wiki/List_of_FIPS_region_codes)

## Copyright

`geoip-lite` is Copyright 2011-2018 Philip Tellis <philip@bluesmoon.info> and the latest version of the code is
available at https://github.com/bluesmoon/node-geoip

## License

There are two licenses for the code and data.  See the [LICENSE](https://github.com/bluesmoon/node-geoip/blob/master/LICENSE) file for details.
