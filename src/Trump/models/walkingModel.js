import BaseModel from './baseModel';

class WalkingModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: "Pieszo",
      name: "WALKING",
      cost: 0,
      time: "",
      appURL: "https://www.google.com/",
    }
  }
}

export default WalkingModel;