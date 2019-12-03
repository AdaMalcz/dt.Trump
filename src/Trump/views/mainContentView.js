import MainView from "./mainView";
import MapCtrl from "../controllers/mapCtrl";
import { runInContext } from "vm";
  
export default class MainContentView extends MainView{
  constructor() {
    super();
    this.mapCtrl = new MapCtrl();
  }
  
  getMainContentMarkup(fetchedObj) {
      return `
        ${this.el.nameMarkup}
        <a onclick="calculateAndDisplayRoute('${fetchedObj.name}')">${fetchedObj.icon}<br>${fetchedObj.transport}</a>
        ${this.el.timeMarkup}
        ${fetchedObj.time}
        ${this.el.distanceMarkup}
        ${fetchedObj.dist} km
        ${this.el.naviMarkup}
        ${fetchedObj.naviLink}
        ${this.el.closingMarkup}
        `;
  }

  renderWeatherContent(fetchedObj) {
    // document.querySelector('.icon img').src = fetchedObj.icon;
    document.querySelector('.temp').textContent = fetchedObj.temp +'°C';
    document.querySelector('.pressure').textContent = fetchedObj.pressure +' hPa';
  }
  

  init(start, meta){
      this._clearElementContent(this.el.journeyTitle);
      this._createElement(this.el.journeyTitle, 'h3', `Początek: ${start}`, '', 'place-name');
      this._createElement(this.el.journeyTitle, 'h3', `Cel: ${meta}`, '', 'place-name');
      this._createElement(this.el.journeyTitle, 'p', `Wszystkie środki komunikacji dostępne`, 'msg', '');
      //tutaj będzie kod z wyświetlaniem danych z api
     

      window.origin_place = start;
      window.destination_place = meta;

      var google_api = document.querySelector("#google_api")
      if (google_api) {
        this.mapCtrl.showPoints();
      } 
  }
}