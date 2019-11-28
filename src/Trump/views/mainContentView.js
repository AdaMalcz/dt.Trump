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
            <tbody>
            <tr>
              <td rowspan="3" class="transport"><a onclick="calculateAndDisplayRoute('${fetchedObj.name}')">${fetchedObj.transport}</a></td>
              <td class="caption top">Czas:</td>
              <td class="value top">${fetchedObj.time}</td>
              <td rowspan="3" class="link"><a href=${fetchedObj.naviLink} target="_blank">Przejdż do nawigacji</a></td>
            </tr>
            <tr>
              <td class="caption">Odległość:</td>
              <td class="value">${fetchedObj.dist} km</td>
            </tr>
            <tr>
              <td class="caption bottom">Koszt:</td>
              <td class="value bottom">${fetchedObj.cost} zł</td>
            </tr>
            </tbody>
            <br>
            `;
    } else {
      return `
            <tbody>
            <tr>
              <td rowspan="2" class="transport"><a onclick="calculateAndDisplayRoute('${fetchedObj.name}')">${fetchedObj.transport}</a></td>
              <td class="caption top">Czas:</td>
              <td class="value top">${fetchedObj.time}</td>
              <td rowspan="2" class="link"><a href=${fetchedObj.naviLink} target="_blank">Przejdż do nawigacji</a></td>
            </tr>
            <tr>
              <td class="caption bottom">Odległość:</td>
              <td class="value bottom">${fetchedObj.dist} km</td>
            </tr>
            </tbody>
            <br>
            `;
    }
  }

  renderWeatherContent(fetchedObj) {
    document.querySelector('#icon img').src = fetchedObj.icon;
    document.querySelector('#temp').textContent = fetchedObj.temp;
  }
  

  init(start, meta){
      this.el.journeyTitle.innerHTML = `<h2>Podróż z ${start} do ${meta}</h2>`;
      //tutaj będzie kod z wyświetlaniem danych z api

      window.origin_place = start;
      window.destination_place = meta;

      var google_api = document.querySelector("#google_api")
      if (google_api) {
        this.mapCtrl.showPoints();
      } 
  }
}