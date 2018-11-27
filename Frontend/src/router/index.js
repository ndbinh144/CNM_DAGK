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

var router = new Router({
  routes: [
    {
      path: '/app1',
      name: 'RequestReceiver',
      component: RequestReceiver,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/app3',
      name: 'RequestManagement',
      component: RequestManagement,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/app2',
      name: 'LocationIdentifier',
      component: LocationIdentifier,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/app4/:id',
      name: 'Driver',
      props: true,
      component: Driver,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  var r = to.matched.some(record => record.meta.requiresAuth)
  if (r === true) {
    var userToken = document.cookie
    if (userToken === '') {
      next({
        path: '/login'
        // query: { redirect: to.fullPath }
      })
    } else next()
  } else next()
})

export default router
