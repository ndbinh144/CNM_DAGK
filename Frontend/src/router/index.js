import Vue from 'vue'
import Router from 'vue-router'
import RequestReceiver from '@/components/RequestReceiver'
import RequestManagement from '../components/RequestManagement'
import LocationIdentifier from '../components/LocationIdentifier'
import Driver from '../components/Driver'
import Login from '../components/Login'
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
      path: '/app4',
      name: 'Driver',
      component: Driver
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
