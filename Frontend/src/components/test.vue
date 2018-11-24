<template>
  <div>
    <Header title="LocationIdentifier"></Header>
    <div id="floating-panel">
    <b>Start: </b>
    <input id="start">
    <b>End: </b>
    <input id="end">
    </div>
    <div id ="map" class="col-md-12">
      <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;">
      </gmap-map>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import Header from './Header.vue'
export default {
  name: 'test',
  data () {
    return {
      center: { lat: 21.0031177, lng: 105.82014079999999 },
      markers: [],
      coordinates: null,
      currID: null
    }
  },
  mounted () {
    this.initMap(),
    this.calculateAndDisplayRoute()
  },
  method: {
    initMap: function(){
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 21.0031177, lng: 105.82014079999999}
      });
      directionsDisplay.setMap(map);
      var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('end').addEventListener('change', onChangeHandler);
    },
    calculateAndDisplayRoute (directionsService,directionsDisplay){
      directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  },
  component: {
    'Header': Header
  }
}
</script>

<style scoped>
  #map {
    height: 100%;
  }
  /* Optional: Makes the sample page fill the window. */
  #floating-panel {
    position: absolute;
    top: 10px;
    left: 25%;
    z-index: 5;
    background-color: #fff;
    padding: 5px;
    border: 1px solid #999;
    text-align: center;
    font-family: 'Roboto','sans-serif';
    line-height: 30px;
    padding-left: 10px;
  }
</style>

