import MainView from "./mainView";
import MapCtrl from "../controllers/mapCtrl";
import CalendarCtrl from '../controllers/calendarCtrl';
import { runInContext } from "vm";
import SearchModel from "../models/searchModel";
import WeatherModel from "../models/weatherModel";
  
export default class MainContentView extends MainView{
  constructor() {
    super();
    this.mapCtrl = new MapCtrl();
    window.calendar = new CalendarCtrl();
    this.searchModel = new SearchModel();
    this.weatherModel = new WeatherModel();
  }
  
  getMainContentMarkup(fetchedObj) {
      return `
        ${this.el.setIdMarkup}${fetchedObj.name}${this.el.nameMarkup}
        <a onclick="calculateAndDisplayRoute('${fetchedObj.name}');updateWeather('${fetchedObj.timeMeta}');">
        ${fetchedObj.icon}<br>${fetchedObj.transport}</a>
        ${this.el.timeMarkup}
        ${fetchedObj.time}
        ${this.el.distanceMarkup}
        ${fetchedObj.dist} km
        ${this.el.naviMarkup}
        ${fetchedObj.naviLink}
        ${this.el.calendarMarkup}
        <a onclick="calendar.init('${fetchedObj.transport}', '${fetchedObj.duration}', '${fetchedObj.naviLink}');
        calendar.downloadContent();">
        ${this.el.closingMarkup}
        `;
  }
  
  async init(start, meta){
      this._clearElementContent(this.el.journeyTitle);
      this._createElement(this.el.journeyTitle, 'h3', `Z: ${start}`, '', 'place-name');
      this._createElement(this.el.journeyTitle, 'h3', `Do: ${meta}`, '', 'place-name');
      this._createElement(this.el.journeyTitle, 'h3', `Wszystkie środki komunikacji dostępne`, 'msg', '');
      //tutaj będzie kod z wyświetlaniem danych z api
     

      window.origin_place = start;
      window.destination_place = meta;
      const coords = await this.searchModel.getCoors(window.destination_place);
      window.coords = coords;
      var google_api = document.querySelector("#google_api")
      if (google_api) {
        this.mapCtrl.showPoints();
      } 
  }
}