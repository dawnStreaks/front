import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'

Vue.use(Vuex);
Vue.use(Element);
Vue.prototype.$notify = Notification;

export const store = new Vuex.Store({
    state: {
      translations: {
        en: {
          "hello": "Hello World"
        },
        ar: {
          "hello": "Hallo Verden"
        }
      },
        user: null,
        groups: [],
        /*todos: [
            {id: "1", title: 'Hello', completed: false, editing: false},
            {id: "2", title: 'Xyz', completed: false, editing: false},
            {id: "3", title: 'Demo', completed: false, editing: false},
        ],*/
        todos: []
    },
    mutations: {
        SET_GROUP(state, groups) {
            state.groups = groups.map(function (item) {
                return {
                    text: item.name,
                    value: item.bpm_ref
                }
            });
        },
        add(state, todo) {

            Vue.axios.post(`/TaskTodos`, todo).then(response => {
                console.log('Created user', response.data.code, 'from the server')
                this.state.successMessage = response.data.msg
                Vue.prototype.$notify({
                    title: 'Success',
                    message: response.data.msg,
                    type: 'success',
                    position: 'top-right'
                })
                state.todos.push(todo)
            })
        },
        remove(state, {index, todo}) {
            Vue.axios.delete(`/TaskTodos/${todo.id}`).then(response => {
                console.log('Created user', response.data.code, 'from the server')
                this.state.successMessage = response.data.msg
                Vue.prototype.$notify({
                    title: 'Success',
                    message: response.data.msg,
                    type: 'success',
                    position: 'top-right'
                })
                state.todos.splice(index, 1)
            })

        },
        edit(state, todo) {
            this.beforeEditCache = todo.todo_text;
            todo.editing = true;
        },
        doundo(state, todo) {
            console.log(todo)
            Vue.axios.put(`/TaskTodos/${todo.id}`, {todo: todo}).then(response => {
                console.log('Created user', response.data.code, 'from the server')
                this.state.successMessage = response.data.msg
                Vue.prototype.$notify({
                    title: 'Success',
                    message: response.data.msg,
                    type: 'success',
                    position: 'top-right'
                })
                //state.todos.splice(index, 1)
            })
        },
        Todoedit(state, {edit, todo}) {
            Vue.axios.put(`/TaskTodos/${todo.id}`, {todo: todo, edit:edit}).then(response => {
                console.log('Created user', response.data.code, 'from the server')
                this.state.successMessage = response.data.msg
                Vue.prototype.$notify({
                    title: 'Success',
                    message: response.data.msg,
                    type: 'success',
                    position: 'top-right'
                })
                //state.todos.splice(index, 1)
            })
        },
        cancel(state, todo) {

            todo.todo_text = this.beforeEditCache;
            todo.editing = false;
        },
        toggleAll(state) {
            const isDone = state.todos.every(todo => todo.completed)
            state.todos.forEach((todo) => {
                todo.completed = !isDone
            })
        }
    },
    getters: {
        getUser(state) {

            try {
                let user = Vue.auth.user();
                if (user) {
                    state.user = user;
                    console.log(user);
                    return user;
                } else {
                    return false;
                }
            }
            catch (err) {
                console.log(err)
            }
            return false;
        },
        count: state => state.todos.length,
        doneTodos: state => state.todos.filter(todo => todo.completed),
        doneTodosCount: (state, getters) => getters.doneTodos.length,
        remaining: state => state.todos.filter(todo => !todo.completed).length
    },
    actions: {
        loadGroups({commit}) {
            Vue.axios({
                url: 'group',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_GROUP', (response.data.groups))
                    }
                });
        },
        loadTaskTodos({commit}) {
            Vue.axios({
                url: 'group',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_GROUP', (response.data.groups))
                    }
                });
        },
      translation() {
        Vue.axios.get(`/gettranslations`).then(response => {
          this.state.isLoading = false;
          if (response.data.code == 200) {
            var trans=JSON.stringify(response.data.data);
            //console.log("testing")
            //console.log(trans);
            this.state.translations=response.data.data;
          } else {
            this.dispatch('get_text_title', 'Error');
            this.dispatch('get_text_message', response.data.msg);

            Vue.prototype.$notify.error({
              title: this.state.title,
              message: this.state.message,
              type: 'Error',
              position: 'top-right'
            })
          }
        }).catch(error => {
          this.state.isLoading = false;
          if (error.response.status == 422) {
            this.dispatch('get_text_title', 'Error');
            this.dispatch('get_text_message', error.response.data.errors.Type[0]);
            Vue.prototype.$notify.error({
              title: this.state.title,
              message: this.state.message,
              type: 'Error',
              position: 'top-right'
            });
          }
        })
      }

    }
});
