import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/mods/goods'
import ratings from '../components/mods/ratings'
import seller from '../components/mods/seller'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/goods',
      component:goods
    },
    {
      path:'/ratings',
      component:ratings
    },
    {
      path:'/seller',
      component:seller
    }
  ]
})
