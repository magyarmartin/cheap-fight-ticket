let fetch = require('node-fetch');

class Ryanair {
	constructor(logger) {
		this.logger = logger;
	}
	getCheapestFhares(departureAirportIataCode, departureDateFrom, departureDateTo, limit = 1000, maxPriceValue = 9999999) {
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
	      fulfill(data)
	    }).catch((err) => {
	      reject(err)
	    })
		})
	  
	}
}

module.exports = Ryanair;