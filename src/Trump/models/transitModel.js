import BaseModel from './baseModel';
import SearchModel from './searchModel';

class TransitModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.searchModel = new SearchModel();
    this.transport = "Komunikacja",
      this.name = "TRANSIT",
      this.time = "",
      this.dist = 0,
      this.cost = "",
      this.naviLink = "https://www.google.com/",
      this.timeStart = "",
      this.timeMeta = "",
      this.timeMeta2 = "",
      this.failMsg = "Google Maps nie obsługuje komunikacji miejskiej we wskazanym mieście. Jeśli planujesz podróż międzymiastową spróbuj wpisać nazwę miasta (bez konkretnego adresu)."
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

      timeStart: this.timeStart,
      timeMeta: this.timeMeta,
      timeMeta2: this.timeMeta2,

      duration: this.duration,
      icon: `<i class="fas fa-bus"></i>`

    }
  }
  async update() {
      if (window.arrivalDeparture) {
        var trans = await new Promise((resolve, reject) => {
          window.directionsService.route({
            origin: window.origin_place,
            destination: window.destination_place,
            travelMode: google.maps.TravelMode["TRANSIT"],
            transitOptions: {
              departureTime: this.searchModel.takeDateFromInput()
            }
          }, function (response, status) {
            if (status == 'OK') {
              resolve(response.routes[0].legs[0])
            } else {
              reject('Directions request failed due to ' + status);
            }
          }
          )
        });
      }
      else {
        var trans = await new Promise((resolve, reject) => {
          window.directionsService.route({
            origin: window.origin_place,
            destination: window.destination_place,
            travelMode: google.maps.TravelMode["TRANSIT"],
            transitOptions: {
              arrivalTime: this.searchModel.takeDateFromInput()
            }
          }, function (response, status) {
            if (status == 'OK') {
              resolve(response.routes[0].legs[0])
            } else {
              reject('Directions request failed due to ' + status);
            }
          }
          )
        });
      }
    if(trans) {
      this.time = trans.duration.text;
      this.dist = Math.round(trans.distance.value / 100)/10;
      this.cost = "?";
      this.naviLink="https://www.google.com/maps/dir/?api=1&origin="+window.origin_place.split(' ').join('+')+"&destination="+window.destination_place.split(' ').join('+')+"&travelmode=transit";

      this.timeStart = trans.departure_time.value.toLocaleString(),
      this.timeMeta = trans.arrival_time.value.toLocaleString(),
      this.timeMeta2 = trans.arrival_time.value,
      console.log(trans.departure_time.value.toLocaleString()),
      console.log(trans.arrival_time.value.toLocaleString())

      this.duration = trans.duration.value;

    }
  }
}

export default TransitModel;