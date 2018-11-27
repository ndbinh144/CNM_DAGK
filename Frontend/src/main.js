// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import SocketIo from 'socket.io-client'
import VueSocketIo from 'vue-socket.io'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCookies from 'vue-cookies'

export const Socket = SocketIo(`http://localhost:3000`)

Vue.use(VueSocketIo, Socket)
Vue.use(Vuetify)
Vue.use(VueCookies)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBBLyWj-3FWtCbCXGW3ysEiI2fDfrv2v0Q',
    libraries: 'places, directions'
  }
})

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
