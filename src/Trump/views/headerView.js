import MainView from "./mainView";
  
export default class HeaderView extends MainView{
  constructor() {
    super();
  }
  
  _createHeader(DOMElement){
    const title = document.createElement('h1');
    title.innerText = "Trump travel - najszybsze i najtańsze podróże w Twoim mieście!";

    const text = document.createElement('h2');
    text.innerText = "Wyszukaj swój przejazd:";

    const form = document.createElement('form');

    const startingAddress = document.createElement('input');
    startingAddress.setAttribute("type", "text");
    startingAddress.setAttribute("placeholder", "Skąd chcesz wyruszyć?");

    const destination = document.createElement('input');
    destination.setAttribute("type", "text");
    destination.setAttribute("placeholder", "Cel podróży");
        
    const submitButton = document.createElement('button');
    submitButton.setAttribute("type", "submit");
    
    submitButton.id = "searchButton";
    startingAddress.id = "startingAddress";
    destination.id = "destination";

    DOMElement.appendChild(title);
    DOMElement.appendChild(text);
    DOMElement.appendChild(form);
    form.appendChild(startingAddress);
    form.appendChild(destination);
    form.appendChild(submitButton);    

    // *** INSERT BOOTSTRAP CLASSES HERE *** //
    title.className = "title";
    text.className = "text";
    form.className = "form";
    startingAddress.className = "input";
    destination.className = "input";
    submitButton.className = "fas fa-search button";
  }

  init(){
    this._createHeader(this.el.header);
  }
}