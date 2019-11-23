// Tutaj importujemy wszystkie controllery np MenuCtrl, UberCtrl, JakDojadeCtrl itp. i główny widok
import HeaderView from '../views/headerView';
import MainContentView from '../views/mainContentView';
import SearchCtrl from './searchCtrl';
import TestModel from '../models/testModel';
import Test2Model from '../models/test2Model';

export default class TrumpCtrl {
  constructor() {
    // przypisujemy controllery do state w tym miejscu
    this._headerView = new HeaderView();
    this.view = new MainContentView();
    this.search = new SearchCtrl();
    this.searchBtn = document.querySelector("#searchButton");

    this.model = new TestModel();
    this.model2 = new Test2Model();
  }

  renderSomething() {
    this.view.render(
      // podajemy w jakim elemencie chcemy coś wyrenderować
      this.view.el.apiContainer,
      // i tutaj wpisujemy co chcemy wyrenderować - nasz markup
      this.view.getMainContentMarkup(this.model.getData()) // przekazujemy pobrane dane (pobieramy fetchem w modelu) 
    );
    this.view.render(
      this.view.el.apiContainer,
      this.view.getMainContentMarkup(this.model2.getData())
    );
  };

init() {
  console.log('Trump init...');
  
  this._headerView.init();
  this.renderSomething();

  this.search.init();
  }
}