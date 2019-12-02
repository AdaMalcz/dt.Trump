import BaseModel from './baseModel';
import SearchModel from './searchModel';

class WalkingModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.searchModel = new SearchModel();
    this.transport = "Pieszo",
      this.name = "WALKING",
      this.time = "",
      this.dist = 0,
      this.naviLink = "https://www.google.com/",
      this.timeStart = "",
      this.timeMeta = ""
  }

  // w modelach będą funkcje asynchroniczne i pomocnicze do nich aby przekzaywać dane w odpowiednim formacie, na potrzeby testów zwracam zwykły obiekt
  getData() {
    return {
      transport: this.transport,
      icon: `<i class="fas fa-walking"></i>`,
      name: this.name,
      time: this.time,
      dist: this.dist,
      naviLink: this.naviLink,
      timeStart: this.timeStart,
      timeMeta: this.timeMeta
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
    this.dist = Math.round(trans.distance.value / 100)/10;
    this.naviLink="https://www.google.com/maps/dir/?api=1&origin="+window.origin_place.split(' ').join('+')+"&destination="+window.destination_place.split(' ').join('+')+"&travelmode=walking";
    if(window.arrivalDeparture) {  // data wyjazdu
      console.log(this.searchModel.takeDateFromInput().toLocaleString())
      console.log(new Date(this.searchModel.takeDateFromInput().getTime()+trans.duration.value*1000).toLocaleString())
      this.timeStart = this.searchModel.takeDateFromInput().toLocaleString()
      this.timeMeta = new Date(this.searchModel.takeDateFromInput().getTime()+trans.duration.value*1000).toLocaleString()
    }
    else { // data przyjazdu
      console.log(new Date(this.searchModel.takeDateFromInput().getTime()-trans.duration.value*1000).toLocaleString())
      console.log(this.searchModel.takeDateFromInput().toLocaleString())
      this.timeStart = new Date(this.searchModel.takeDateFromInput().getTime()-trans.duration.value*1000).toLocaleString()
      this.timeMeta = this.searchModel.takeDateFromInput().toLocaleString()
    }
  }
}

export default WalkingModel;