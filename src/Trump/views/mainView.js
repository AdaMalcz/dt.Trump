// wszystkie inne widoki będą dziedziczyły z tej klasy

class MainView {
  constructor() {
    // tutaj dodajemy sobie wszystkie elementy HTML na których zawartości będziemy pracować, przykład: 
    this.el = {
      mainContainer: document.querySelector('.main-container')
      // itd.
      // itd.
    }
  }

  render(DOMElement, markup) {
    this._clearElementContent(DOMElement);
    DOMElement.insertAdjacentHTML('afterbegin', markup);
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