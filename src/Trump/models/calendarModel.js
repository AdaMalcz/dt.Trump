import BaseModel from './baseModel';

class CalendarModel extends BaseModel {
    constructor(){
        super();
        this.event = {
            'summary': '',
            'location': '',
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
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 30},
              ]
            },
            'csvFile': '',
          }
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
                  [this.event.summary, this.event.start.date, this.event.start.time,
                    this.event.end.date, this.event.end.time, this.event.description, this.event.location]];
      
      this.event.csvFile = array.map(e => e.join(",")).join("\n");
    }

    updateEvent(duration, link){
      let endDate = new Date(this.takeDateFromInput(calendar.view.el.date.value,calendar.view.el.time.value,duration))

      this.event.start.date = calendar.view.el.date.value
      this.event.start.time = calendar.view.el.time.value
      this.event.start.dateTime = `${this.event.start.date}T${this.event.start.time}`

      this.event.end.date = this.getOnlyDate(endDate)
      this.event.end.time = this.getOnlyTime(endDate)
      this.event.end.dateTime = `${this.event.end.date}T${this.event.end.time}`
      this.event.description = link;
    }
    init(duration, link){
      this.updateEvent(duration, link)
      this.exportToCSV()
    }
}   

export default CalendarModel;