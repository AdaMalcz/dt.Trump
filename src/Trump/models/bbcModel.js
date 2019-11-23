import BaseModel from './baseModel';

class bbcModel extends BaseModel {
  constructor(optionsObj) {
    /* REMEMBER IN CONFIGURATION, KEY SHOULD ALWAYS BE FIRST OTHERWISE BBC WILL CANNOT AUTHORIZE REQUEST */
    super(optionsObj);
    this.baseApiUrl = 'https://public-api.blablacar.com';
    this.endpoint = '/api/v2/trips'
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    console.log("> " + this.getFullUrl() + this.getParams());
    return {
      transport: "Travel with Donald",
      cost: "100 000$",
      time: "5 minutes",
      appURL: "https://www.donaldjtrump.com/",
    }
  }
}

export default bbcModel;