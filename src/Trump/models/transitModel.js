import BaseModel from './baseModel';

class TransitModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: "Komunikacja",
      name: "TRANSIT",
      cost: "?",
      time: "",
      naviLink: "https://www.google.com/",
    }
  }
}

export default TransitModel;