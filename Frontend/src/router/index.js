import Vue from 'vue'
import Router from 'vue-router'
import RequestReceiver from '@/components/RequestReceiver'
import RequestManagement from '../components/RequestManagement'
import LocationIdentifier from '../components/LocationIdentifier'
import Driver from '../components/Driver'
<<<<<<< HEAD
import test from '../components/test.vue'
=======
import Login from '../components/Login'
>>>>>>> bb33449e0dbb6188aaeac0b8a0f0549123ff014a
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/app1',
      name: 'RequestReceiver',
      component: RequestReceiver
    },
    {
      path: '/app3',
      name: 'RequestManagement',
      component: RequestManagement
    },
    {
      path: '/app2',
      name: 'LocationIdentifier',
      component: LocationIdentifier
    },
    {
      path: '/app4/:id',
      name: 'Driver',
      props: true,
      component: Driver
    },
    {
<<<<<<< HEAD
      path: '/test',
      name: 'test',
      component: test
=======
      path: '/login',
      name: 'Login',
      component: Login
>>>>>>> bb33449e0dbb6188aaeac0b8a0f0549123ff014a
    }
  ]
})
