// import MainContentView from '../views/mainContentView';
// import MapModel from '../models/mapModel';
import DrivingModel from '../models/drivingModel';
import WalkingModel from '../models/walkingModel';
import BicyclingModel from '../models/bicyclingModel';
import TransitModel from '../models/transitModel';

export default class MapCtrl {
  constructor() {
    this.modelDriving = new DrivingModel();
    this.modelWalking = new WalkingModel();
    this.modelBicycling = new BicyclingModel();
    this.modelTransit = new TransitModel();

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

  showPoints() {
    window.directionsRenderer.setMap(null);
    if (window.marker1) {
      window.marker1.setMap(null)
      window.marker2.setMap(null)
    }
    var bounds = new google.maps.LatLngBounds();
    window.geocoder.geocode({ 'address': window.origin_place }, function (results, status) {
      if (status === 'OK') {
        window.marker1 = new google.maps.Marker({
          map: window.gmap,
          position: results[0].geometry.location
        });
        bounds.extend(window.marker1.getPosition());
        window.geocoder.geocode({ 'address': window.destination_place }, function (results, status) {
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
    if (window.marker1) {
      window.marker1.setMap(null)
      window.marker2.setMap(null)
    }
    window.directionsService.route({
      origin: window.origin_place,
      destination: window.destination_place,
      travelMode: google.maps.TravelMode[selectedMode]
    }, function (response, status) {
      if (status == 'OK') {
        window.directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}