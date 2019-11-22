// wszystkie inne widoki będą dziedziczyły z tej klasy

class MainView {
  constructor() {
    // tutaj dodajemy sobie wszystkie elementy HTML na których zawartości będziemy pracować, przykład: 
    this.el = {
      mainContainer: document.querySelector('.api-table'),
      title: document.querySelector('.fromXToY')
      // itd.
    }
  }

  render(DOMElement, markup) {
    // this._clearElementContent(DOMElement);
    DOMElement.insertAdjacentHTML('beforeend', markup);
  }

  _clearElementContent(element) {
    let el;
    if (typeof element === 'string') {
      el = document.querySelector(`${element}`);
    } else {
      el = element;
    }
    el.innerHTML = '';
  }

  getTestMarkup(fetchedObj) {
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
      this.el.title.innerHTML = `<h2>Podróż z ${start} do ${meta}</h2>`;

    else
      this.el.title.innerHTML = `<h2>Uzupełnij oba pola z adresem aby wyszukać przejazd!</h2>`
  }
}

export default MainView;