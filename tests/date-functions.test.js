const chai = require('chai');
const expect = chai.expect;
const winston = require('winston');
const dateFunctions = require('./../components/date-functions');

describe('dateFunctions', () => {

	describe('#getFormatedDate()', () => {

		it('should return 2012.01.03 date to "yyyy-mm-dd" format', () => {
			let date = new Date(2012, 0, 3);
			let formatedDate = dateFunctions.getFormatedDate(date);
			expect(formatedDate).to.be.eql('2012-01-03');
		});

	});

	describe('#getLaterTime', () => {

		it('should return a date that is 5 days, 5 months and 5 years later than 2012.01.03', () => {
			let date = new Date(2012, 0, 3);
			let laterDate = dateFunctions.getLaterTime(date, 5, 5, 5);
			expect(laterDate.getFullYear()).to.be.eql(date.getFullYear() + 5);
			expect(laterDate.getMonth()).to.be.eql(date.getMonth() + 5);
			expect(laterDate.getDate()).to.be.eql(date.getDate() + 5);
		});

		it('should return 2 days early date if you substitute from 2012.01.03', () => {
			let date = new Date(2012, 0, 3);
			let laterDate = dateFunctions.getLaterTime(date, 0, 0, -2);
			expect(laterDate.getDate()).to.be.eql(date.getDate() - 2);
		})

	});

});