import CalendarModel from '../models/calendarModel';
import CalendarView from '../views/calendarView';

export default class CalendarCtrl{
    constructor(){
        this.model = new CalendarModel();
        this.view = new CalendarView();
    }

    // downloadContent(){
    //     console.log(calendar.model.event.csvFile);
    // }

    _setEventData(type){
        this.model.event.summary = `Podróż do ${calendar.view.el.destination.value}, transport: ${type}`;
        this.model.event.location = calendar.view.el.startingAddress.value;
    }

    init(type, time, link) {
        calendar._setEventData(type);
        calendar.model.init(time, link);
    }
    
}