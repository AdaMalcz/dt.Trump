// Tutaj importujemy wszystkie controllery np MenuCtrl, UberCtrl, JakDojadeCtrl itp. i główny widok
import MainView from '../views/mainView'
import TestCtrl from './testCtrl';

export default class TrumpCtrl {
  constructor() {
    // przypisujemy controllery do state w tym miejscu
    this.testCtrl = new TestCtrl();

    this._trumpView = new MainView();
  }

  init() {
    console.log('Trump init...');

    this.testCtrl.init();
  }
}