// Tutaj importujemy wszystkie controllery np MenuCtrl, UberCtrl, JakDojadeCtrl itp. i główny widok
import HeaderView from '../views/headerView';
import MainView from '../views/mainView';
import TestModel from '../models/testModel';
import Test2Model from '../models/test2Model';
import bbcModel from '../models/bbcModel';

export default class TrumpCtrl {
  constructor() {
    // przypisujemy controllery do state w tym miejscu
    this.start = null,
    this.meta = null

    this._headerView = new HeaderView();
    this.view = new MainView();
    this.model = new TestModel();
    this.model2 = new Test2Model();
    this.bbcConf = {
        key : '7c4322b0a63e47bf9e1004480c447814',
        cur : "EUR",
    }
    this.bbcModel = new bbcModel(this.bbcConf);

    }

    _setListeners(){
      document.querySelector("#searchButton").addEventListener("click", ev =>{
        ev.preventDefault();
        console.log(document.querySelector("#startingAddress").value+" do " +document.querySelector("#destination").value )
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
        this.view.getTestMarkup(this.model.getData()) // przekazujemy pobrane dane (pobieramy fetchem w modelu) 
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