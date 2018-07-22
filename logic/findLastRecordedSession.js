const moment = require('moment');

module.exports = function(newSessionData, logData) {
	
	for (let i = logData.length - 1; i >= 0; i--) {
		if (logData[i][3] === newSessionData.studentEmail) {
			
			return {
				sessionData: logData[i],
				isBefore: moment(logData[i][5]).isBefore(newSessionData.startTime)
			} 
		}
	}
}