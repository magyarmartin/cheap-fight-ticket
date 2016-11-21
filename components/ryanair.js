let fetch = require('node-fetch');

module.exports = {
	getCheapestFhares: function(departureAirportIataCode, departureDateFrom, departureDateTo, limit, maxPriceValue) {
	  let queryString = 'https://api.ryanair.com/farefinder/3/oneWayFares?';
	  let departureAirportParameter;
	  let departureDateFromParameter;
	  let departureDateToParameter;
	  let limitParameter = limit == null ? "" : `limit=${limit}`;
	  let maxPriceValueParameter = maxPriceValue == null ? "" : `priceValueTo=${maxPriceValue}`;

	  if(departureAirportIataCode != null) {
	    departureAirportParameter =  `departureAirportIataCode=${departureAirportIataCode}`;
	  } else {
	    throw "Departure airport iata code is required";
	  }
	  if(departureDateFrom != null) {
	    departureDateFromParameter = `outboundDepartureDateFrom=${departureDateFrom}`;
	  } else {
	    throw "departureDateFrom is required";
	  }
	  if(departureDateTo != null) {
	    departureDateToParameter = `outboundDepartureDateTo=${departureDateTo}`;
	  } else {
	    throw "departureDateTo is required";
	  }
	  queryString += "&" 
	    + departureAirportParameter
	    + "&language=hu"
	    + "&market=hu-hu"
	    + "&offset=0"
	    + "&" + departureDateFromParameter
	    + "&"+ departureDateToParameter
	    //+ "&"
	    //+ limitParameter
	    //+ "&"
	    //+ maxPriceValueParameter;

	    console.log(queryString);

	  fetch(queryString)
	    .then((res) => {
	      return res.json();
	    }).then((data) => {
	      console.log(data)
	    }).catch((err) => {
	      console.log(err);
	    })
	}
}