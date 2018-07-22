const xlsxPopulate = require('xlsx-populate');

module.exports = xlsxPopulate.fromFileAsync(process.env.FILEPATH)
									.catch(err => { throw new Error('Error Reading Excel File\n' + err) });

		