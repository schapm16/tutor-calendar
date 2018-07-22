const moment = require('moment');

const calendarClient = require('../calendarClient');
const formatData = require('./formatData');

module.exports = function() {

  return calendarClient().then(calendar => {

      let today = moment().toISOString(true);
      let todayPlus7Days = moment().add(7, 'days').toISOString(true);

      return calendar.events.list({
        'calendarId': 'primary',
        'q': 'tutoring',
        'timeMin': today,
        'timeMax': todayPlus7Days,
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime'
      }).then(response => {
          if (response.data.length < 1) throw new Error('Calendar API - No Tutoring Sessions Reported');

          let rawSessionsData = response.data.items;

          return formatData(rawSessionsData);
          
      }).catch(err => { throw new Error('Error making Google Calendar API call\n' + err) })
    }).catch (err => { throw new Error(err) })
}