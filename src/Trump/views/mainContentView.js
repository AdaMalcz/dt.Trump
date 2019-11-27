import MainView from "./mainView";
import MapCtrl from "../controllers/mapCtrl";
import { runInContext } from "vm";
  
export default class MainContentView extends MainView{
  constructor() {
    super();
    this.mapCtrl = new MapCtrl();
  }
  
  getMainContentMarkup(fetchedObj) {
    if (fetchedObj.name=="TRANSIT" || fetchedObj.name=="DRIVING") {
      return `
          <tr>
            <td class="transport no-right-border"><a onclick="calculateAndDisplayRoute('${fetchedObj.name}')">${fetchedObj.transport}</a></td>
            <td class="no-right-border">Czas: ${fetchedObj.time}</td>
            <td class="no-right-border">Odległość: ${fetchedObj.dist}</td>
            <td class="no-right-border">Koszt: ${Math.round(fetchedObj.cost * resp.distance.value/1000)}zł</td>
            <td class="link"><a href=${fetchedObj.naviLink} target="_blank">Przejdż do nawigacji</a></td>
          </tr>
            `;
    } else {
      return `
            <tr>
            <td class="transport no-right-border"><a onclick="calculateAndDisplayRoute('${fetchedObj.name}')">${fetchedObj.transport}</a></td>
            <td class="no-right-border">Czas: ${fetchedObj.time}</td>
            <td class="no-right-border">Odległość: ${fetchedObj.dist}</td>
            <td class="link"><a href=${fetchedObj.naviLink} target="_blank">Przejdż do nawigacji</a></td>
          </tr>
            `;
    }

  }

  init(start, meta){
      this._clearElementContent(this.el.journeyTitle);
      this._createElement(this.el.journeyTitle, 'h3', `Początek: ${start}`, '', 'place-name');
      this._createElement(this.el.journeyTitle, 'h3', `Cel: ${meta}`, '', 'place-name');
      //tutaj będzie kod z wyświetlaniem danych z api

      window.origin_place = start;
      window.destination_place = meta;

      var google_api = document.querySelector("#google_api")
      if (google_api) {
        this.mapCtrl.showPoints();
      } 
  }
}