const chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const Ryanair = require('./../components/ryanair');

let loggerStub = {
    debug: function() {}
}

const ryanairAirPort = new Ryanair(loggerStub);
let todayString;
let laterDateString;

before(() => {
    let today = new Date();
    todayString = today.getFullYear + "-";
    let month = today.getMonth() >= 10 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
	let day = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
    todayString += month + "-" + day;
    laterDateString = (today.getFullYear + 1) + "-" + month + "-" + day;
})

describe('Ryanair', () => {

    describe('#getCheapestFhares', () => {

        it('should return a json', () => {
            expect(ryanairAirPort.getCheapestFhares("BUD",todayString,laterDateString)).to.eventually.equal("foo");;
        })

    })

})