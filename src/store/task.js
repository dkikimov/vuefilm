export default {
  state: {
    tasks: [
      {
        id: 1,
        title: 'Sherlock Holmes',
        description: 'The mystic place!',
        whatWatch: 'Serial',
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: 'Century of Adalin',
        description: 'The story about undying woman',
        whatWatch: 'Film',
        completed: true,
        editing: false
      }
    ]
  },
  mutations: {
    newTask (state, payload) {
      state.tasks.push(payload)
    }
  },
  actions: {
    newTask ({commit}, payload) {
      payload.id = Math.random()
      commit('newTask', payload)
    }
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    taskCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed
      })
    },
    taskNotCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed === false
      })
    }
  }
}
