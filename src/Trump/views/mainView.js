// wszystkie inne widoki będą dziedziczyły z tej klasy

class MainView {
  constructor() {
    // tutaj dodajemy sobie wszystkie elementy HTML na których zawartości będziemy pracować, przykład: 
    this.el = {
      header: document.querySelector('#header'),
      mainContainer: document.querySelector('.container'),
      apiContainer: document.querySelector('.api-table-body'),
      journeyTitle: document.querySelector('.journey'),
      geolocation: document.querySelector('#geolocation'),
      startingAddress: document.querySelector('#startingAddress'),
      destination: document.querySelector('#destination'),
      date: document.querySelector('#dateInput'),
      time: document.querySelector('#timeInput'),
      arrival_departure: document.querySelector('.onoffswitch-checkbox'),
      searchBtn: document.querySelector("#searchButton"),
      transportType: document.querySelector(".transport-type"),
      activeTransport: document.querySelector(".active-transport"),
      calendar: document.querySelector("#calendar"),
      
      setIdMarkup: `<tr class="transport-type" id="`,
      nameMarkup: `"> <td class="transport no-right-border left-border-radius">`,
      timeMarkup: `</td> <td class="no-right-border">`,
      distanceMarkup: `</td> <td class="no-right-border">`,
      costMarkup: `</td> <td class="no-right-border">`,
      naviMarkup: `</td> <td class="link right-border-radius"> <a href="`,
      calendarMarkup: `" target="_blank"> <i class="fas fa-compass"> </i> </a>`,
      closingMarkup: `<i  class="fas fa-calendar-plus"> </i> </a> </td> </tr>`,
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
  
  _createElement(DOMElement, element, innerText, id, classes) {
    let el;
    if (typeof DOMElement === 'string'){
      DOMElement = document.querySelector(DOMElement);
    }
    el = document.createElement(element);
    el.innerHTML = innerText || '';
    if (id)
      el.id = id;
    if (classes)
      el.setAttribute('class', classes);
    DOMElement.appendChild(el);
  }

  _setAttributes(elementId, attribute, value) {
    document.getElementById(`${elementId}`).setAttribute(attribute, value);
  }

}

export default MainView;