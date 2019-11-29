// Model do przechowywania danych wprowadzonych do wyszukiwarki

export default class SearchModel {
  constructor() {
    this.start = ''; // domyślnie lokalizacja urządzenia?
    this.meta = '';
    this.coors = [];
    this.address = 'none';
    this.date = '';
    this.time = '';
    this.arrival_departure = '';
    this.geolocation = '';
  }
  takeDateFromInput(){
    let year = this.date.substring(0,4);
    let month = this.date.substring(5,7);
    let day = this.date.substring(8,10);
    let hour = this.time.substring(0,2);
    let minutes = this.time.substring(3,5);

    return new Date(year,month-1,day,hour,minutes)
  }
  //translate coordinates to address
  async getAddress(coordinates) {
    try {
      let geocodeCoordinates = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.coors[0]},${this.coors[1]}&key=${process.env.API_GM_KEY}`
      const rawData = await fetch(geocodeCoordinates);
      // console.log(await rawData.json());
      return await rawData.json();
    } catch (error) {
      return new Error(`Wild ERROR occured, can't get LocObj. Details: ${error}`);
    }
  }

  async displayAddress(coordinates) {
    const data = await this.getAddress(coordinates);
    const dataAddress = await data.results[0].formatted_address;
    this.address = await dataAddress;
  }

//translate address to coordinates - to do if needed

  async getCoors(address) {
    try {
      let geocodeAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_GM_KEY}`
      const rawData = await fetch(geocodeAddress);
      const data = await rawData.json();
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      console.log(data);
      return await {"lat": lat, "long" : lng};
    } catch (error) {
      return new Error(`Wild ERROR occured, can't get LocObj. Details: ${error}`);
    }
  }
}