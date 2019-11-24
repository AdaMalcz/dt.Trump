import BaseModel from './baseModel';

class googleMapsModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.key = process.env.API_GM_KEY;
    this.baseApiUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios`;
    this.endpoint = '+Hollywood';
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt


  getData() {
    console.log(this.getFullUrl() + this.getParams() + '&key=' + this.key);
    const url = this.getFullUrl() + this.getParams() + '&key=' + this.key;
    fetch(url)
      .then(blob=> blob.json())
      .then(data=> console.log(data.routes));
    return {
      transport: "Travel with Donald",
      cost: "100 000$",
      time: "5 minutes",
      appURL: "https://www.donaldjtrump.com/",
    }  
  }
}

export default googleMapsModel;