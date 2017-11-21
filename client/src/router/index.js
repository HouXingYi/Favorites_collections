import Vue from 'vue'
import Router from 'vue-router'
import topHeader from 'src/components/topHeader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'topHeader',
      component: topHeader
    }
  ]
})
