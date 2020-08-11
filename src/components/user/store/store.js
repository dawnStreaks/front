import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'
import {i18n} from "../../../plugins/i18n";

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
        loading: false,
        users: [],
        userProfile: [],
        setTenant: [],
        setSubTenant: [],
        groups: [],
        parents: [],
        isLoading: false,
        fullPage: true,
        title: '',
        message: '',
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },

        SET_USER_PROFILE(state, user) {
            state.userProfile = user
        },
        SET_GROUP(state, groups) {
            state.groups = groups.map(function (item) {
                return {
                    text: item.name,
                    value: item.id
                }
            });
        },
        REMOVE_USER(state, user) {
            var users = state.users
            users.splice(users.indexOf(user), 1)
        },
        UPDATE_USER(state, user) {
            console.log(user);
            //this.dispatch('loadUsers')
        },
        CREATED_USER(state, userObject) {
            console.log('add User', userObject)
            this.dispatch('loadUsers')
            console.log('after User', state.users)
        },
        SET_PARENT_TANENTS(state, parents) {
            state.parents = parents;
        },
        SET_GROUP_TANENTS(state, groupTanent) {
            console.log(groupTanent);
            state.groupTanent = groupTanent.map(function (item) {
                //alert(item);
                return {
                    text: item.name,
                    value: item.name
                }
            });
        },
        GET_TEXT_TITLE(state, text) {
            return state.title = text;
        },
        GET_TEXT_MSG(state, text) {
            return state.message = text;
        },
    },
    getters: {
        users: state => state.users,
        getRowCount: state => state.users.length
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
        loadUsers({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'user',
                method: 'GET'
            })
            .then(response => {
                if (response.data.code == 200) {
                    commit('SET_USERS', (response.data.data))
                } else {
                    this.dispatch('get_text_title', 'error');
                    this.dispatch('get_text_message', response.data.msg);
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
        loadGroups({commit}) {
            Vue.axios({
                url: 'allGroup',
                method: 'GET'
            })
            .then(response => {
                if (response.data.code == 200) {
                    this.state.loading = true,
                        commit('SET_GROUP', (response.data.groups))
                }
            });
        },
        loadTenants({commit}) {
            Vue.axios({
                url: 'loadTenants',
                method: 'GET'
            })
            .then(response => {
                if (response.data.code == 200) {
                    //this.state.loading = true,
                    this.state.setTenant = response.data.tenants.map(function (item) {
                        //alert(item.id)
                        return {
                            text: item.name,
                            value: item.id
                        }
                    });
                }
            });
        },
        loadSubTenants({commit}, val) {
            Vue.axios.get(`/loadSubTenants/${val}`)
                .then(response => {
                    if (response.data.code == 200) {
                        //this.state.loading = true,
                        this.state.setSubTenant = response.data.tenants.map(function (item) {
                            //alert(item.id)
                            return {
                                text: item.name,
                                value: item.id
                            }
                        });
                        ;


                    }
                });
        },
        loadKpiSectorUsers({commit}, [sector, orgUnit]) {
            this.state.isLoading = true
            Vue.axios.get(`loadKpiSectorUsers/${sector}/${orgUnit}`)
                .then(response => {
                    if (response.data.code == 200) {
                        commit('SET_USERS', (response.data.data))
                    } else {
                        this.dispatch('get_text_title', 'error');
                        this.dispatch('get_text_message', response.data.msg);
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
        loadKpiOrgUsers({commit},[orgUnit, sector]) {
            this.state.isLoading = true
            Vue.axios.get(`loadKpiOrgUsers/${orgUnit}/${sector}`)
                .then(response => {
                    if (response.data.code == 200) {
                        commit('SET_USERS', (response.data.data))
                    } else {
                        this.dispatch('get_text_title', 'error');
                        this.dispatch('get_text_message', response.data.msg);
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
        loadParentTenant({commit}) {
            Vue.axios({
                url: 'allTenant',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_PARENT_TANENTS', (response.data.subTenants))
                    }
                });
        },
        loadUsersProfile({commit}, user) {
            //console.log(user);
            this.state.isLoading = true;
            Vue.axios({
                url: `/user/${user.id}/profile`,
                method: 'GET'
            })
                .then(response => {
                    alert(response.data.code);
                    if (response.data.code == 200) {
                        commit('SET_USER_PROFILE', (response.data.data))
                    } else {
                        this.dispatch('get_text_title', 'error@m');
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
        loadGroupsTenant({commit}) {
            Vue.axios({
                url: 'rolesList',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        console.log(response.data)
                        this.state.loading = true,
                            commit('SET_GROUP_TANENTS', (response.data.roles))
                    }
                });
        },
        updateUserProfile({commit}, user) {
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            };
            this.state.isLoading = true;
            Vue.axios.post(`/user/${user.where}/profile`, user.data, config).then(response => {
                //this.state.isLoading = false;
                if (response.data.code == 204) {
                    this.dispatch('get_text_title', 'success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    console.log('Update user', response.data.code, 'from the server');
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    });
                } else  {
                    this.dispatch('get_text_title', 'error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
                //commit('UPDATE_USER', user.data)
                this.state.isLoading = false
            })
        },
        updateUserPassword({commit}, user) {
            //alert('fsd')
            this.state.isLoading = true;
            Vue.axios.put(`/user/${user.where}/credentials`, user.data).then(response => {
                //this.state.isLoading = false;
                console.log('Update user', response.data.code, 'from the server');
                this.dispatch('get_text_title', 'success@m');
                this.dispatch('get_text_message', response.data.msg+'@m');
                console.log('Update user', response.data.code, 'from the server');

                Vue.prototype.$notify({
                    title: this.state.title,
                    message: this.state.message,
                    type: 'success',
                    position: 'top-right'
                });
                //commit('UPDATE_USER', user.data)
                this.state.isLoading = false
            })
        },
        removeUser({commit}, user) {
            this.state.isLoading = true;
            Vue.axios.delete(`/user/${user.id}`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    console.log('removed user', response.data.code, 'from the server')
                    this.dispatch('get_text_title', 'success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    });
                    commit('REMOVE_USER', user)
                } else {
                    this.dispatch('get_text_title', 'error@m');
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
        updateUser({commit}, user) {
            this.state.isLoading = true;
            Vue.axios.put(`/user/${user.where}`, user.data).then(response => {
                this.state.isLoading = false;
                console.log('Update user', response.data.code, 'from the server')
                this.dispatch('get_text_title', 'success@m');
                this.dispatch('get_text_message', response.data.msg+'@m');

                Vue.prototype.$notify({
                    title: this.state.title,
                    message: this.state.message,
                    type: 'success',
                    position: 'top-right'
                });
                commit('UPDATE_USER', user.data)
            })
        },
        createUser({commit}, user) {
            this.state.isLoading = true;
            Vue.axios.post(`/user`, user.data).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    this.dispatch('get_text_title', 'success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');

                    console.log('Created user', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    });
                    commit('CREATED_USER', user.data)
                } else {

                    this.dispatch('get_text_title', 'error@m');
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
                    this.dispatch('get_text_title', 'error@m');
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
                    this.dispatch('get_text_title', 'error@m');
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
