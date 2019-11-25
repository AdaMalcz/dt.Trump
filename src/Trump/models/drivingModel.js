import BaseModel from './baseModel';

class DrivingModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: "Samochód",
      name: "DRIVING",
      cost: 30/100,
      time: "",
      naviLink: "https://www.google.com/",
    }
  }
}

export default DrivingModel;