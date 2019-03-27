import Vue from 'vue'
import Vuex from 'vuex'

import Task from './task'
import Tags from './tags'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    task: Task,
    tags: Tags
  }
})
