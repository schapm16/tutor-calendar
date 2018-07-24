require('dotenv').config();

const calendarAPI = require('./calendarAPI');
const excel = require('./excel');
const { findLastRecordedSession, hasUniqueStartTime, findOnRoster } = require('./logic');

Promise.all([calendarAPI(), excel.read()])
	.then(([calendarData, { logData, rosterData }]) => {
		let sessionsToWrite = [];
		calendarData.forEach(newSessionOnCalendar => {
			let newSession = [];
			
			if (hasUniqueStartTime(newSessionOnCalendar, logData)) {
				let lastRecordedSession = findLastRecordedSession(newSessionOnCalendar, logData);
				
				if (lastRecordedSession) {
					newSession = lastRecordedSession.map((column, index) => {
						if (index === 5) return new Date(newSessionOnCalendar.startTime);
						else return column;
					})
					newSession = newSession.slice(0, 7);
					sessionsToWrite.push(newSession);
				}

				else {
					let rosterEntry = findOnRoster(newSessionOnCalendar, rosterData);

					if (newSessionOnCalendar.studentEmail === 'No Email' || !rosterEntry) {
						newSession[5] = new Date(newSessionOnCalendar.startTime);
						newSession.fill('*', 0, 5);
						sessionsToWrite.push(newSession);
					}

					else if (rosterEntry) {
						newSession = rosterEntry;
						newSession[5] = new Date(newSessionOnCalendar.startTime);
						sessionsToWrite.push(newSession);
					} 

					else {
						console.log('The following session was not imported ' + newSessionOnCalendar.startTime);
					}
				}
			}
		});
		
		if (sessionsToWrite.length < 1) return console.log('Spreadsheet Already Up To Date!');

		excel.write(sessionsToWrite)
			.then(() => console.log('Spreadsheet Updated Successfully!'))
			.catch(err => { throw new Error('Spreadsheet not updated!\n' + err)})
	})
	.catch(err => console.log(err));


