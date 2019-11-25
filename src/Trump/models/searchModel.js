// Model do przechowywania danych wprowadzonych do wyszukiwarki

export default class SearchModel {
  constructor() {
    this.start = ''; // domyślnie lokalizacja urządzenia?
    this.meta = '';
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
}