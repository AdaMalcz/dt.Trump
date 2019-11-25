// Model do przechowywania danych wprowadzonych do wyszukiwarki

export default class SearchModel {
  constructor() {
    this.start = ''; // domyślnie lokalizacja urządzenia?
    this.meta = '';
    this.coors = [];
    this.address = 'none';

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