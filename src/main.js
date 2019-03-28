// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Uimini from 'uimini/dist/css/uimini.css'
import Vuelidate from 'vuelidate'
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'
Vue.config.productionTip = false
Vue.use(Vuelidate, Uimini)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  created () {
    var config = {
      apiKey: 'AIzaSyCD3YlXlwv2Q6WNT8BVjXxvM18YRw32m0g',
      authDomain: 'vuefilmlibrary.firebaseapp.com',
      databaseURL: 'https://vuefilmlibrary.firebaseio.com',
      projectId: 'vuefilmlibrary',
      storageBucket: 'vuefilmlibrary.appspot.com',
      messagingSenderId: '280309660149'
    }
    firebase.initializeApp(config)
  }
})
