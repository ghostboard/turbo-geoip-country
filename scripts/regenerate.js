const fs = require('fs');
const csv = require('csv-parser');
const { Address4, Address6 } = require('ip-address');
const utils = require('../lib/utils');

function loadCountryCodes(inputFile) {
	return new Promise((resolve, reject) => {
		const countryCodes = {};
		fs.createReadStream(inputFile)
			.pipe(csv())
			.on('data', (row) => {
				countryCodes[row.geoname_id] = row.country_iso_code;
			})
			.on('end', () => {
				resolve(countryCodes);
			})
			.on('error', (error) => {
				reject(error);
			});
	});
}

// function writeIPv6ToBuffer(buffer, ip, offset) {
// 	const parts = ip.match(/.{1,16}/g).map(part => parseInt(part, 16));
// 	parts.forEach((part, index) => {
// 		buffer.writeUInt16BE(part, offset + index * 2);
// 	});
// }

function writeCountryData(inputFile, outputFile, countryCodes) {
	return new Promise((resolve, reject) => {
		const datFile = fs.openSync(outputFile, 'w');

		fs.createReadStream(inputFile)
			.pipe(csv())
			.on('data', (row) => {
				try {
					const isIpV6 = row.network.includes(':');
					const ip = isIpV6 ? new Address6(row.network) : new Address4(row.network);
					const geonameId = row.registered_country_geoname_id;
					const country = countryCodes[geonameId];
					const proceed = country && ip;
					if (proceed) {
						let bsz;
						let sip;
						let eip;
						let b;
						if (isIpV6) {
							// IPv6
							bsz = 34;
							sip = utils.aton6(ip.startAddress().correctForm());
							eip = utils.aton6(ip.endAddress().correctForm());
							b = Buffer.alloc(bsz);
							for (let i = 0; i < sip.length; i++) {
								b.writeUInt32BE(sip[i], i * 4);
							}
							for (let i = 0; i < eip.length; i++) {
								b.writeUInt32BE(eip[i], 16 + (i * 4));
							}
						} else {
							// IPv4
							bsz = 10;
							sip = parseInt(ip.startAddress().bigInteger(), 10);
							eip = parseInt(ip.endAddress().bigInteger(), 10);
							b = Buffer.alloc(bsz);
							b.fill(0);
							b.writeUInt32BE(sip, 0);
							b.writeUInt32BE(eip, 4);
						}
						b.write(country, bsz - 2);
						fs.writeSync(datFile, b, 0, bsz, null);
					}
				} catch (e) {
					console.error('Error: ', e, row);
					reject(e);
				}
			})
			.on('end', () => {
				fs.closeSync(datFile);
				console.log(`Data written to ${outputFile}`);
				resolve();
			})
			.on('error', (e) => {
				reject(e);
			});
	});
}

async function execute() {
	try {
		const start = Date.now();
		console.log('Loading the country codes...');
		const countryCodes = await loadCountryCodes('input/GeoLite2-Country-Locations-en.csv');
		console.log('Processing IPv4 data...');
		await writeCountryData('input/GeoLite2-Country-Blocks-IPv4.csv', 'data/geoip-country.dat', countryCodes);
		console.log('Processing IPv6 data...');
		await writeCountryData('input/GeoLite2-Country-Blocks-IPv6.csv', 'data/geoip-country6.dat', countryCodes);
		console.log(`Done in ${(Date.now()-start)/1000}seconds`);
		process.exit(0);
	} catch (error) {
		console.error('Error:', error);
	}
}

execute().then();