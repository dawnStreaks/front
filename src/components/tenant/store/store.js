import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'
import {i18n} from "../../../plugins/i18n";

Vue.use(Vuex)
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
        loading: false,
        tanents: [],
        parents: [],
        getSingle: [],
        editTanentData: [],
        isLoading: false,
        fullPage: true,
        title: '',
        message: '',
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
        GET_TEXT_TITLE(state, text) {
            return state.title = text;
        },
        GET_TEXT_MSG(state, text) {
            return state.message = text;
        },

    },
    getters: {
        tanents: state => state.tanents,
        getRowCount: state => state.tanents.length,
        parentNode: state => state.editTanentData,
    },
    actions: {
        get_text_title({commit}, textbit) {
            var transtext = this.state.translations[i18n.locale][textbit];
            if (transtext) {
                commit('GET_TEXT_TITLE', transtext)
                //return ;
            } else {
                commit('GET_TEXT_TITLE', "!" + textbit)
            }

        },
        get_text_message({commit}, textbit) {
            var transtext = this.state.translations[i18n.locale][textbit];
            if (transtext) {
                commit('GET_TEXT_MSG', transtext)
                //return ;
            } else {
                commit('GET_TEXT_MSG', "!" + textbit)
            }

        },
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
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
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
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    console.log('removed tenant', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    })
                    commit('REMOVE_TANENT', tenant)
                } else {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
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
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
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
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    console.log('Update user', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    })
                    commit('UPDATE_TANENT', tenant.data)
                } else {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg);
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
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
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    console.log('Created user', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    })
                    commit('CREATED_TANENT', tenant.data)
                } else {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            })
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
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
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
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.errors.Type[0]+'@m');
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
})
