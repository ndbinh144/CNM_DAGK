<template>
  <div class="reqManage">
    <Header Title="REQUEST MANAGEMENT"></Header>
    <div class="mainView">
      <table class="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Note/th>
            <th>Status</th>
            <th>Xem đường đi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list_request" :key="item.ID">
            <td>{{ item.DateTime }}</td>
            <td>{{ item.Fullname }}</td>
            <td>{{ item.PhoneNumber }}</td>
            <td>{{ item.Address }}</td>
            <td>{{ item.Note }}</td>
            <td v-if="item.Status == 0">Chưa định vị</td>
            <td v-if="item.Status == 1">Đã định vị</td>
            <td v-if="item.Status == 2">Đã có xe nhận</td>
            <td v-if="item.Status == 3">Hoàn thành</td>
            <td>
              <button class="btn btn-info" v-if="item.TinhTrang > 1">Xem</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/* Import bootstrap */
import 'bootstrap/dist/css/bootstrap.css'
import Header from './Header.vue'
import io from 'socket.io-client'
import axios from 'axios'
export default {
  name: 'RequestManagement',
  data () {
    return {
      start: null,
      end: null,
      center: { lat: 21.0031177, lng: 105.82014079999999 },
      markers: [],
      coordinates: null,
      currID: null,
      list_request: [],
      socket: io('localhost:3000')
    }
  },
  mounted () {
    this.socket.on('changed', () => {
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
    width: 90%;
    margin: 0 auto;
    border-left: .05rem solid gainsboro;
    border-right: .05rem solid gainsboro;
    border-bottom: .05rem solid gainsboro;
  }

  th {
    background-color: rgb(202, 250, 230);
  }
</style>
