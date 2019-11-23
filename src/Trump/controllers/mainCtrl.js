// Tutaj importujemy wszystkie controllery np MenuCtrl, UberCtrl, JakDojadeCtrl itp. i główny widok
import HeaderView from '../views/headerView';
import MainContentView from '../views/mainContentView';
import TestModel from '../models/testModel';
import Test2Model from '../models/test2Model';

export default class TrumpCtrl {
  constructor() {
    // przypisujemy controllery do state w tym miejscu
    this.start = null,
    this.meta = null

    this._headerView = new HeaderView();
    this.view = new MainContentView();
    this.model = new TestModel();
    this.model2 = new Test2Model();

    }

    _setListeners(){
      document.querySelector("#searchButton").addEventListener("click", ev =>{
        ev.preventDefault();
        this.start = document.querySelector("#startingAddress").value;
        this.meta = document.querySelector("#destination").value;
        this.view.init(this.start, this.meta);
      });
    }

    renderSomething() {
      this.view.render(
        // podajemy w jakim elemencie chcemy coś wyrenderować
        this.view.el.mainContainer,
        // i tutaj wpisujemy co chcemy wyrenderować - nasz markup
        this.view.getMainContentMarkup(this.model.getData()) // przekazujemy pobrane dane (pobieramy fetchem w modelu) 
      );
      this.view.render(
        this.view.el.mainContainer,
        this.view.getTestMarkup(this.bbcModel.getData())
      );
    };

  init() {
    console.log('Trump init...');
    
    this._headerView.init();

    this.renderSomething();
    this._setListeners();
  }
}