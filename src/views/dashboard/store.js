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
    strategyCount: 0,
    setTenant: [],
    setSubTenant: [],
    loading: false,
    dashboard_value: [],
    dashboard_table_value: [],
    static_dashboard_counts: [],
    static_dashboard_table_value: [],
    dashboard_mtp: [],
    lestatus: 99,
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
  },
  mutations: {
    SET_DASHBOARD_VALUE(state, dashboard_value) {
      state.dashboard_value = dashboard_value//.map(function (item) {
      // if(state.kpi_value.length==0) {
      //     state.target_value=0
      //     console.log('bb')
      // } else {
      //     state.target_value = kpi_value[0]['kpi_target_id']
      //     state.decimalVal = kpi_value[0]['rounding_decimals'];
      // }
      // this.dispatch('loadKPIquarter',[state.target_value, periodicity])
    },
    SET_DASHBOARD_TABLE(state, dashboard_table_val) {
      state.dashboard_table_value = dashboard_table_val//.map(function (item) {
    },
    SET_STATIC_DASHBOARD_TABLE(state, dashboard_table_val) {
      state.static_dashboard_table_value = dashboard_table_val//.map(function (item) {
    },
    SET_STATIC_DASHBOARD_COUNT(state, counts) {
      state.static_dashboard_counts = counts;
      if(counts.activeCountStrategy != 0) {
        var totalCount = counts.activeCount + counts.notActiveCount;
        state.strategyCount = totalCount - counts.activeCountStrategy;
      }
    },
    SET_MTP(state, mtp) {
      state.dashboard_mtp = mtp.map(function (item) {
        return {
          value: item.id,
          text: item.name
        }
      });
    },
    REAL_TIME_REFRESH(state, [mtp_date, sector]) {
      // var mtp_date = 4;
      // var sector = 2;

      Vue.axios.get(`/dashboardVal/${mtp_date}/${sector}`)
        .then(response => {
          if (response.data.code == 200) {
            //this.state.performance = response.data.performance
            state.dashboard_value = response.data.data;
            console.log(state.dashboard_value)
          }
        })
    },
    REAL_TIME_REFRESH_TABLE(state, [mtp_date, sector]) {
      // var mtp_date = 4;
      // var sector = 2;

      Vue.axios.get(`/dashboardTableVal/${mtp_date}/${sector}`)
        .then(response => {
          if (response.data.code == 200) {
            //this.state.performance = response.data.performance
            state.dashboard_table_value = response.data.data;
            console.log(state.dashboard_table_value)
          }
        })
    },
  },
  getters: {
    dashboard_value: state => state.dashboard_value,
    dashboard_mtp: state => state.dashboard_mtp,
    dashboard_table_value: state => state.dashboard_table_value,
    static_dashboard_table_value: state => state.static_dashboard_table_value,
    static_dashboard_counts: state => state.static_dashboard_counts,
    kpi_rounding: state => state.decimalVal,
    kpi_preformance: state => state.performance,
    kpi_arrayvals: state => state.arrayVals,
    kpi_arraylabel: state => state.arraylabel,
  },
  actions: {
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

    loadDashboardValues({commit}, [mtp_date, sector]) {

      if (mtp_date == undefined)
        mtp_date = 4
      if (sector == undefined) {
        sector = 2
      }

      Vue.axios.get(`/dashboardVal/${mtp_date}/${sector}`)
        .then(response => {
          if (response.data.code == 200) {
            //this.state.performance = response.data.performance
            commit('SET_DASHBOARD_VALUE', (response.data.data))
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
            ;


          }
        });
    },

    loadMTP({commit}) {
      Vue.axios({
        url: 'mtpDashboard',
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
    // loadKPIquarter({commit}, [target_id, periodicity]) {

    loadStaticDashboardTable({commit}, [mtp_date, sector, getAll]) {
      this.state.isLoading = true;
      if (mtp_date == undefined)
        mtp_date = 4
      if (sector == undefined) {
        sector = 2
      }


      Vue.axios.get(`/staticdashboardTableVal/${mtp_date}/${sector}/${getAll}`)
        .then(response => {
          if (response.data.code == 200) {
            // this.state.arrayVals = response.data.arrayVal;
            // this.state.arraylabel = response.data.arraylabel;
            commit('SET_STATIC_DASHBOARD_TABLE', (response.data.data))
            commit('SET_STATIC_DASHBOARD_COUNT', (response.data.counts))
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
      })
    },
    loadDashboardTable({commit}, [mtp_date, sector]) {

      if (mtp_date == undefined)
        mtp_date = 4
      if (sector == undefined) {
        sector = 2
      }

      Vue.axios.get(`/dashboardTableVal/${mtp_date}/${sector}`)
        .then(response => {
          if (response.data.code == 200) {
            // this.state.arrayVals = response.data.arrayVal;
            // this.state.arraylabel = response.data.arraylabel;
            commit('SET_DASHBOARD_TABLE', (response.data.data))
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
    },
    realTimeUpdateDashboard: ({commit}, [mtp_date, sector]) => {
      commit('REAL_TIME_REFRESH', [mtp_date, sector]);
    },
    realTimeDashboardTable: ({commit}, [mtp_date, sector]) => {
      commit('REAL_TIME_REFRESH_TABLE', [mtp_date, sector]);
    }
  }
})
