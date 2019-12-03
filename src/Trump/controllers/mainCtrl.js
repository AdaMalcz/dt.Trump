// Tutaj importujemy wszystkie controllery np MenuCtrl, UberCtrl, JakDojadeCtrl itp. i główny widok
import HeaderView from '../views/headerView';
import MainContentView from '../views/mainContentView';
import SearchCtrl from './searchCtrl';
import MapCtrl from './mapCtrl';
import DrivingModel from '../models/drivingModel';
import WalkingModel from '../models/walkingModel';
import BicyclingModel from '../models/bicyclingModel';
import TransitModel from '../models/transitModel';
import WeatherModel from '../models/weatherModel';


export default class TrumpCtrl {
  constructor() {
    // przypisujemy controllery do state w tym miejscu
    this._headerView = new HeaderView();
    this.view = new MainContentView();
    this.search = new SearchCtrl(this);
    this.modelDriving = new DrivingModel();
    this.modelWalking = new WalkingModel();
    this.modelBicycling = new BicyclingModel();
    this.modelTransit = new TransitModel();
    this.modelWeather = new WeatherModel();
    this.map = new MapCtrl();
  }

  async renderSomething() {
    this.view._clearElementContent(this.view.el.apiContainer);
    
    await this.modelDriving.update();
    await this.modelWalking.update();
    await this.modelBicycling.update();
    await this.modelWeather.update();
    this.view.render(
      this.view.el.apiContainer,
      await this.view.getMainContentMarkup(this.modelDriving.getData())
    );
    this.view.render(
      this.view.el.apiContainer,
      await this.view.getMainContentMarkup(this.modelWalking.getData())
    );
    this.view.render(
      this.view.el.apiContainer,
      await this.view.getMainContentMarkup(this.modelBicycling.getData())
    );

    
    try {
      //document.querySelector('#fail').innerHTML = '';
      await this.modelTransit.update();
      this.view.render(
        this.view.el.apiContainer,
        await this.view.getMainContentMarkup(this.modelTransit.getData())
      );
    } catch { 
      document.querySelector('#msg').innerHTML = this.modelTransit.failMsg;
    }
     // this.view.render(
       // this.view.el.journeyTitle.querySelector(p),
       // this.modelTransit.failMsg
     // )};
    await this.view.renderWeatherContent(this.modelWeather.getData())
  };

init() {
  console.log('Trump init...');
  
  this._headerView.init();
  // this.renderSomething();

  this.search.init();
  }
}
