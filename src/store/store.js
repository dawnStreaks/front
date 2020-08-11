import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import { Notification } from 'element-ui'
Vue.use(Vuex)  
Vue.use(Element);
Vue.prototype.$notify = Notification;

export const store = new Vuex.Store({
    state: {
        loading: true,
        items: [], 
        successMessage: '',
        errorMessage: '',
    },
    mutations: {
        SET_USERS (state, items) {
          state.items = items
        },
        REMOVE_USER (state, user) {
            var items = state.items
            items.splice(items.indexOf(user), 1)
        },
        UPDATE_USER(state, user) {
            console.log(user);
            this.dispatch('loadUsers')
        },
        CREATED_USER (state, todoObject) {
            console.log('add todo', todoObject)
            this.dispatch('loadUsers')
            console.log('after todo', state.items)
          },
    },
    getters: {
        items: state => state.items,
        getRowCount: state => state.items.length
      },
      actions: {
        loadUsers ({ commit }) {
            Vue.axios({
                url: 'user',
                method: 'GET'
            })
            .then(items => {
                if(items.data.code == 200) {

                    commit('SET_USERS', (items.data.data))
                }
              });
          },
          removeUser ({ commit }, user) {
            Vue.axios.delete(`/user/${user.id}`).then(response => {
                console.log('removed user', response.data.code, 'from the server')
                this.state.successMessage = response.data.msg
                Vue.prototype.$notify({
                    title: 'Success',
                    message: response.data.msg,
                    type: 'success',
                    position: 'top-right'
                  })
              commit('REMOVE_USER', user)
            })
          },
          updateUser ({ commit }, user) {
            Vue.axios.put(`/user/${user.where}`, user.data).then(response => {
              console.log('Update user', response.data.code, 'from the server')
              this.state.successMessage = response.data.msg
              Vue.prototype.$notify({
                title: 'Success',
                message: response.data.msg,
                type: 'success',
                position: 'top-right'
              })
              commit('UPDATE_USER', user.data)
            })
          },
          createUser ({ commit }, user) {
            Vue.axios.post(`/user`, user.data).then(response => {
                console.log('Created user', response.data.code, 'from the server')
                this.state.successMessage = response.data.msg
                Vue.prototype.$notify({
                    title: 'Success',
                    message: response.data.msg,
                    type: 'success',
                    position: 'top-right'
                  })
              commit('CREATED_USER', user.data)
            })
          },
          
      }
})