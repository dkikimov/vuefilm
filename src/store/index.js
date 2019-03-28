import Vue from 'vue'
import Vuex from 'vuex'

import Task from './task'
import Tags from './tags'
import User from './user'
import Common from './common'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Task,
    Tags,
    User,
    Common
  }
})
