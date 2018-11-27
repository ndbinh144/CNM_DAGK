<template>
  <div class="reqManage">
    <Header Title="REQUEST MANAGEMENT"></Header>
    <div id ="map" class="col-md-12">
      <gmap-map
      ref='gmap'
      :center="center"
      :zoom="12"
      style="width:100%;  height: 300px;">
      </gmap-map>
    </div>
    <div class="mainView">
      <table class="table">
        <thead>
          <tr>
            <th class="column1">Time</th>
            <th class="column1">Name</th>
            <th class="column3">Phone number</th>
            <th class="column4">Address</th>
            <th class="column2">Note</th>
            <th class="column3">Status</th>
            <th class="column3">Xem đường đi</th>
          </tr>
        </thead>
      </table>
      <div class="rollTable">
        <table class="table">
          <tbody>
            <tr v-for="item in list_request" :key="item.ID">
              <td class="column1">{{ item.DateTime }}</td>
              <td class="column1">{{ item.Fullname }}</td>
              <td class="column1">{{ item.PhoneNumber }}</td>
              <td class="column4">{{ item.Address }}</td>
              <td class="column2">{{ item.Note }}</td>
              <td class="column3" v-if="item.Status == 0">Chưa định vị</td>
              <td class="column3" v-if="item.Status == 1">Đã định vị</td>
              <td class="column3" v-if="item.Status == 2">Đã có xe nhận</td>
              <td class="column3" v-if="item.Status == 3">Hoàn thành</td>
              <td class="column3" v-if="item.Status == 4">Không có xe</td>
              <td class="column3">
                <button class="btn btn-info" v-if="item.Status == 2 || item.Status == 3" @click="xemDuongDi(item.ID)">Xem</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/* Import bootstrap */
import { gmapApi } from 'vue2-google-maps'
import 'bootstrap/dist/css/bootstrap.css'
import Header from './Header.vue'
import io from 'socket.io-client'
import axios from 'axios'
export default {
  name: 'RequestManagement',
  data () {
    return {
      center: { lat: 21.0031177, lng: 105.82014079999999 },
      markers: [],
      list_request: [],
      socket: io('localhost:3000'),
      url: 'http://localhost:3000/api/listbooks/'
    }
  },
  computed: {
    google: gmapApi
  },
  mounted () {
    var self = this
    self.socket.on('changed', () => {
      axios.get(self.url).then(rs => {
        self.list_request = rs.data
      })
    })
  },
  methods: {
    xemDuongDi (ID) {
      var self = this
      var urls = self.url + 'book/' + ID
      axios.get(urls).then(rs => {
        if (rs.data.bookInfo !== -1) {
          self.getRoute(rs.data.bookInfo.posDriver, rs.data.bookInfo.posCustomer)
        }
      })
    },
    getRoute (posDriver, posCustomer) {
      var self = this
      self.center = posDriver
      var directionsService = new self.google.maps.DirectionsService()
      var directionsDisplay = new self.google.maps.DirectionsRenderer()
      directionsDisplay.setMap(this.$refs.gmap.$mapObject)
      directionsService.route({
        origin: posDriver,
        destination: posCustomer,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
        } else {
          console.log('Directions request failed due to ' + status)
        }
      })
    }
  },
  created () {
    var self = this
    axios.get(self.url).then(rs => {
      self.list_request = rs.data
    })
  },
  components: {
    'Header': Header
  }
}
</script>

<style scoped>
  .title {
    margin-bottom: 3rem;
  }
  .mainView {
    margin-top: 2rem;
  }
  .reqManage {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }

  table {
    width: 95%;
    margin: 0 auto;
  }

  th {
    background-color: rgb(202, 250, 230);
  }
  th, td {
    text-align: center;
  }
  #map {
    margin: 1rem auto;
  }
  .column1 {
    width: 12rem;
  }
  .column2 {
    width: 15rem;
  }
  .column3 {
    width: 8rem;
  }
  .column4 {
    width: 17rem;
  }
  .rollTable {
    width: 95%;
    margin: 0 auto;
    height: 14rem;
    overflow:auto;
    border: .1rem solid rgb(168, 163, 163);
  }
</style>
