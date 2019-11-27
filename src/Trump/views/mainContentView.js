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
          <tr>
            <td class="transport no-right-border"><a onclick="calculateAndDisplayRoute('${fetchedObj.name}')">${fetchedObj.transport}</a></td>
            <td class="no-right-border">Czas: ${resp.duration.text}</td>
            <td class="no-right-border">Koszt: ${Math.round(fetchedObj.cost * resp.distance.value/1000)}zł</td>
            <td class="link"><a href=${fetchedObj.naviLink} target="_blank">Przejdż do nawigacji</a></td>
          </tr>
          `;
  }

  init(start, meta){
      this._clearElementContent(this.el.journeyTitle);
      this._createElement(this.el.journeyTitle, 'h3', `Początek: ${start}`, '', 'place-name');
      this._createElement(this.el.journeyTitle, 'h3', `Cel: ${meta}`, '', 'place-name');
      //tutaj będzie kod z wyświetlaniem danych z api

      window.origin_place = start;
      window.destination_place = meta;

      var google_api = document.querySelector("#google_api")
      if (google_api) {
        showPoints();
      } 
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