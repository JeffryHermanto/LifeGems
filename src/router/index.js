import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Contributions from '@/components/Contributions'
import AddGem from '@/components/AddGem'
import EditGem from '@/components/EditGem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/contributions',
    name: 'Contributions',
    component: Contributions
  },
  {
    path: '/add-gem',
    name: 'AddGem',
    component: AddGem
  },
  {
    path: '/edit-gem/:gem_slug',
    name: 'EditGem',
    component: EditGem
  }
  ]
})
