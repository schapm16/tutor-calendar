const xlsxPopulate = require('xlsx-populate');
const workBookPromise = require('../getWorkbook');

module.exports = function() {
	return workBookPromise.then(workbook => { 
		let rosterData = workbook.sheet('Roster').usedRange().value().slice(1);
		let logData = workbook.sheet('Log').usedRange().value().slice(1);

		rosterData = rosterData.map(row => {
			row[1] = xlsxPopulate.numberToDate(row[1]);
			return row.slice(0, 5);
		});

		logData = logData.map(row => {
			row[1] = xlsxPopulate.numberToDate(row[1]);
			row[5] = xlsxPopulate.numberToDate(row[5]);
			return row.slice(0, 9);
		});

		return { rosterData, logData };	
	})
}