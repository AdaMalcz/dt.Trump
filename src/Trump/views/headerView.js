import MainView from "./mainView";

export default class HeaderView extends MainView {
  constructor() {
    super();
  }

  _createHeader(){
    let currentMonth, currentDay;
    (new Date().getMonth() < 9) ? currentMonth = `0${new Date().getMonth() + 1}` : currentMonth = new Date().getMonth() + 1;
    (new Date().getDate() < 10) ? currentDay = `0${new Date().getDate()}` : currentDay = new Date().getDate();
    let currentDate = `${new Date().getFullYear()}-${currentMonth}-${currentDay}`;
    this._setAttributes('dateInput', 'value', currentDate);

    let currentHour, currentMinute;
    (new Date().getHours() < 10) ? currentHour = `0${new Date().getHours()}` : currentHour = new Date().getHours();
    (new Date().getMinutes() < 10) ? currentMinute = `0${new Date().getMinutes()}` : currentMinute = new Date().getMinutes();
    let currentTime = `${currentHour}:${currentMinute}`;
    this._setAttributes('timeInput', 'value', currentTime);
  }

  init(){
    this._createHeader();
  }
}