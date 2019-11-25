import BaseModel from './baseModel';

class BicyclingModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: "Rower",
      name: "BICYCLING",
      cost: 0,
      time: "",
      naviLink: "https://www.google.com/",
    }
  }
}

export default BicyclingModel;