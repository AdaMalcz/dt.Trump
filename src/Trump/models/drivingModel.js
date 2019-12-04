import BaseModel from './baseModel';
import SearchModel from './searchModel';

class DrivingModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.searchModel = new SearchModel();
    this.transport = "Samochód",
    this.name = "DRIVING",
    this.time = "",
    this.dist = 0,
    this.cost = "",
    this.naviLink = "https://www.google.com/",
    this.timeStart = "",
    this.timeMeta = "";
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
      timeStart: this.timeStart,
      timeMeta: this.timeMeta,
      duration: this.duration,
      icon: `<i class="fas fa-car"></i>`
    }
  }
  async update() {
    var trans = await new Promise((resolve, reject) => {
      window.directionsService.route({
        origin: window.origin_place,
        destination: window.destination_place,
        travelMode: google.maps.TravelMode["DRIVING"],
        drivingOptions: {
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
    }).catch(console.error);
    this.time = trans.duration.text;
    this.dist = Math.round(trans.distance.value / 100)/10;
    this.cost = "?";
    this.naviLink="https://www.google.com/maps/dir/?api=1&origin="+window.origin_place.split(' ').join('+')+"&destination="+window.destination_place.split(' ').join('+')+"&travelmode=driving";
    if(window.arrivalDeparture) {  // data wyjazdu
      console.log(this.searchModel.takeDateFromInput().toLocaleString())
      console.log(new Date(this.searchModel.takeDateFromInput().getTime()+trans.duration.value*1000).toLocaleString())
      this.timeStart = this.searchModel.takeDateFromInput()
      this.timeMeta = new Date(this.searchModel.takeDateFromInput().getTime()+trans.duration.value*1000)
    }
    else { // data przyjazdu
      console.log(new Date(this.searchModel.takeDateFromInput().getTime()-trans.duration.value*1000).toLocaleString())
      console.log(this.searchModel.takeDateFromInput().toLocaleString())
      this.timeStart = new Date(this.searchModel.takeDateFromInput().getTime()-trans.duration.value*1000)
      this.timeMeta = this.searchModel.takeDateFromInput()
    }
    this.duration = trans.duration.value;
  }
}

export default DrivingModel;