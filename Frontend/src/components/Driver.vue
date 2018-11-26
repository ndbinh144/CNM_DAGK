<template>
  <div class="driver">
    <div class="header">
      <div class="img">
        <img src="../assets/car.png"/>
      </div>
      <div class="titleDiv">
        <label>Driver App</label>
      </div>
    </div>

    <div class="status">
      <div class="content_status">
        <p class="textStt">Status: </p>
      </div>
      <div class="content_status">
        <p class="textStt" id="content" v-bind:style= "{ color: ColorStatus }">{{ Status }}</p>
      </div>
      <div class="content_status">
        <label class="switch">
          <input type="checkbox" @click="changeStt" id="check">
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div>
      <gmap-autocomplete id="searchAdd"
        @place_changed="setPlace">
      </gmap-autocomplete>
    </div>

    <div class="col-sm-6" id="ggMap">
      <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 30rem;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :draggable="index === 0 && isRunning"
        @drag="updateCoordinates"
        @click="center=m.position"></gmap-marker>
      </gmap-map>
    </div>
    <div class="text-xs-center">
      <v-dialog
        v-model="dialog" max-width="80%">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title>
            {{ TitleDialog }}
          </v-card-title>

          <v-card-text>
            <h3>{{ contentDialog }}</h3>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <button
              class="btn btn-info"
              id="btnYes"
              @click="closeDialogYes">
              OK
            </button>
            <button
              class="btn btn-danger"
              id="btnNo"
              @click="closeDialogNo">
              CANCEL
            </button>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div>
      <button class="btn btn-success" @click="updateLocate"> Cập nhật vị trí </button>
      <button class="btn btn-success" @click="complete">Hoàn thành</button>
    </div>
  </div>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import io from 'socket.io-client'
