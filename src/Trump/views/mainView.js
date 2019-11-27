// wszystkie inne widoki będą dziedziczyły z tej klasy

class MainView {
  constructor() {
    // tutaj dodajemy sobie wszystkie elementy HTML na których zawartości będziemy pracować, przykład: 
    this.el = {
      header: document.querySelector('#header'),
      mainContainer: document.querySelector('.container'),
      apiContainer: document.querySelector('.api-table'),
      journeyTitle: document.querySelector('.journey'),
      geolocation: document.querySelector('#geolocation'),
      startingAddress: document.querySelector('#startingAddress'),
      destination: document.querySelector('#destination'),
      date: document.querySelector('#dateInput'),
      time: document.querySelector('#timeInput'),
      arrival_departure: document.querySelector('.onoffswitch-checkbox'),
      searchBtn: document.querySelector("#searchButton"),
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