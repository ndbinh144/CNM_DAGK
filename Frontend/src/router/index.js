import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RequestManagement from '../components/RequestManagement'
import LocationIdentifier from '../components/LocationIdentifier'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
