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
        priorityType: [],
        priorityTypeName: [],
        userProfile: [],
        groups: [],
        isLoading: false,
        fullPage: true,
        firstTime: 1,
        P: [],
        R: [],
        C: [],
        title: '',
        message: '',
    },
    mutations: {
        SET_PRIORITIES(state, priorities) {
            state.priorities = priorities
        },
        SET_PRIORITY_TYPE(state, priorities) {
            state.priorityType = [...new Set(priorities.map(item => item.TypeCode))];
        },
        SET_PRIORITY_TYPE_NAME(state, priorities) {
                state.P = [],
                state.R= [],
                state.C= [],
            priorities.forEach(function(element){
                if((element.TypeCode == 'Priority')){
                    state.P.push({
                        text: element.Type,
                        value: element.IdPRCType
                    })
                } else if(element.TypeCode == 'Risk') {
                    state.R.push({
                        text: element.Type,
                        value: element.IdPRCType
                    })
                }
                else if(element.TypeCode == 'Complexity') {
                    state.C.push({
                        text: element.Type,
                        value: element.IdPRCType
                    })
                }
            });
            state.priorityTypeName = {
                "Priority": state.P,
                "Risk": state.R,
                "Complexity": state.C,
            }
            /*state.priorityTypeName = priorities.map(function (item) {
                return {
                    text: item.Type,
                    value: item.IdPRCType
                }
                state.priorityTypeName = priorities.map(function (item) {
                return {
                    label: item.TypeCode,
                    options: [{
                        value: item.IdPRCType,
                        label: item.Type
                    }
            ]
                }
            });
            });*/
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
        getRowCount: state => state.priorities.length
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
                url: 'PriorityType',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_PRIORITIES', (response.data.PriorityType))
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
        loadPriorityType({commit}) {
            Vue.axios({
                url: 'PRCTypes',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            //commit('SET_PRIORITY_TYPE', (response.data.PRCTypes))
                            commit('SET_PRIORITY_TYPE_NAME', (response.data.PRCTypes))
                    }
                })
        },
        removePriority({commit}, user) {
            this.state.isLoading = true;
            Vue.axios.delete(`/PriorityType/${user.idTaskPriorityType}`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    console.log('removed user', response.data.code, 'from the server')
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
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
            Vue.axios.post(`PriorityType/${user.where}`, user.data).then(response => {
                this.state.isLoading = false;
                console.log('Update user', response.data.code, 'from the server');
                this.dispatch('get_text_title', 'Success@m');
                this.dispatch('get_text_message', response.data.msg+'@m');

                Vue.prototype.$notify({
                    title: this.state.title,
                    message: this.state.message,
                    type: 'success',
                    position: 'top-right'
                });
                commit('UPDATE_PRIORITY', user.data)
            }).catch(error => {
                this.state.isLoading = false;
                if (error.response.status == 422){
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.errors.PRCType[0]+'@m');

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
            Vue.axios.post(`/PriorityType`, user.data).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    this.dispatch('get_text_title', 'Success');
                    this.dispatch('get_text_message', response.data.msg);
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
                    this.dispatch('get_text_message', error.response.data.errors.PRCType[0]+'@m');
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
                        ttitle: this.state.title,
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
