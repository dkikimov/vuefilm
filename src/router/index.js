import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Task from '@/components/Task'
import store from '../store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/task',
      name: 'task',
      component: Task,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    }
  ]
})
