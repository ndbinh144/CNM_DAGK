<template>
  <div class="localIdentify">
    <h2 class="title"> Location Identifier </h2>
    <div class="row">
      <div class="col-sm-6">
        <table class="table">
          <thead>
            <tr>
              <th>Thời điểm đặt</th>
              <th>Họ tên</th>
              <th>Địa chỉ đón khách</th>
              <th>Ghi chú</th>
              <th>Tình trạng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list_request" v-bind:key="item.STT">
              <td>{{ item.ThoiDiem }}</td>
              <td>{{ item.Ten }}</td>
              <td>{{ item.DiaChi }}</td>
              <td>{{ item.GhiChu }}</td>
              <td>{{ item.TinhTrang }}</td>
              <td>
                <button class="btn btn-info" v-if="item.TinhTrang == 0" @click="addMarker(item.ID)">Định vị</button>
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
          @click="center=m.position"></gmap-marker>
        </gmap-map>
        <button class="btn btn-success" id="IdentiifyBtn" @click="Identify">Xác định vị trí</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
export default {
  name: 'GoogleMap',
  data () {
    return {
      center: { lat: 21.0031177, lng: 105.82014079999999 },
      markers: [],
      list_request: [
        { ID: 1,
          Ten: 'Trần Nhựt Cường',
          ThoiDiem: '12:00:12',
          SDT: '01229696585',
          DiaChi: 'Đại học khoa học tự nhiên',
          GhiChu: 'Không có',
          TinhTrang: 0
        },
        { ID: 2,
          Ten: 'Trần Nhựt Cường',
          ThoiDiem: '12:00:12',
          SDT: '01229696585',
          DiaChi: 'Đại học khoa học tự nhiên',
          GhiChu: 'Không có',
          TinhTrang: 0
        },
        { ID: 3,
          Ten: 'Trần Nhựt Cường',
          ThoiDiem: '12:00:12',
          SDT: '01229696585',
          DiaChi: 'Đại học khoa học tự nhiên',
          GhiChu: 'Không có',
          TinhTrang: 0
        }
      ]
    }
  },
  mounted () {
    this.geolocate()
  },
  methods: {
    addMarker (ID) {
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
    }
  }
}
</script>

<style scoped>
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
</style>
