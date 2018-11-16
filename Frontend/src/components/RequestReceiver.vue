<template>
<div id="receiver">
  <h2>{{msg}}</h2>
  <v-toolbar style="margin-top:0px;">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>BCT APP</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
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

export default {
  data: () => ({
    valid: true,
    name: '',
    phone: '',
    pickuplocation: '',
    note: '',
    socket: io('localhost:3000')
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('http://localhost:3000/api/listbooks/', {
          FullName: this.name,
          PhoneNumber: this.phone,
          Address: this.pickuplocation,
          Note: this.note
        })
        alert('Success !!!')
      }
      this.socket.emit('msg', {})
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
