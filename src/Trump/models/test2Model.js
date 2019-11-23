import BaseModel from './baseModel';

class Test2Model extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: "Travel with Donald",
      cost: "100 000$",
      time: "5 minutes",
      appURL: "https://www.donaldjtrump.com/",
    }
  }
}

export default Test2Model;