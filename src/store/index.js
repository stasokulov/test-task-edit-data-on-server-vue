import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const fetchUsersList = () => {
  return fetch('https://my-json-server.typicode.com/stasokulov/test-task-edit-data-on-server-vue/users')
        .then(response => response.json())
        .then(json => {
          return json
        })
};
const fetchAddUser = (user) => {
  return fetch('https://my-json-server.typicode.com/stasokulov/test-task-edit-data-on-server-vue/users', {
    method: 'POST',
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
    usersList: '',
    loadingInProgress: false
  },
  mutations: {
    SET_LOADING_STATUS(state, payload) {
      state.loadingInProgress = payload
    },
    SET_USERS(state, usersList) {
      state.usersList = usersList
    },
    ADD_USER(state, user) {
      state.usersList.push(user)
    },
    EDIT_USER(state, editedUser) {
      state.usersList.forEach((user, index) => {
        if (user.id === editedUser.id) {
          for (const key in editedUser) {
            state.usersList[index][key] = editedUser[key]
          }
        }
      })
    },
    DELETE_USER(state, id) {
      state.usersList.forEach((user, index) => {
        if (user.id === id) {
          state.usersList.splice([index], 1)
        }
      })
    }
  },
  getters: {
    getData(state) {
      return state.usersList
    },
    getLoadingStatus(state) {
      return state.loadingInProgress
    }
  },
  actions: {
    async loadData({commit}) {
      try {
        commit('SET_LOADING_STATUS', true)
        const usersList = await fetchUsersList()
        commit('SET_USERS', usersList)
        commit('SET_LOADING_STATUS', false)
      } catch (error) {
        console.error(error)
      }
    },
    async addUser({commit}, user) {
      try {
        commit('SET_LOADING_STATUS', true)
        const newUser = await fetchAddUser(user)
        commit('ADD_USER', newUser)
        commit('SET_LOADING_STATUS', false)
      } catch (error) {
        console.error(error)
      }
    },
    async editUser({commit}, user) {
      try {
        commit('SET_LOADING_STATUS', true)
        const editedUser = await fetchEditUser(user)
        commit('EDIT_USER', editedUser)
        commit('SET_LOADING_STATUS', false)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteUser({commit}, id) {
      try {
        commit('SET_LOADING_STATUS', true)
        await fetchDeleteUser(id)
        commit("DELETE_USER", id)
        commit('SET_LOADING_STATUS', false)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
