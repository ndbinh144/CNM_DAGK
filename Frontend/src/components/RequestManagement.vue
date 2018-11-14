<template>
  <div class="reqManage">
    <Header Title="REQUEST MANAGEMENT"></Header>
    <div class="mainView">
      <table class="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Thời điểm đặt</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ đón khách</th>
            <th>Ghi chú</th>
            <th>Tình trạng</th>
            <th>Xem đường đi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list_request" v-bind:key="item.STT">
            <td>{{ item.STT }}</td>
            <td>{{ item.ThoiDiem }}</td>
            <td>{{ item.Ten }}</td>
            <td>{{ item.SDT }}</td>
            <td>{{ item.DiaChi }}</td>
            <td>{{ item.GhiChu }}</td>
            <td>{{ item.TinhTrang }}</td>
            <td>
              <button class="btn btn-info" v-if="item.TinhTrang > 2">Xem</button>
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
export default {
  name: 'RequestManagement',
  data () {
    return {
      list_request: [
        { STT: 1,
          Ten: 'Trần Nhựt Cường',
          ThoiDiem: '12:00:12',
          SDT: '01229696585',
          DiaChi: 'Đại học khoa học tự nhiên',
          GhiChu: 'Không có',
          TinhTrang: 0
        },
        { STT: 2,
          Ten: 'Trần Nhựt Cường',
          ThoiDiem: '12:00:12',
          SDT: '01229696585',
          DiaChi: 'Đại học khoa học tự nhiên',
          GhiChu: 'Không có',
          TinhTrang: 3
        },
        { STT: 3,
          Ten: 'Trần Nhựt Cường',
          ThoiDiem: '12:00:12',
          SDT: '01229696585',
          DiaChi: 'Đại học khoa học tự nhiên',
          GhiChu: 'Không có',
          TinhTrang: 5
        }
      ]
    }
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
