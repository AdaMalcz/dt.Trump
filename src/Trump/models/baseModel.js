// Model z którego dziedziczą wszystkie inne modele API

class BaseModel {
  constructor(optionsObj = {}) {
    //wpiszecie tu podstawowy adres api, this.baseApiUrl = ''
    //wpiszecie tu wymagane naglowki jak host czy klucz do api, this.headers = {}
    this.options = optionsObj;
    this.timeMsg = "Podróż w czasie nie jest jeszcze możliwa. Podaj aktualną lub przyszłą datę.";
  }


  // ponizej funkcje do ogarniecia url z dodatkowymi parametrami, nie ma za co :P 
  getParams() {
    let params = '?';
    for (let option in this.options) {

      // Omijamy opcje ustawione na off :)           
      if (this.options[option] === 'off') continue;

      params += `${option}=${this.options[option]}&`
    }
    // Usuwamy '&' z końca
    return params.slice(0, -1);
  }

  getFullUrl() {
    const gotParams = Object.entries(this.options).length !== 0;
    return `${this.baseApiUrl}${this.endpoint}${(gotParams) ? this.getParams() : '' }`;
  }

  setOptions(paramsObj) {
    this.options = paramsObj;
  }
};

export default BaseModel;