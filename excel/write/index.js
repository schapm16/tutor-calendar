const workBookPromise = require('../getWorkbook');

module.exports = function(sessionsToWrite) {
	return workBookPromise.then(workbook => { 
		let logSheet = workbook.sheet('Log');
		let currentLastRow = logSheet.usedRange().endCell().row();
		let currentLastRowNumber = currentLastRow.rowNumber();
		
		let numberOfNewRows = sessionsToWrite.length;
		let newStartRowNumber = currentLastRowNumber + 1;
		let newLastRowNumber = newStartRowNumber + numberOfNewRows - 1;

		let writeRange = logSheet.range(newStartRowNumber, 'A', newLastRowNumber, 'M');
		writeRange.value(sessionsToWrite);

		let getCommonStyles = 
			currentLastRow
				.cell('A')
				.style(['fontFamily', 'fontSize', 'fontColor', 'horizontalAlignment', 'border', 'borderColor']);

		writeRange.style(getCommonStyles);
		writeRange.style('fill', 'FFFF00');

		let gradDateRange = logSheet.range(newStartRowNumber, 'B', newLastRowNumber, 'B');
		gradDateRange.style('numberFormat', '[$-en-US]d-mmm-yy;@');

		let sessionDateRange = logSheet.range(newStartRowNumber, 'F', newLastRowNumber, 'F');
		sessionDateRange.style('numberFormat', '[$-en-US]m/d/yy h:mm AM/PM;@');

		let studentEmailRange = logSheet.range(newStartRowNumber, 'D', newLastRowNumber, 'D');
		studentEmailRange.forEach(cell => {
			cell.style({ fontColor: "0563c1", 'fontFamily': 'Calibri', 'fontSize': 11, underline: true }).hyperlink(cell.value());
		})

		workbook.toFileAsync(process.env.FILEPATH)
			.catch(err => { throw new Error('Error during File Write\n' + err)})

	})
}