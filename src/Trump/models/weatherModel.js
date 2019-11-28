import BaseModel from './baseModel';
import SearchModel from'./searchModel';

class WeatherModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.time = "",
    this.icon = "",
    this.temp = 0,
    this.weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=Wroclaw&appid=${process.env.API_WEATHER_KEY}`
  }

  getData() {
    console.log(this.weatherLink);
    console.log(window.destination_place);
    return {
        time: this.time,
        icon: this.icon,
        temp: this.temp,
        weatherLink: this.weatherLink
    }
}

async update() { 
    let link = `https://api.openweathermap.org/data/2.5/weather?lat=51&lon=17&units=metric&appid=${process.env.API_WEATHER_KEY}`
    const res = await fetch(link);
    const data = await res.json();
    const iconcode = data.weather[0].icon;
    this.icon = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
    this.temp = data.main.temp;
    }
 }

export default WeatherModel;