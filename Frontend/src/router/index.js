import Vue from 'vue'
import Router from 'vue-router'
import RequestReceiver from '@/components/RequestReceiver'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/receiver',
      name: 'RequestReceiver',
      component: RequestReceiver
    }
  ]
})
