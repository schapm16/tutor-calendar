module.exports = function(newSessionData, rosterData) {
	
	for (let i = rosterData.length - 1; i >= 0; i--) {
		if (rosterData[i][3] === newSessionData.studentEmail) {
			
			return rosterData[i].slice(0, 5);
		}
	}

	return false;
}