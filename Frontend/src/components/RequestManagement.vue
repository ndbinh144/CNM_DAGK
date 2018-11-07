<template>
  <div class="reqManage">
    <h1 class="title">REQUEST MANAGEMENT</h1>
    
    <v-data-table :headers="headers" :items="desserts" class="elevation-1" id="table_list">
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
    <template slot="items" slot-scope="props">
      
    </template>
  </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'RequestManagement',
  data () {
    return {
      headers: [
        { text: 'STT', align: 'left', sortable: false },
        { text: 'Họ tên', align: 'left', sortable: false },
        { text: 'Số điện thoại', align: 'left', sortable: false },
        { text: 'Địa chỉ đón', align: 'left', sortable: false },
        { text: 'Ghi chú', align: 'left', sortable: false },
        { text: 'Tình trạng', align: 'left', sortable: false }
      ],
      listbook: [
        {
          ten: 'Tran Nhut Cuong',
          sdt: '01229696558',
          diachi: 'Long An, Viet Nam',
          ghichu: '',
          tinhtrang: 1
        },
        {
          ten: 'Tran Nhut Cuong 2',
          sdt: '01229696558',
          diachi: 'Long An, Viet Nam',
          ghichu: '',
          tinhtrang: 1
        },
        {
          ten: 'Tran Nhut Cuong 3',
          sdt: '01229696558',
          diachi: 'Long An, Viet Nam',
          ghichu: '',
          tinhtrang: 1
        }
      ]
    }
  }
}
</script>

<style scoped>
  .title {
    margin-bottom: 2rem;
  }

  .reqManage {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }

  #table_list {
    width: 90%;
    margin: 0 auto;
  }
</style>
