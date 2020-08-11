import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'
import {i18n} from "../../../plugins/i18n";

Vue.use(Vuex);
Vue.use(i18n);
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
        priorities: [],
        userProfile: [],
        groups: [],
        isLoading: false,
        fullPage: true,
        title: '',
        message: '',
    },
    mutations: {
        SET_PRIORITIES(state, priorities) {
            state.priorities = priorities
        },
        REMOVE_PRIORITY(state, user) {
            var priorities = state.priorities
            priorities.splice(priorities.indexOf(user), 1)
        },
        UPDATE_PRIORITY(state, user) {
            console.log(user);
        },
        CREATED_PRIORITY(state, userObject) {
            console.log('add User', userObject)
            this.dispatch('loadPriorities')
            console.log('after User', state.priorities)
        },
        GET_TEXT_TITLE(state, text) {
            return state.title = text;
        },
        GET_TEXT_MSG(state, text) {
            return state.message = text;
        },
    },
    getters: {
        priorities: state => state.priorities,
        getRowCount: state => state.priorities.length,
        translations:state => state.translations,
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
        loadPriorities({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'PRCTypes',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                        commit('SET_PRIORITIES', (response.data.PRCTypes))
                    } else {
                        this.dispatch('get_text_title', 'Error@m');
                        this.dispatch('get_text_message', response.data.msg+'@m');
                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                    }
                    this.state.isLoading = false
                });
        },
        removePriority({commit}, user) {
            this.state.isLoading = true;
            Vue.axios.delete(`/PRCTypes/${user.IdPRCType}`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    console.log('removed user', response.data.code, 'from the server')

                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    });
                    commit('REMOVE_PRIORITY', user)
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
        updatePriority({commit}, user) {
            console.log(user);
            //return false;
            this.state.isLoading = true;
            Vue.axios.post(`PRCTypes/${user.where}`, user.data).then(response => {
                this.state.isLoading = false;
                this.dispatch('get_text_title', 'Success@m');
                this.dispatch('get_text_message', response.data.msg+'@m');
                console.log('Update user', response.data.code, 'from the server')
                Vue.prototype.$notify({
                    title: this.state.title,
                    message: this.state.message,
                    type: 'success',
                    position: 'top-right'
                });
                commit('UPDATE_PRIORITY', user.data)
            }).catch(error => {
                    if (error.response.status == 422){
                        his.dispatch('get_text_title', 'Error@m');
                        this.dispatch('get_text_message', error.response.data.errors.Type[0]+'@m');
                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                    }})
        },
        createPriority({commit}, user) {
            this.state.isLoading = true;
            Vue.axios.post(`/PRCTypes`, user.data).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    console.log('Created user', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    });
                    commit('CREATED_PRIORITY', user.data)
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
                if (error.response.status == 422){
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.errors.Type[0]+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }})
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
