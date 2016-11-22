class DateFunctions {
	getFormatedDate(date) {
	  let year = date.getFullYear()
	  let month = date.getMonth() >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
	  let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
	  return year + "-" + month + "-" + day;
	}
	getLaterTime(currentDate, yearLater, monthLater, dayLater) {
	  let laterDate = new Date();
	  laterDate.setFullYear(currentDate.getFullYear() + yearLater);
	  laterDate.setMonth(currentDate.getMonth() + monthLater);
	  laterDate.setDate(currentDate.getDate() + dayLater);
	  return laterDate;
	}
}

module.exports = new DateFunctions();

