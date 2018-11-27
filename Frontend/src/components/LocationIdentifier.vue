<template>
  <div class="localIdentify">
    <Header Title="Location Identifier"></Header>
    <div>
      <h3 :style="{ color: colorMessage}">{{ message }}</h3>
    </div>
    <div class="row" id="mainView">
      <div class="col-sm-7">
        <table class="table">
          <thead>
            <tr>
              <th class="column1">Time</th>
              <th class="column1">Name</th>
              <th class="column1">Address</th>
              <th class="column1">Note</th>
              <th class="column1">Status</th>
              <th class="column1">Locate</th>
            </tr>
          </thead>
        </table>
        <div class="rollTable">
          <table class="table">
            <tbody>
              <tr v-for="item in list_request" v-bind:key="item.ID">
                <td class="column1">{{ item.DateTime }}</td>
                <td class="column1">{{ item.Fullname }}</td>
                <td class="column1">{{ item.Address }}</td>
                <td class="column1">{{ item.Note }}</td>
                <td class="column1" v-if="item.Status == 0">Chưa định vị</td>
                <td class="column1" v-if="item.Status == 1">Đã định vị</td>
                <td class="column1" v-if="item.Status == 2">Đã có xe nhận</td>
                <td class="column1" v-if="item.Status == 3">Hoàn thành</td>
                <td class="column1" v-if="item.Status == 4">Không có xe</td>
                <td class="column1">
                  <button class="btn btn-info" v-if="item.Status == 0" @click="addMarker(item.ID)">Locate</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-sm-5">
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
      message: '',
      colorMessage: 'blue',
      markers: [],
      coordinates: null,
      currID: null,
      list_request: [],
      isLocated: false,
      socket: io('localhost:3000')
    }
  },
  mounted () {
    this.geolocate()
    this.socket.on('changed', () => {
      console.log('changed list')
      axios.get('http://localhost:3000/api/listbooks/').then(rs => {
        this.list_request = rs.data
      })
    })
  },
  created () {
    axios.get('http://localhost:3000/api/listbooks/').then(rs => {
      this.list_request = rs.data
    })
  },
  methods: {
    getAdress (ID) {
      let len = this.list_request.length
      for (let i = 0; i < len; ++i) {
        if (this.list_request[i].ID === ID) {
          return this.list_request[i].Address
        }
      }
      return null
    },
    setPlace (place) {
      if (this.currID != null) {
        const marker = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        this.markers = []
        this.markers.push({ position: marker })
        this.center = marker
        this.isLocated = true
      }
    },
    addMarker (ID) {
      let self = this
      self.isLocated = false
      self.currID = ID
      self.message = ''
      /* Gọi API lấy tạo độ của địa chỉ dựa trên ID */
      let Address = self.getAdress(ID)
      axios.get('http://localhost:3000/api/listbooks/' + Address).then(rs => {
        if (rs.data.lat != null && rs.data.lng != null) {
          self.isLocated = true
          let latIn = rs.data.lat
          let lngIn = rs.data.lng
          self.markers = []
          const marker = {
            lat: latIn,
            lng: lngIn
          }
          self.markers.push({ position: marker })
          self.center = marker
        } else {
          self.message = 'Không định vị được vị trí'
          self.colorMessage = 'red'
        }
      })
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
      // Gửi API xác định thành công vị trí
      if (this.isLocated) {
        axios.post('http://localhost:3000/api/listbooks/' + this.currID, {
          status: 1
        }).then(rs => {
          if (rs.data.status === '1') {
            this.message = 'Định vị thành công'
            this.colorMessage = 'blue'
            this.socket.emit('locate', {id: this.currID, position: this.markers[0].position})
          } else {
            this.message = 'Định vị thất bại'
            this.colorMessage = 'red'
          }
        })
      }
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
  .rollTable {
    width: 100%;
    margin: 0 auto;
    height: 32rem;
    overflow:auto;
    border: .1rem solid rgb(168, 163, 163);
  }
  .column1 {
    width: 16%;
  }
</style>
