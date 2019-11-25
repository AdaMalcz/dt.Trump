import MainView from "./mainView";
  
export default class HeaderView extends MainView{
  constructor() {
    super();
  }
  
  _createHeader(DOMElement){
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
    // this._setAttributes('#startingAddress','class','');
    // this._setAttributes('#destination','class','');
    // this._setAttributes('#searchButton','class','');
  }

  init(){
    this._createHeader(this.el.header);
  }
}