<template>
  <div class="localIdentify">
    <Header Title="Location Identifier"></Header>
    <div class="row" id="mainView">
      <div class="col-sm-6">
        <table class="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Name</th>
              <th>Address</th>
              <th>Note</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list_request" v-bind:key="item.ID">
              <td>{{ item.DateTime }}</td>
              <td>{{ item.Fullname }}</td>
              <td>{{ item.Address }}</td>
              <td>{{ item.Note }}</td>
              <td>{{ item.Status }}</td>
              <td>
                <button class="btn btn-info" v-if="item.Status == 0" @click="addMarker(item.ID)">Locate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-6">
        <gmap-map
        :center="center"
        :zoom="12"
        style="width:100%;  height: 400px;">
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :draggable="true"
          @drag="updateCoordinates"
          @click="center=m.position"></gmap-marker>
        </gmap-map>
        <div>
          <gmap-autocomplete id="searchAdd"
            @place_changed="setPlace">
        </gmap-autocomplete>
        </div>
        <div>
          <button class="btn btn-success" id="IdentiifyBtn" @click="Identify">Xác định vị trí</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import Header from './Header.vue'
import io from 'socket.io-client'
import axios from 'axios'
export default {
  name: 'GoogleMap',
  data () {
    return {
      center: { lat: 21.0031177, lng: 105.82014079999999 },
      markers: [],
      coordinates: null,
      currID: null,
      list_request: [],
      socket: io('localhost:3000')
    }
  },
  mounted () {
    this.geolocate()
    this.socket.on('changed', () => {
      axios.get('http://localhost:3000/api/listbooks/').then(rs => {
        console.log('hello', rs.data)
        this.list_request = rs.data
      })
    })
  },
  methods: {
    setPlace (place) {
      if (this.currID != null) {
        const marker = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        this.markers = []
        this.markers.push({ position: marker })
        this.center = marker
      }
    },
    addMarker (ID) {
      this.currID = ID
      /* Gọi API lấy tạo độ của địa chỉ dựa trên ID */
      //
      //
      let latIn = 21.0031177
      let lngIn = 105.82014079999999
      this.markers = []
      const marker = {
        lat: latIn,
        lng: lngIn
      }
      this.markers.push({ position: marker })
      this.center = marker
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    Identify () {
      // Gọi API gửi địa chỉ sau khi xác nhận
      console.log(this.markers[0].position.lat)
      console.log(this.markers[0].position.lng)
      this.currID = null
    },
    updateCoordinates (location) {
      this.markers = []
      const marker = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      }
      this.markers.push({ position: marker })
    }
  },
  components: {
    'Header': Header
  }
}
</script>

<style scoped>
  #mainView {
    margin-top: 2rem;
  }
 .localIdentify {
   margin-left: 1rem;
   margin-right: 1rem;
   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
 }
 .title {
   text-align: center;
   margin: 2rem;
 }

  table {
    width: 100%;
    margin: 0 auto;
    border-left: .05rem solid gainsboro;
    border-right: .05rem solid gainsboro;
    border-bottom: .05rem solid gainsboro;
  }
  th {
    background-color: rgb(202, 250, 230);
  }
  #IdentiifyBtn {
    margin-top: 1rem;
  }
  #searchAdd {
    margin: .5rem;
    height: 2rem;
    width: 20rem;
    border: .1rem solid rgb(6, 148, 167);
    border-radius: .3rem;
    padding: .3rem;
  }
</style>
