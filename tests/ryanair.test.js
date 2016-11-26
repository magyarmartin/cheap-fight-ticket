const chai = require('chai');
const should = chai.should();
const Ryanair = require('./../components/ryanair');

let loggerStub = {
    debug: function() {}
}

const ryanairAirPort = new Ryanair(loggerStub);
let todayString;
let laterDateString;

before(() => {
    let today = new Date();
    todayString = today.getFullYear() + "-";
    let month = today.getMonth() >= 10 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
	let day = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
    todayString += month + "-" + day;
    laterDateString = (today.getFullYear() + 1) + "-" + month + "-" + day;
})

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

})