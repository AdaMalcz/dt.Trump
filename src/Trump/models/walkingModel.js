import BaseModel from './baseModel';

class WalkingModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.transport = "Pieszo",
      this.name = "WALKING",
      this.time = "",
      this.dist = 0,
      this.naviLink = "https://www.google.com/"
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: this.transport,
      name: this.name,
      time: this.time,
      dist: this.dist,
      naviLink: this.naviLink
    }
  }
  async update() {
    var trans = await new Promise((resolve, reject) => {
      window.directionsService.route({
        origin: window.origin_place,
        destination: window.destination_place,
        travelMode: google.maps.TravelMode["WALKING"]
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
  }
}

export default WalkingModel;