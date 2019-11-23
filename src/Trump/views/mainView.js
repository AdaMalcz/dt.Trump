// wszystkie inne widoki będą dziedziczyły z tej klasy

class MainView {
  constructor() {
    // tutaj dodajemy sobie wszystkie elementy HTML na których zawartości będziemy pracować, przykład: 
    this.el = {
      header: document.querySelector('#header'),
      mainContainer: document.querySelector('.container'),
      apiContainer: document.querySelector('.api-table'),
      journeyTitle: document.querySelector('.journey'),
      //searchBtn: document.querySelector("#searchButton"),
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
}

export default MainView;