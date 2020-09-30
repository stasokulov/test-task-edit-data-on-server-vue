import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const testData = () => {
  return fetch('https://my-json-server.typicode.com/stasokulov/test-task-edit-data-on-server-vue/users')
        .then(response => response.json())
        .then(json => {
          return json
        })
};
const createUser = (payload) => {
  return fetch('https://my-json-server.typicode.com/stasokulov/test-task-edit-data-on-server-vue/users', {
    method: 'POST',
    body: JSON.stringify({
      ...payload
      // email: "test@test.biz",
      // name: "Test Test",
      // username: "Test"
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
         .then((response) => response.json())
         .then((json) => {
           return json
         })
}
const fetchEditUser = (user) => {
  const path = 'https://my-json-server.typicode.com/stasokulov/test-task-edit-data-on-server-vue/users/' + user.id
  return fetch(path, {
    method: 'PUT',
    body: JSON.stringify({
      ...user
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
      .then((response) => response.json())
      .then((json) => {
        return json
      })
}
const fetchDeleteUser = (id) => {
  const path = 'https://my-json-server.typicode.com/stasokulov/test-task-edit-data-on-server-vue/users/' + id
  return fetch(path, {
      method: 'DELETE',
  })
  .then(response => response.json())
  .then(json => {
    return(json)
  })
}

export default new Vuex.Store({
  state: {
    dataInState: '',
    loadingInProgress: true
  },
  mutations: {
    SET_LOADING_STATUS(state, payload) {
      state.loadingInProgress = payload
    },
    SET_DATA(state, payload) {
      state.dataInState = payload
    },
    ADD_USER(state, payload) {
      state.dataInState.push(payload)
    },
    EDIT_USER(state, editedUser) {
      state.dataInState.forEach((user, index) => {
        if (user.id === editedUser.id) {
          for (const key in editedUser) {
            state.dataInState[index][key] = editedUser[key]
          }
        }
      })
    },
    DELETE_USER(state, payload) {
      state.dataInState.forEach((user, index) => {
        if (user.id === payload) {
          state.dataInState.splice([index], 1)
        }
      })
    }
  },
  getters: {
    getData(state) {
      return state.dataInState
    },
    getLoadingStatus(state) {
      return state.loadingInProgress
    }
  },
  actions: {
    async getData({commit}) {
      try {
        commit('SET_LOADING_STATUS', true)
        const testDataInActions = await testData()
        commit('SET_DATA', testDataInActions)
        commit('SET_LOADING_STATUS', false)
      } catch (error) {
        console.error(error)
      }
    },
    async addUser({commit}, payload) {
      try {
        commit('SET_LOADING_STATUS', true)
        const newUser = await createUser(payload)
        commit('ADD_USER', newUser)
        commit('SET_LOADING_STATUS', false)
      } catch (error) {
        console.error(error)
      }
    },
    async editUser({commit}, payload) {
      try {
        commit('SET_LOADING_STATUS', true)
        const editedUser = await fetchEditUser(payload)
        commit('EDIT_USER', editedUser)
        commit('SET_LOADING_STATUS', false)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteUser({commit}, payload) {
      try {
        commit('SET_LOADING_STATUS', true)
        await fetchDeleteUser(payload)
        commit("DELETE_USER", payload)
        commit('SET_LOADING_STATUS', false)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {}
})
