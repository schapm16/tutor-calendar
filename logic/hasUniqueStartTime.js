const moment = require('moment');

module.exports = function(newSessionData, logData) {
	
	for (let i = logData.length - 1; i >= 0; i--) {
		if (moment(logData[i][5]).isSame(newSessionData.startTime)) {
			return false;
		}
		else if(moment(logData[i][5]).isBefore(moment())) {
			return true;
		}
	}

	return true;
}