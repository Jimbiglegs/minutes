import moment from 'moment';

export default class Utils {

    static isEmpty(obj) {
        if(!obj || obj === null) {
            return true;
        }

        if(Array.isArray(obj) && obj.length === 0) {
            return true;
        }

        if(typeof obj === 'string' && obj.trim() === '') {
            return true;
        }

        return false;
    }

    static error(title) {
        Utils.toast(title, 'danger');
    }

    static info(title) {
        Utils.toast(title, 'info');
    }

    static warn(title) {
        Utils.toast(title, 'warning');
    }

    static success(title) {
        Utils.toast(title, 'success');
    }

    static toast(title, level) {
        let event = new Event('minutes-toast');
        event.title = title;
        event.level = level;
        document.dispatchEvent(event);
    }

    static addToGoogleCalendar(meeting) {
        const event = {
            'summary': meeting.title,
            'location': meeting.location,
            'description': 'Meeting scheduled by ' + meeting.owner,
            'start': {
              'dateTime': moment(meeting.date).toISOString(),
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'dateTime': moment(meeting.date).add(meeting.duration, 'hours').toISOString(),
              'timeZone': 'America/Los_Angeles'
            },
            'attendees': [
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
        };

        for(let index = 0; index < meeting.attendees; index++) {
            event.attendees.push(meeting.attendees[index]);
        }

        // https://developers.google.com/calendar/v3/reference/events/insert
        window.gapi.client.load('calendar', 'v3', function() {
            let request = window.gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event
            });
              
            request.execute(function(event) {
                console.log('Google calendar event created as: ' + event.htmlLink);
            });
        });
    }

    static validateEmail(email) {
        console.log('validate email: ' + email);
        
        if(!email || email == null) {
            return false;
        }
        
        if(email.trim().length == 0) {
            return false;
        }

        let index = email.indexOf('@');
        if(index <= 0) {
            return false;
        }

        if(index == email.length - 1) {
            return false;
        }

        return true;
    }

}