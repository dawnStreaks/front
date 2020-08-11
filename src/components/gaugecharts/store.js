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
        decimalVal: '',
        performance: '',
        arrayVals: [],
        arraylabel: [],
        circleMin: 0,
        circleMax: 0,
        circleInterval : 5,
        quater_base_value: 0,
        main_base_value: 0,
        setTenant: [],
        setSubTenant: [],
        setkpilist:[],
        setkpisymbol:[],
        performancedebug:0,
    },
    mutations: {
        SET_KPI_VALUE(state, [kpi_value, periodicity]) {
            var valType = 0;
            state.kpi_value = kpi_value//.map(function (item) {
            if(state.kpi_value.length==0) {
                state.target_value=0
                console.log('bb')
            } else {
                state.target_value = kpi_value[0]['kpi_target_id']
                state.decimalVal = kpi_value[0]['rounding_decimals'];
                valType = kpi_value[0]['value_type'];
            }
            this.dispatch('loadKPIquarter',[state.target_value, periodicity, valType])
        },
        SET_KPI_QUARTER_MAP(state, kpi_quarter_map) {
            state.kpi_quarter_map = kpi_quarter_map//.map(function (item) {
        },
        SET_MTP(state, mtp) {
            state.kpi_mtp = mtp.map(function (item) {
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
        kpi_quarter_map: state => state.kpi_quarter_map,
        kpi_rounding: state => state.decimalVal,
        kpi_preformance: state => state.performance,
        kpi_arrayvals: state => state.arrayVals,
        kpi_arraylabel: state => state.arraylabel,
        kpi_circleMin: state => state.circleMin,
        kpi_circleMax: state => state.circleMax,
        kpi_circleInterval: state => state.circleInterval,
    },
    actions: {
        loadTenants({commit}) {
        this.state.isLoading = true;
        Vue.axios({
          url: 'loadTenants',
          method: 'GET'
        })
          .then(response => {
            this.state.isLoading = false;
            if (response.data.code == 200) {
              this.state.loading = true,
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
        loadkpilist({commit}, val) {
        Vue.axios.get(`/loadkpi/${val}`)
          .then(response => {
            if (response.data.code == 200) {
              //this.state.loading = true,
              this.state.setkpilist = response.data.data.map(function (item) {
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
      loadkpisymbol({commit}, val) {
        Vue.axios.get(`/loadkpisymbol/${val}`)
          .then(response => {
            if (response.data.code == 200) {
              //this.state.loading = true,
              this.state.setkpisymbol = response.data.data.map(function (item) {
                //alert(item.symbol)
                return {
                  text: item.symbol,
                  value: item.id
                }
              });
              ;


            }
          });
      },
        get_text_title({commit}, textbit) {
            var transtext = this.state.translations[i18n.locale][textbit];
            if (transtext) {
                commit('GET_TEXT_TITLE', transtext)
            } else {
                commit('GET_TEXT_TITLE', "!" + textbit)
            }
        },
        get_text_message({commit}, textbit) {
            var transtext = this.state.translations[i18n.locale][textbit];
            if (transtext) {
                commit('GET_TEXT_MSG', transtext)
             } else {
                commit('GET_TEXT_MSG', "!" + textbit)
            }
        },
        loadKPIvalue({commit}, [mtp_date, kpi_id, periodicity]) {
          this.state.isLoading = true;
            if (mtp_date == undefined)
                mtp_date = 4
            if (kpi_id == undefined) {
                var url = window.location.pathname;
                kpi_id = url.substring(url.lastIndexOf('/') + 1);
            }
            if (periodicity == undefined)
                periodicity = 3
            Vue.axios.get(`/gaugechart/${mtp_date}/${kpi_id}/${periodicity}`)
                .then(response => {
                    if (response.data.code == 200) {
                      var debug_mode=1;var performancedebug=0;var progressdebug=0;
                      // if(data.response.performance)
                      //alert(response.data.performance);
                      if(response.data.performance>1 && debug_mode==1){
                        response.data.performance=1;
                        performancedebug = 1
                      }
                      else{
                        performancedebug = 0;
                      }
                        this.state.performancedebug = performancedebug;
                        this.state.progressdebug = progressdebug
                        this.state.performance = response.data.performance
                        this.state.circleMin = response.data.min;
                        this.state.circleMax = response.data.max;
                        this.state.circleInterval = response.data.interval;
                        commit('SET_KPI_VALUE', [response.data.data, periodicity])
                    } else {
                        Vue.prototype.$notify.error({
                            title: 'error',
                            message: response.data.msg,
                            type: 'Error',
                            position: 'top-right',
                            duration: 10000
                        });
                    }
                  this.state.isLoading = false;
                }).catch(error => {
                console.log(error.response.data.message);
                if (error.response.status == 403) {
                    Vue.prototype.$notify.error({
                        title: 'خطأ',
                        message: error.response.data.message,
                        type: 'Error',
                        position: 'top-right',
                        duration: 10000
                    });
                }
              this.state.isLoading = true;
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
        loadKPIquarter({commit}, [target_id, periodicity, valType]) {
            Vue.axios.get(`/quartermap/${target_id}/${periodicity}/${valType}`)
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.arrayVals = response.data.arrayVal;
                        this.state.arraylabel = response.data.arraylabel;
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
