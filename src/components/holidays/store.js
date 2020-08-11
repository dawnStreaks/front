import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'

Vue.use(Vuex);
Vue.use(Element);
Vue.prototype.$notify = Notification;

export const store = new Vuex.Store({
    state: {
        loading: false,
        roles: [],
        users: [],
        allholidays: [],
        year: [],
        isLoading: false,
        fullPage: true,
        deleterequired:false,


    },
    mutations: {
        SET_VACATION(state, roles) {
            state.roles = roles
        },
        
        SET_HOLIDAYS(state, supervision) {
            //console.log(supervision);
            //state.allusers = supervision;
            state.allholidays = supervision.map(function (item) {
                //alert(item);
                return {
                    value: item.id,
                    text: item.name
                }
            });
        },
        SET_YEAR(state, supervision) {
           // console.log(supervision);
            //alert(supervision);
            state.year = supervision.map(function (item) {
                //alert(item);
                return {
                    value: item,
                    text: item
                }
            });
        },
       
        CREATED_GROUP(state, groupObject) {
            console.log('add Group', groupObject)
            this.dispatch('loadVacations')
            console.log('after Group', state.groups)
        },
        UPDATE_GROUP(state, group) {
            console.log(group);
            this.dispatch('loadVacations')
        },
        REMOVE_HOLIDAY(state, user) {
            var groups = state.roles;
            groups.splice(groups.indexOf(user), 1);
            this.state.deleterequired= true;

            

        },
    },
    getters: {
        roles: state => state.roles,
        permissions: state => state.permissions,
        objects: state => state.objects,
        getRowCount: state => state.roles.length
    },
    actions: {
        loadVacations({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'holiday',
                method: 'GET'
            })
                .then(response => {
                    this.state.isLoading = false;
                    if (response.data.code == 200) {
                        commit('SET_VACATION', (response.data.data))
                    } else {
                        Vue.prototype.$notify.error({
                            title: 'Error',
                            message: response.data.msg,
                            type: 'Error',
                            position: 'top-right'
                        });
                    }
            //alert(response.data.data);
                   this.state.loading = true;
                }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }})
        },
        loadHolidays({commit}) {
            Vue.axios({
                url: 'allholidays',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_HOLIDAYS', (response.data.data))
                    }
                }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }});
        },
        loadYear({commit}) {
            Vue.axios({
                url: 'years',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_YEAR', (response.data.data))
                    }
                }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }});
        },

        
        createGroup({commit}, groupTenant) {
            this.state.isLoading = true;
            Vue.axios.post(`/holiday`, groupTenant.data).then(response => {
                this.state.isLoading = false;

                if (response.data.code == 200) {
                    console.log('Created Group', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: 'نجاح',
                        message: response.data.msg,
                        type: 'success',
                        position: 'top-right'
                    })
                    commit('CREATED_GROUP', groupTenant.data)
                }                
                
                else {
                    console.log('Created Group', response.data.code, 'from the server')
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: response.data.msg,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }})
        },
        updateGroup({commit}, groupTenant) {
            this.state.isLoading = true;
            // this.state.daterequired= false;

            //var str = JSON.stringify(groupTenant);
            //alert(str);
            Vue.axios.put(`/holiday/${groupTenant.where}`, groupTenant.data).then(response => {
                this.state.isLoading = false;
                console.log('Update group', response.data.code, 'from the server')
                Vue.prototype.$notify({
                    title: 'نجاح',
                    message: response.data.msg,
                    type: 'success',
                    position: 'top-right',
                    duration: 450000
                })
            
                //alert(str);
                commit(
                    'UPDATE_GROUP', groupTenant.data)
            }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }})
        },
        removeHoliday({commit}, groupTenant) {
            this.state.isLoading = true;
            //var str = JSON.stringify(groupTenant);
            //alert(str);
            Vue.axios.delete(`/holiday/${groupTenant.id}`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    console.log('removed holiday', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: 'نجاح',
                        message: response.data.msg,
                        type: 'success',
                        position: 'top-right'
                    })
                    //alert(str);
                    commit('REMOVE_HOLIDAY', groupTenant)
                } else {
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: response.data.msg,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    Vue.prototype.$notify.error({
                        title: 'Error',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }})
        },
    }
})
