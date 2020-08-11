import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'
import {i18n} from "../../plugins/i18n";

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
        kpi_value: [],
        kpi_quarter_map: [],
        kpi_mtp: [],
        kpi_status: 99,
        isLoading: false,
        fullPage: true,
        periodicity: 1,
        mtp_date: 4,
        kpi_id: null,
        title: '',
        message: '',
    },
    mutations: {
        SET_KPI_VALUE(state, kpi_value) {
            // state.kpi_value = kpi_value
            state.kpi_value = kpi_value//.map(function (item) {
            state.target_value = kpi_value[0]['kpi_target_id']
            console.log(state.kpi_value)
            this.dispatch('loadKPIquarter',[state.target_value])

        },
        SET_KPI_QUARTER_MAP(state, kpi_quarter_map) {
            // state.kpi_value = kpi_value
            state.kpi_quarter_map = kpi_quarter_map//.map(function (item) {

        },
        SET_MTP(state, mtp) {
            state.kpi_mtp = mtp.map(function (item) {
                //alert(item);
                return {
                    value: item.id,
                    text: item.name
                }
            });
        }
    },
    getters: {
        kpi_value: state => state.kpi_value,
        kpi_mtp: state => state.kpi_mtp,
        kpi_quarter_map: state => state.kpi_quarter_map
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
        loadKPIvalue({commit}, [mtp_date, kpi_id, periodicity]) {
            // alert(periodicity)
            // this.state.isLoading = true;
            //var kpi_id = kpi;
            if (mtp_date == undefined)
                mtp_date = 4
            if (kpi_id == undefined)
            //kpi_id=1
            {
                var url = window.location.pathname;
                kpi_id = url.substring(url.lastIndexOf('/') + 1);
            }
            if (periodicity == undefined)
                periodicity = 3
            Vue.axios.get(`/gaugechart/${mtp_date}/${kpi_id}/${periodicity}`)

                .then(response => {
                    // this.state.isLoading = false;
                    if (response.data.code == 200) {
                        //alert(response.data.data);
                        // if (response.data.data == '') {
                        //     commit('SET_KPI_VALUE',{})
                        // }
                        //   this.state.loading = true,
                        // this.state.kpi_value={}
                        //console.log(response.data.data);
                        // else{
                        console.log(response.data.data.length);
                        commit('SET_KPI_VALUE', (response.data.data))
                        // }
                    } else {
                        Vue.prototype.$notify.error({
                            title: 'error',
                            message: response.data.msg,
                            type: 'Error',
                            position: 'top-right',
                            duration: 10000
                        });
                    }
                }).catch(error => {
                console.log(error.response.data.message);
                //   this.state.isLoading = false;
                if (error.response.status == 403) {
                    Vue.prototype.$notify.error({
                        title: 'خطأ',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right',
                        duration: 10000
                    });
                }
            })
        },
        loadMTP({commit}) {
            Vue.axios({
                url: 'mtp',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_MTP', (response.data.data))
                    }
                }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403) {
                    Vue.prototype.$notify.error({
                        title: 'خطأ',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right',
                        duration: 10000
                    });
                }
            });
        },


        loadKPIquarter({commit}, [target_id]) {
            // this.state.isLoading = true;
            // loadKPIquarter({commit}) {

            Vue.axios.get(`/quartermap/${target_id}`)
            // Vue.axios.get(`/quartermap`)


                .then(response => {
                    // this.state.isLoading = false;
                    if (response.data.code == 200) {
                        //   this.state.loading = true,
                        commit('SET_KPI_QUARTER_MAP', (response.data.data))
                    } else {
                        Vue.prototype.$notify.error({
                            title: 'error',
                            message: response.data.msg,
                            type: 'Error',
                            position: 'top-right',
                            duration: 10000
                        });
                    }
                }).catch(error => {
                console.log(error.response.data.message);
                //   this.state.isLoading = false;
                if (error.response.status == 403) {
                    Vue.prototype.$notify.error({
                        title: 'خطأ',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right',
                        duration: 10000
                    });
                }
            })
        },
        translation() {
            Vue.axios.get(`/gettranslations`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    var trans = JSON.stringify(response.data.data);
                    //console.log("testing")
                    //console.log(trans);
                    this.state.translations = response.data.data;
                } else {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg + '@m');
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
                    this.dispatch('get_text_message', error.response.data.errors.Type[0] + '@m');
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
