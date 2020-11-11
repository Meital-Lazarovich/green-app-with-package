import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login'
import Welcome from './views/Welcome'
import UserInfo from './views/UserInfo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: 'UserInfo',
    component: UserInfo
  },
]

const router = new VueRouter({
  routes
})

export default router
