import MainView from "./mainView";
  
export default class MainContentView extends MainView{
  constructor() {
    super();
  }
  
  getMainContentMarkup(fetchedObj) {
    return `
          <tbody>
          <tr>
            <td rowspan="2" class="transport">${fetchedObj.transport}</td>
            <td class="caption top">Czas:</td>
            <td class="value top">${fetchedObj.time}</td>
            <td rowspan="2" class="link"><a href=${fetchedObj.appURL} target="_blank">Przejdż do aplikacji</a></td>
          </tr>
          <tr>
            <td class="caption bottom">Koszt:</td>
            <td class="value bottom">${fetchedObj.cost}</td>
          </tr>
          </tbody>
          <br>
          `;
  }
  init(start, meta){
    if (typeof start === "string" && start && meta) //jest adresem
      this.el.journeyTitle.innerHTML = `<h2>Podróż z ${start} do ${meta}</h2>`;
      //tutaj będzie kod z wyświetlaniem danych z api
    else
      this.el.journeyTitle.innerHTML = `<h2>Uzupełnij oba pola z adresem aby wyszukać przejazd!</h2>`
  }

}