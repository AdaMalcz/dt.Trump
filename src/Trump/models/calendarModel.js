import BaseModel from './baseModel';
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

class CalendarModel extends BaseModel {
  constructor(){
      super();
      this.event = {
        'summary': '',
        'location': '',
        'description': '',
        'start': {
          'dateTime': '',
        },
        'end': {
          'dateTime': '',
        },
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 30},
          ]
        },
      }
      this.eventsExtraEls = {
        'description': '',
        'start': {
          'dateTime': '',
          'date': '',
          'time': '',
        },
        'end': {
          'dateTime': '',
          'date': '',
          'time': '',
        },
        'csvFile': '',
      }
      // If modifying these scopes, delete token.json.
      this.SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
      // The file token.json stores the user's access and refresh tokens, and is
      // created automatically when the authorization flow completes for the first
      // time.
      this.TOKEN_PATH = 'credentials.json';

  }

    getOnlyDate(date){
      let month, day;
      (date.getMonth() < 9) ? month = `0${date.getMonth() + 1}` : month = date.getMonth() + 1;
      (date.getDate() < 10) ? day = `0${date.getDate()}` : day = date.getDate();
      let onlyDate = `${date.getFullYear()}-${month}-${day}`;
      return onlyDate
    }
    getOnlyTime(date){
      let hour, minute;
      (date.getHours() < 10) ? hour = `0${date.getHours()}` : hour = date.getHours();
      (date.getMinutes() < 10) ? minute = `0${date.getMinutes()}` : minute = date.getMinutes();
      let onlyTime = `${hour}:${minute}`;
      return onlyTime
    }

    takeDateFromInput(date,time,duration){
      let year = date.substring(0,4);
      let month = date.substring(5,7);
      let day = date.substring(8,10)

      let hour = time.substring(0,2)
      let minutes = time.substring(3,5)
      return parseInt(new Date(year,month-1,day,hour,minutes).getTime())+duration*1000
    }

    exportToCSV(){
      let array = [['Subject','Start Date','Start Time','End Date','End Time','Description','Location'],
                  [this.event.summary, this.eventsExtraEls.start.date, this.eventsExtraEls.start.time,
                    this.eventsExtraEls.end.date, this.eventsExtraEls.end.time, this.event.description, this.event.location]];
      
      this.event.csvFile = array.map(e => e.join(",")).join("\n");
    }

    updateEvent(duration, link){
      let endDate = new Date(this.takeDateFromInput(calendar.view.el.date.value,calendar.view.el.time.value,duration))

      this.eventsExtraEls.start.date = calendar.view.el.date.value
      this.eventsExtraEls.start.time = calendar.view.el.time.value
      this.eventsExtraEls.start.dateTime = `${this.eventsExtraEls.start.date}T${this.eventsExtraEls.start.time}`

      this.eventsExtraEls.end.date = this.getOnlyDate(endDate)
      this.eventsExtraEls.end.time = this.getOnlyTime(endDate)
      this.eventsExtraEls.end.dateTime = `${this.eventsExtraEls.end.date}T${this.eventsExtraEls.end.time}`

      this.event.start.dateTime = this.eventsExtraEls.start.dateTime
      this.event.end.dateTime = this.eventsExtraEls.end.dateTime
      this.event.description = link;
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     * @return {function} if error in reading credentials.json asks for a new one.
     */
    authorize(credentials, callback) {
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      let token = {};
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );

      // Check if we have previously stored a token.
      try {
        token = fs.readFileSync(this.TOKEN_PATH);
      } catch (err) {
        return getAccessToken(oAuth2Client, callback);
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    }
    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.SCOPES
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('Enter the code from that page here: ', code => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return callback(err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          try {
            fs.writeFileSync(this.TOKEN_PATH, JSON.stringify(token));
            console.log('Token stored to', this.TOKEN_PATH);
          } catch (err) {
            console.error(err);
          }
          callback(oAuth2Client);
        });
      });
    }



    insertEvents(auth) {
      const calendar = google.calendar({ version: 'v3', auth });
      calendar.events.insert(
        {
          auth: auth,
          calendarId: 'primary',
          resource: event
        },
        function(err, event) {
          if (err) {
            console.log(
              'There was an error contacting the Calendar service: ' + err
            );
            return;
          }
          console.log('Event created: %s', event.data.htmlLink);
        }
      );
    }
    init(duration, link){
      this.updateEvent(duration, link)
      //this.exportToCSV()
      console.log(this.event)
      this.insertEvent(this.event)
      try {
        const content = fs.readFileSync('client_secret.json');
        authorize(JSON.parse(content), insertEvents);
      } catch (err) {
        return console.log('Error loading client secret file:', err);
      }
    }
}   

export default CalendarModel;