<template>
<div id="receiver">
  <Header Title="REQUEST RECEIVER"></Header>
  <h2 class="msg">{{ msg }}</h2>
  <v-container grid-list-md text-xs-center>
    <v-parallax>
      <h1 style="color:black;">BOOK A CAR</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="20"
          label="Fullname"
          required
        ></v-text-field>
        <v-text-field
          v-model="phone"
          label="Phone"
          required
        ></v-text-field>
        <v-text-field
          v-model="pickuplocation"
          label="Pickup Location"
          required
        ></v-text-field>
        <v-text-field
          v-model="note"
          label="Note"
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-parallax>
  </v-container>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </div>
</template>

<script>
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import io from 'socket.io-client'
import Header from './Header.vue'

export default {
  data: () => ({
    valid: true,
    name: '',
    phone: '',
    pickuplocation: '',
    note: '',
    msg: '',
    socket: io('localhost:3000')
  }),
  components: {
    Header
  },
  methods: {
    submit () {
      var self = this
      axios.post('http://localhost:3000/api/listbooks/', {
        FullName: self.name,
        PhoneNumber: self.phone,
        Address: self.pickuplocation,
        Note: self.note
      }).then(rs => {
        this.socket.emit('changed', {})
        self.msg = 'Gửi yêu cầu thành công'
      })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  .msg {
    color: blue;
    margin-top: 1rem;
  }
</style>
