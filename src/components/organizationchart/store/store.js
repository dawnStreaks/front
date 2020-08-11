import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'

Vue.use(Vuex)
Vue.use(Element);
Vue.prototype.$notify = Notification;

export const store = new Vuex.Store({
    state: {
        loading: false,
        tanents: [],
        parents: [],
        getSingle: [],
        editTanentData: [],
        isLoading: false,
        fullPage: true
    },
    mutations: {
        SET_TANENTS(state, tanents) {
            state.tanents = tanents
        },
        GET_DETAIL_TANENT(state, getDetail) {
            state.editTanentData = {
                "name": getDetail.name,
                "description": getDetail.description,
                "id": getDetail.id,
            }
        },
        REMOVE_TANENT(state, tenant) {
            var tanents = state.tanents
            tanents.splice(tanents.indexOf(tenant), 1)
            this.dispatch('loadTanent')
        },
        UPDATE_TANENT(state, user) {
            console.log(user);
            this.dispatch('loadTanent')
        },
        CREATED_TANENT(state, todoObject) {
            console.log('add tanent', todoObject)
            this.dispatch('loadTanent')
            console.log('after tanent', state.tanents)
        },
    },
    getters: {
        tanents: state => state.tanents,
        getRowCount: state => state.tanents.length,
        parentNode: state => state.editTanentData,
    },
    actions: {
        loadTanent({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'tenant',
                method: 'GET'
            })
            .then(response => {
                this.state.isLoading = false
                if (response.data.code == 200) {
                    this.state.loading = true,
                        commit('SET_TANENTS', (response.data.subTenants))
                } else {
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: response.data.msg,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            });
        },
        removeTanent({commit}, tenant) {
            this.state.isLoading = true;
            Vue.axios.delete(`/tenant/${tenant.id}`).then(response => {
                this.state.isLoading = false
                if (response.data.code == 200) {
                    console.log('removed tenant', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: 'Success',
                        message: response.data.msg,
                        type: 'success',
                        position: 'top-right'
                    })
                    commit('REMOVE_TANENT', tenant)
                } else {
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: response.data.msg,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            })
        },
        editTanent({commit}, tenent) {
            this.state.isLoading = true
            Vue.axios.get(`/tenant/${tenent.id}`, tenent.data).then(response => {
                this.state.isLoading = false
                if (response.data.code == 401) {
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: response.data.msg,
                        type: 'Error',
                        position: 'top-right'
                    })
                } else {
                    commit('GET_DETAIL_TANENT', (response.data.data))
                }

            })
        },
        updateTanent({commit}, tenant) {
            this.state.isLoading = true
            Vue.axios.put(`/tenant/${tenant.where}`, tenant.data).then(response => {
                this.state.isLoading = false
                if (response.data.code == 200) {
                    console.log('Update user', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: 'Success',
                        message: response.data.msg,
                        type: 'success',
                        position: 'top-right'
                    })
                    commit('UPDATE_TANENT', tenant.data)
                } else {
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: response.data.msg,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            })
        },
        createTanent({commit}, tenant) {
            this.state.isLoading = true;

            Vue.axios.post(`/tenant`, tenant.data).then(response => {
                this.state.isLoading = false
                if (response.data.code == 200) {
                    console.log('Created user', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: 'Success',
                        message: response.data.msg,
                        type: 'success',
                        position: 'top-right'
                    })
                    commit('CREATED_TANENT', tenant.data)
                } else {
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: response.data.msg,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            })
        },
    }
})