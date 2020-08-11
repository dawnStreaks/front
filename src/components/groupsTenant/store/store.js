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
        groups: [],
        groupTanent: [],
        parents: [],
        isLoading: false,
        fullPage: true,
        title: '',
        message: '',
    },
    mutations: {
        SET_GROUP(state, groups) {
            state.groups = groups
        },
        SET_PARENT_TANENTS(state, parents) {
            state.parents = parents;
        },
        SET_GROUP_TANENTS(state, groupTanent) {
            state.groupTanent = groupTanent.map(function (item) {
                return {
                    text: item.name,
                    value: item.id
                }
            });
        },
        CREATED_GROUP(state, groupObject) {
            console.log('add Group', groupObject)
            this.dispatch('loadGroups')
            console.log('after Group', state.groups)
        },
        UPDATE_GROUP(state, group) {
            console.log(group);
            //this.dispatch('loadUsers')
        },
        REMOVE_GROUP(state, user) {
            var groups = state.groups;
            groups.splice(groups.indexOf(user), 1)
        },
        GET_TEXT_TITLE(state, text) {
            return state.title = text;
        },
        GET_TEXT_MSG(state, text) {
            return state.message = text;
        },
    },
    getters: {
        groups: state => state.groups,
        getRowCount: state => state.groups.length
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
        loadGroups({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'group',
                method: 'GET'
            })
            .then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    this.state.loading = true,
                        commit('SET_GROUP', (response.data.groups))
                } else {
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');

                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }
            }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){

                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.message+'@m');

                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }})
        },
        loadParentTenant({commit}) {
            Vue.axios({
                url: 'tenant',
                method: 'GET'
            })
            .then(response => {
                if (response.data.code == 200) {
                    this.state.loading = true,
                        commit('SET_PARENT_TANENTS', (response.data.subTenants))
                }
            }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){

                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.message+'@m');

                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }});
        },
        loadGroupsTenant({commit}) {
            Vue.axios({
                url: 'groupType',
                method: 'GET'
            })
            .then(response => {
                if (response.data.code == 200) {
                    console.log(response.data)
                    this.state.loading = true,
                        commit('SET_GROUP_TANENTS', (response.data.data))
                }
            }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){

                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.message+'@m');

                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }});
        },
        createGroup({commit}, groupTenant) {
            this.state.isLoading = true;
            Vue.axios.post(`/group`, groupTenant.data).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    console.log('Created Group', response.data.code, 'from the server');
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');

                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    })
                    commit('CREATED_GROUP', groupTenant.data)
                } else {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.data+'@m');

                    console.log('Created Group', response.data.code, 'from the server')
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.message+'@m');

                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }})
        },
        updateGroup({commit}, groupTenant) {
            this.state.isLoading = true;
            Vue.axios.put(`/group/${groupTenant.where}`, groupTenant.data).then(response => {
                this.state.isLoading = false;
                console.log('Update group', response.data.code, 'from the server');
                this.dispatch('get_text_title', 'Success@m');
                this.dispatch('get_text_message', response.data.msg+'@m');
                Vue.prototype.$notify({
                    title: this.state.title,
                    message: this.state.message,
                    type: 'success',
                    position: 'top-right'
                })
                commit('UPDATE_GROUP', groupTenant.data)
            }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.message+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }})
        },
        removeUser({commit}, groupTenant) {
            this.state.isLoading = true;
            Vue.axios.delete(`/group/${groupTenant.id}`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    console.log('removed group', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    })
                    commit('REMOVE_GROUP', groupTenant)
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
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.message+'@m');
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
