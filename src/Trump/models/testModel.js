import BaseModel from './baseModel';

class TestModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: "By foot",
      name: "WALKING",
      cost: 0,
      time: "45 minutes",
      appURL: "https://www.google.com",
    }
  }
}

export default TestModel;