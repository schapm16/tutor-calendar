module.exports = function(newSessionData, logData) {
	
	for (let i = logData.length - 1; i >= 0; i--) {
		if (logData[i][3] === newSessionData.studentEmail) {
			
			return logData[i]
		}
	}
}