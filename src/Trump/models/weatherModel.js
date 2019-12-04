import BaseModel from './baseModel';

class WeatherModel extends BaseModel {
  constructor(optionsObj) {
    super(optionsObj);
    this.time = "";
    window.update = this.update;
  }

  async initialWeather() { 
      let link = `https://api.openweathermap.org/data/2.5/weather?lat=${window.coords.lat}&lon=${window.coords.long}&units=metric&appid=${process.env.API_WEATHER_KEY}`
      const res = await fetch(link);
      const data = await res.json();
      const iconcode = data.weather[0].icon;
      const icon = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
      const par = document.querySelector('.weticon');
      const newicon = document.createElement('img');
      newicon.src = icon;
      newicon.alt = "Weather icon";
      newicon.setAttribute('id', 'wicon');
      par.replaceChild(newicon, par.firstChild);
      document.querySelector('.temp').textContent = (data.main.temp).toFixed(1) +'°C';
      document.querySelector('.pressure').textContent = data.main.pressure +' hPa';
  }

  async update(meta) {
    const weatherSampleInterval = 10800000; //3 hours in miliseconds
    let link = `https://api.openweathermap.org/data/2.5/forecast?lat=${window.coords.lat}&lon=${window.coords.long}&units=metric&appid=${process.env.API_WEATHER_KEY}`
    const res = await fetch(link);
    const data = await res.json();
    const firstDate = (new Date(data.list[0].dt_txt)).getTime();
    const metaDate = (new Date(meta)).getTime();
    let index = Math.abs(Math.round((metaDate-firstDate)/weatherSampleInterval));
    if(index>=(data.list.length)) {
      window.alert("Przybędziesz na miejsce za ponad 5 dni. Wyświetlana jest aktualna pogoda");
      index = 0;
    }
    const iconcode = data.list[index].weather[0].icon;
    const icon = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
    document.querySelector('#wicon').src = icon;
    document.querySelector('.temp').textContent = (data.list[index].main.temp).toFixed(1) +'°C';
    document.querySelector('.pressure').textContent = data.list[index].main.pressure +' hPa';
  }
}

export default WeatherModel;