'use strict';

let fetch = require('node-fetch');
let dateFunctions = require('./components/date-functions');

let priceLimit = 3000;

let today = new Date();



let fourMonthLater = dateFunctions.getLaterTime(today, 0, 1, 0);

function getCheapestFhares(departureAirportIataCode, limit, departureDateFrom, departureDateTo, maxPriceValue) {
  let queryString = 'https://api.ryanair.com/farefinder/3/oneWayFares?';
  let departureAirportParameter = departureAirportIataCode != NULL
}

fetch(`https://api.ryanair.com/farefinder/3/oneWayFares?&departureAirportIataCode=BUD&language=hu&limit=16&market=hu-hu&offset=0&outboundDepartureDateFrom=2016-10-11&outboundDepartureDateTo=2017-10-28&priceValueTo=${priceLimit}`)
    .then(function(res) {
      return res.json();
    }).then((data) => {
      let newData = data.fares.map((fahre) => {
        return {
          airportName: fahre.outbound.arrivalAirport.name,
          price: fahre.outbound.price.value
        }
      })
      console.log(newData)
    });