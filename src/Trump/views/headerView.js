import MainView from "./mainView";

export default class HeaderView extends MainView {
  constructor() {
    super();
  }

  _createHeader(DOMElement) {
    // Uncaught TypeError: Cannot read property 'addEventListener' of null

    // this._createElement(DOMElement,'h1','Trump travel - najszybsze i najtańsze podróże w Twoim mieście!');
    // this._createElement(DOMElement,'h2','Wyszukaj swój przejazd:');
    // this._createElement(DOMElement,'form');

    // this._createElement('form','input', '', '#startingAddress');
    // this._createElement('form','input', '', '#destination');
    // this._createElement('form','button', '', '#searchButton', 'fas fa-search');

    // this._setAttributes('#startingAddress','type','text');
    // this._setAttributes('#startingAddress','placeholder','Skąd chcesz wyruszyć?');
    // this._setAttributes('#destination','type','text');
    // this._setAttributes('#destination','placeholder','Cel podróży');
    // this._setAttributes('#searchButton','type','submit'); 

    // *** INSERT BOOTSTRAP CLASSES HERE *** //
    // nadpisuje klasy!
    // this._setAttributes('startingAddress','class','');
    // this._setAttributes('#destination','class','');
    // this._setAttributes('#searchButton','class','');
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

  init() {
    this._createHeader(this.el.header);
  }
}