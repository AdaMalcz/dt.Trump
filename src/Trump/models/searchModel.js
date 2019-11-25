// Model do przechowywania danych wprowadzonych do wyszukiwarki

export default class SearchModel {
  constructor() {
    this.start = ''; // domyślnie lokalizacja urządzenia?
    this.meta = '';
    this.coors = [];
    this.address = 'none';
    this.date = '';
    this.time = '';
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
  async getAdress(coordinates) {
    try {
      let geocodeCoordinates = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.coors[0]},${this.coors[1]}&key=${process.env.API_GM_KEY}`
      const rawData = await fetch(geocodeCoordinates);
      //console.log(await rawData.json());
      return await rawData.json();
    } catch (error) {
      return new Error(`Wild ERROR occured, can't get LocObj. Details: ${error}`);
    }
  }

  async displayAdress(coordinates) {
    const data = await this.getAdress(coordinates);
    const dataAdress = await data.results[0].formatted_address;
    this.address = await dataAdress;
  }

}

//translate address to coordinates - to do if needed