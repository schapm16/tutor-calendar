function extractStudentEmail(rawSessionData) {
	let attendees = rawSessionData.attendees;

	if (attendees) {
		let studentEmail;
		attendees.forEach(attendee => {
			if (attendee.email !== process.env.MYEMAIL) {
				studentEmail = attendee.email;
			}
		})
		return studentEmail
	}

	return 'No Email'
}

module.exports = function(rawSessionsData) {

	let relevantSessionsData = rawSessionsData.map(session => {
		let studentEmail = extractStudentEmail(session);
		let startTime = session.start.dateTime;

		return {studentEmail, startTime}
	})

  return relevantSessionsData;
}