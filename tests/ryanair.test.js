const chai = require('chai');
const should = chai.should();
const Ryanair = require('./../components/ryanair');

let loggerStub = {
    debug: function() {}
}

const ryanairAirPort = new Ryanair(loggerStub);
let todayString;
let laterDateString;
let dummyResponse;

before(() => {
    let today = new Date();
    todayString = today.getFullYear() + "-";
    let month = today.getMonth() >= 10 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
	let day = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
    todayString += month + "-" + day;
    laterDateString = (today.getFullYear() + 1) + "-" + month + "-" + day;
    dummyResponse = {
      "total": 20,
      "fares": [
        {
          "outbound": {
            "departureAirport": {
              "iataCode": "BUD",
              "name": "Budapest",
              "seoName": "budapest",
              "countryName": "Magyarország"
            },
            "arrivalAirport": {
              "iataCode": "CRL",
              "name": "Brüsszel Charleroi",
              "seoName": "brussels-charleroi",
              "countryName": "Belgium"
            },
            "departureDate": "2016-12-07T06:40:00",
            "arrivalDate": "2016-12-07T08:50:00",
            "price": {
              "value": 2459,
              "valueMainUnit": "2459",
              "valueFractionalUnit": "00",
              "currencyCode": "HUF",
              "currencySymbol": "Ft"
            }
          },
          "summary": {
            "price": {
              "value": 2459,
              "valueMainUnit": "2459",
              "valueFractionalUnit": "00",
              "currencyCode": "HUF",
              "currencySymbol": "Ft"
            },
            "newRoute": false
          }
        }],
      "arrivalAirportCategories": null,
      "size": 20
    }

});

describe('Ryanair', () => {

    describe('#getCheapestFares', () => {

        it('should return a object', () => {
            return ryanairAirPort.getCheapestFares("BUD",todayString,laterDateString).then((data) => {
                data.should.be.a("Object");
            })
        })

        it('should have property \'fares\'', () => {
            return ryanairAirPort.getCheapestFares("BUD",todayString,laterDateString).then((data) => {
                data.should.have.property("fares");
            })
        })

    })

    describe('#standardize', () => {
        
        it('should be and array', () => {
            return ryanairAirPort.standardize(dummyResponse).then((data) => {
                data.should.be.a("Array");
            })
        });

        it('each array element should have the following properties: origin, originCode, originCountry, ' +
         'destination, destinationCode, destinationCountry, departureDate, arrivalDate, price', () => {
            return ryanairAirPort.standardize(dummyResponse).then((data) => {
                let element = data[0];
                element.should.have.property("origin");
                element.should.have.property("originCode");
                element.should.have.property("originCountry");
                element.should.have.property("destination");
                element.should.have.property("destinationCode");
                element.should.have.property("destinationCountry");
                element.should.have.property("departureDate");
                element.should.have.property("arrivalDate");
                element.should.have.property("price");
            })
        });

    });

})