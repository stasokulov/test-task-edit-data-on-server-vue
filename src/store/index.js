import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const testData = () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
          return json
        })
};

export default new Vuex.Store({
  state: {
    dataInState: ''
  },
  mutations: {
    SET_DATA(state, payload) {
      state.dataInState = payload
    }
  },
  getters: {
    getData(state) {
      return state.dataInState
    }
  },
  actions: {
    async getData({commit}) {
      try {
        const testDataInActions = await testData()
        commit('SET_DATA', testDataInActions)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {}
})