import axios from 'axios'
import { setTimeout } from 'timers'
export default {
  name: 'Driver',
  data () {
    return {
      center: { lat: 21.0031177, lng: 105.82014079999999 },
      markers: [],
      Status: 'STANDBY',
      ColorStatus: 'red',
      isLocated: false,
      currLocate: null,
      nextLocate: null,
      customerLocate: null,
      dialog: false,
      TitleDialog: null,
      contentDialog: null,
      dialogBook: false,
      socket: io('localhost:3000'),
      url: 'http://localhost:3000/api/listbooks/',
      isReceiveRequest: true,
      isRepRequest: false,
      isRunning: false,
      idCus: null
    }
  },
  props: ['id'],
  mounted () {
    var self = this
    this.socket.on('receive', function (data) {
      self.dialogBook = true
      self.isRepRequest = false
      if (self.id === data.id && self.isReceiveRequest) {
        self.dialog = true
        self.idCus = data.idCus
        self.contentDialog = 'Đã có yêu cầu đặt xe, bạn có 10 giây để chấp nhận ?'
        self.customerLocate = data.posCustomer
        self.markers.push({ position: self.customerLocate })
        this.center = self.customerLocate
        setTimeout(function () {
          if (self.isRepRequest === false) {
            self.titleDialog = 'Thông báo'
            self.dialog = false
            self.socket.emit('driverFeedBack', {status: false})
            self.dialogBook = false
          }
        }, 10000)
      }
    })
  },
  methods: {
    getTimeLeft (timeout) {
      return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000)
    },
    changeStt () {
      let self = this
      let urls = self.url + 'driver/submit'
      let check = document.getElementById('check').checked
      if (self.isLocated && self.isRunning === false) {
        if (check) {
          self.Status = 'READY'
          self.ColorStatus = 'blue'
        } else {
          self.Status = 'STANDBY'
          self.ColorStatus = 'red'
        }
        // console.log(urls)
        axios.post(urls, {
          id: self.id,
          currAddress: self.currLocate,
          status: check
        }).then(rs => {
          if (rs.data.status === 1) {
            self.dialog = true
            self.TitleDialog = 'Thông báo'
            self.contentDialog = 'Cập nhật trạng thái thành công'
          }
        })
      } else {
        if (self.isLocated === false) {
          self.TitleDialog = 'Error'
          self.contentDialog = 'Hãy xác định vị trí hiện tại'
          self.dialog = true
          document.getElementById('check').checked = false
        } else if (self.isRunning) {
          self.TitleDialog = 'Error'
          self.contentDialog = 'Đang chở khách, không thể đổi trạng thái'
          self.dialog = true
          document.getElementById('check').checked = false
        }
      }
    },
    setPlace (place) {
      const marker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.currLocate = marker
      this.markers = []
      this.markers.push({ position: marker })
      this.center = marker
      this.isLocated = true
    },
    updateCoordinates (location) {
      const marker = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      }
      this.nextLocate = marker
    },
    closeDialogYes () {
      var self = this
      if (self.dialogBook) {
        self.socket.emit('driverFeedBack', {status: true})
        self.dialogBook = false
        self.isReceiveRequest = false
        self.isRepRequest = false
        self.isRunning = true
        let urls = self.url + 'driver/submit'
        axios.post(urls, {
          id: self.id,
          currAddress: self.currLocate,
          status: false
        })
        self.Status = 'STANDBY'
        self.ColorStatus = 'red'
        document.getElementById('check').checked = false
      }
      self.dialog = false
    },
    closeDialogNo () {
      var self = this
      if (self.dialogBook) {
        self.socket.emit('driverFeedBack', {status: false})
        self.dialogBook = false
        self.isRepRequest = false
      }
      self.dialog = false
    },
    updateLocate () {
      // Goi API cap nhat vi tri hien tai
      var self = this
      if (self.nextLocate != null && self.isRunning === true) {
        var urls = self.url + 'drivers/submit_locate'
        axios.post(urls, {
          id: self.id,
          nextPos: self.nextLocate
        }).then(rs => {
          if (rs.data.status) {
            self.dialog = true
            self.titleDialog = 'Thông báo'
            self.contentDialog = 'Cập nhật vị trí thành công'
          } else {
            self.dialog = true
            self.titleDialog = 'Thông báo'
            self.contentDialog = 'Cập nhật thất bại, vị trí mới không được cách vị trí cũ quá 100m'
          }
        })
      }
    },
    complete () {
      var self = this
      if (self.isRunning) {
        self.isReceiveRequest = true
        self.isRepRequest = true
        self.isRunning = false
        self.dialog = true
        self.titleDialog = 'Thông báo'
        self.contentDialog = 'Hoàn thành quá trình chở khách'
        var urls = self.url + self.idCus
        axios.post(urls, {
          status: 3
        }).then(rs => {
          console.log(rs.data.status)
          self.socket.emit('changed', {})
        })
        
      }
    }
  }
}
</script>

<style scoped>
  .header {
    height: 4rem;
    width: 100%;
    background-color: rgb(162, 235, 186);
  }
  .img {
    float: left;
    width: 20%;
  }
  img {
    height: 3.8rem;
    width: 3.5rem;
    margin-left: 1rem;
  }
  .titleDiv {
    float: left;
    width: 65%;
    text-align: center;
    line-height: 4rem;
  }
  label {
    vertical-align: middle;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 2rem;
  }
  .status {
    margin-top: 2rem;
    height: 3rem;
  }
  .content_status {
    float: left;
    width: 25%;
    margin-left: 1rem;
  }
  .textStt {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 6rem;
    height: 2rem;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.8rem;
    width: 1.8rem;
    left: .1rem;
    bottom: .105rem;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(4rem);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 3.5rem;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  #searchAdd {
    width: 80%;
    height: 2rem;
    border: .1rem solid rgb(13, 126, 146);
    padding: .3rem;
    border-radius: .3rem;
  }
  #ggMap {
    width: 90%;
    margin: 1.5rem;
    border: .2rem solid blue;
  }
  #btnYes, #btnNo {
    width: 20rem;
    margin: .2rem;
  }
</style>
