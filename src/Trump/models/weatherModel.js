import BaseModel from './baseModel';
import SearchModel from'./searchModel';

class WeatherModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.time = "",
    this.icon = "",
    this.temp = 0,
    this.pressure = 0,
    this.searchModel = new SearchModel()
  }

  getData() {
    console.log(window.destination_place);
    return {
        time: this.time,
        icon: this.icon,
        temp: this.temp,
        pressure: this.pressure,
    }
}

async update() { 
    const coords = await this.searchModel.getCoors(window.destination_place);
    let link = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=metric&appid=${process.env.API_WEATHER_KEY}`
    const res = await fetch(link);
    const data = await res.json();
    
    const iconcode = data.weather[0].icon;
    this.icon = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
    this.temp = (data.main.temp).toFixed(1);
    this.pressure = data.main.pressure
    const par = document.querySelector('.weticon');
    const newicon = document.createElement('img');
    newicon.src = this.icon;
    newicon.alt = "Weather icon";
    newicon.setAttribute('id', 'wicon');
    par.replaceChild(newicon, par.firstChild);
    }
 }

export default WeatherModel;