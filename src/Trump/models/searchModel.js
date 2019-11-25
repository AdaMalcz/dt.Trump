// Model do przechowywania danych wprowadzonych do wyszukiwarki

export default class SearchModel {
  constructor() {
    this.start = ''; // domyślnie lokalizacja urządzenia?
    this.meta = '';
    this.coors = [];
    this.address = 'none';

  }

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
/*
https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

async function displayData() {
  // załadowanie loadera
  btn.innerText = "Loading......";

  // pobranie rozwiązanego promisa
  const data = await getCoordinates(name);

  // wykorzystanie danych
  const lat = data.results[0].geometry.location.lat;
  const lng = data.results[0].geometry.location.lng;

  container.innerHTML = `
  <h3>${name}</h3>
  <h4>Latitude: ${lat}, Longitude: ${lng}</h4>
  `;

  // Wyłączenie loadera
  btn.innerText = "SUCCESS!";
}
*/