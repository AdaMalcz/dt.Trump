import BaseModel from './baseModel';

class DrivingModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.transport = "Samochód",
      this.name = "DRIVING",
      this.time = "",
      this.dist = 0,
      this.cost = ""
    this.naviLink = "https://www.google.com/"
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: this.transport,
      name: this.name,
      cost: this.cost,
      time: this.time,
      dist: this.dist,
      cost: this.cost,
      naviLink: this.naviLink,
    }
  }
  async update() {
    var trans = await new Promise((resolve, reject) => {
      window.directionsService.route({
        origin: window.origin_place,
        destination: window.destination_place,
        travelMode: google.maps.TravelMode["DRIVING"]
      }, function (response, status) {
        if (status == 'OK') {
          resolve(response.routes[0].legs[0])
        } else {
          reject('Directions request failed due to ' + status);
        }
      }
      )
    }).catch(console.error);
    this.time = trans.duration.text;
    this.dist = trans.distance.value / 1000;
    this.cost = "?"
  }
}

export default DrivingModel;