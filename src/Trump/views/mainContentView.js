import MainView from "./mainView";
  
export default class MainContentView extends MainView{
  constructor() {
    super();

    window.initMap = function initMap() {
      window.directionsRenderer = new google.maps.DirectionsRenderer;
      window.directionsService = new google.maps.DirectionsService;
      window.gmap = new google.maps.Map(document.querySelector('#map'), {});
      window.directionsRenderer.setMap(window.gmap);
      window.geocoder = new google.maps.Geocoder();
  
      window.showPoints();
    };
    window.calculateAndDisplayRoute = this.calculateAndDisplayRoute;
    window.showPoints = this.showPoints;

    var google_api = document.querySelector("#google_api")
    if (!google_api) {
      let url = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_GM_KEY}&callback=initMap`;
      var script = document.createElement('script');
      script.id = "google_api";
      script.src = url;
      document.body.appendChild(script);
    };
  }
  
  async getMainContentMarkup(fetchedObj) {
    var resp = await 
    new Promise((resolve,reject)=>{window.directionsService.route({
      origin: window.origin_place,
      destination: window.destination_place,
      travelMode: google.maps.TravelMode[fetchedObj.name]
    },  function(response, status) {
      if (status == 'OK') {
        resolve(response.routes[0].legs[0])
      } else {
        reject('Directions request failed due to ' + status);
      }
    }
    )}).catch(console.error);
    return `
          <tbody>
          <tr>
            <td rowspan="2" class="transport"><a onclick="calculateAndDisplayRoute('${fetchedObj.name}')">${fetchedObj.transport}</a></td>
            <td class="caption top">Czas:</td>
            <td class="value top">${resp.duration.text}</td>
            <td rowspan="2" class="link"><a href=${fetchedObj.appURL} target="_blank">Przejdż do aplikacji</a></td>
          </tr>
          <tr>
            <td class="caption bottom">Koszt:</td>
            <td class="value bottom">${Math.round(fetchedObj.cost * resp.distance.value/1000)}zł</td>
          </tr>
          </tbody>
          <br>
          `;
  }

  init(start, meta){
    if (typeof start === "string" && start && meta) { //jest adresem
      this.el.journeyTitle.innerHTML = `<h2>Podróż z ${start} do ${meta}</h2>`;
      //tutaj będzie kod z wyświetlaniem danych z api

      window.origin_place = start;
      window.destination_place = meta;

      var google_api = document.querySelector("#google_api")
      if (google_api) {
        showPoints();
      } 

    }
    else
      this.el.journeyTitle.innerHTML = `<h2>Uzupełnij oba pola z adresem aby wyszukać przejazd!</h2>`
  }

  showPoints() {
    window.directionsRenderer.setMap(null);
    if (window.marker1)
    {
      window.marker1.setMap(null)
      window.marker2.setMap(null)
    }
    var bounds = new google.maps.LatLngBounds();
    window.geocoder.geocode({'address': window.origin_place}, function(results, status) {
      if (status === 'OK') {
        window.marker1 = new google.maps.Marker({
          map: window.gmap,
          position: results[0].geometry.location
        });
        bounds.extend(window.marker1.getPosition());
        window.geocoder.geocode({'address': window.destination_place}, function(results, status) {
          if (status === 'OK') {
            window.marker2 = new google.maps.Marker({
              map: window.gmap,
              position: results[0].geometry.location
            });
            bounds.extend(window.marker2.getPosition());
            window.gmap.fitBounds(bounds);
          }
        });
      }
    });
  }

  calculateAndDisplayRoute(selectedMode) {
    window.directionsRenderer.setMap(window.gmap);
    if (window.marker1)
    {
      window.marker1.setMap(null)
      window.marker2.setMap(null)
    }
    window.directionsService.route({
      origin: window.origin_place,
      destination: window.destination_place,
      travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        window.directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}