import BaseModel from './baseModel';

class TransitModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.transport = "Komunikacja",
      this.name = "TRANSIT",
      this.time = "",
      this.dist = 0,
      this.cost = "",
      this.naviLink = "https://www.google.com/"
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: this.transport,
      name: this.name,
      time: this.time,
      dist: this.dist,
      cost: this.cost,
      naviLink: this.naviLink,
      duration: this.duration,
      icon: `<i class="fas fa-bus"></i>`
    }
  }
  async update() {
    var trans = await new Promise((resolve, reject) => {
      window.directionsService.route({
        origin: window.origin_place,
        destination: window.destination_place,
        travelMode: google.maps.TravelMode["TRANSIT"]
      }, function (response, status) {
        if (status == 'OK') {
          resolve(response.routes[0].legs[0])
        } else {
          reject('Directions request failed due to ' + status);
        }
      }
      )
    }).catch(console.error);
    if(trans) {
      this.time = trans.duration.text;
      this.dist = Math.round(trans.distance.value / 100)/10;
      this.cost = "?";
      this.naviLink="https://www.google.com/maps/dir/?api=1&origin="+window.origin_place.split(' ').join('+')+"&destination="+window.destination_place.split(' ').join('+')+"&travelmode=transit";
      this.duration = trans.duration.value;
    }
  }
}

export default TransitModel;