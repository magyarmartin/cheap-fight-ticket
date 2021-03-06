let fetch = require('node-fetch');

class Ryanair {
	constructor(logger) {
		this.logger = logger;
	}
	getCheapestFares(departureAirportIataCode, departureDateFrom, departureDateTo, limit = 1000, maxPriceValue = 9999999) {
	  let queryString = 'https://api.ryanair.com/farefinder/3/oneWayFares?';
	  let departureAirportParameter =  `departureAirportIataCode=${departureAirportIataCode}`;
	  let departureDateFromParameter = `outboundDepartureDateFrom=${departureDateFrom}`;
	  let departureDateToParameter = `outboundDepartureDateTo=${departureDateTo}`;
	  let limitParameter = `limit=${limit}`;
	  let maxPriceValueParameter = `priceValueTo=${maxPriceValue}`;

	  queryString += "&" 
	    + departureAirportParameter
	    + "&language=hu"
	    + "&market=hu-hu"
	    + "&offset=0"
	    + "&" + departureDateFromParameter
	    + "&"+ departureDateToParameter
	    + "&"
	    + limitParameter
	    + "&"
	    + maxPriceValueParameter;

		this.logger.debug('Resquest Url is:',
		{
			requestUrl: queryString
		});

		return new Promise((fulfill, reject) => {
			fetch(queryString)
	    	.then((res) => {
	    		return res.json();
	    	}).then((data) => {
	    		this.logger.debug('Response:', {response: data});
	      		fulfill(data)
	    	}).catch((err) => {
	      		reject(err)
	    	})
		});
	}
	standardize(payload) {
		return new Promise((fulfill, reject) => {
			let standardizedPayload = [];
			let fares = payload.fares;
			fares.map((element) => {
				let standardizedElement = {
					origin: element.outbound.departureAirport.name,
					originCode: element.outbound.departureAirport.iataCode,
					originCountry: element.outbound.departureAirport.countryName,
					destination: element.outbound.arrivalAirport.name,
					destinationCode: element.outbound.arrivalAirport.iataCode,
					destinationCountry: element.outbound.arrivalAirport.countryName,
					departureDate: element.outbound.departureDate,
					arrivalDate: element.outbound.arrivalDate,
					price: element.outbound.price.value
				}
				standardizedPayload.push(standardizedElement);
			})
			fulfill(standardizedPayload);
			reject("An error occured during standardizeing payload");
		})
	}
}

module.exports = Ryanair;