import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'
import {i18n} from '../../plugins/i18n.js';

Vue.use(Vuex);
Vue.use(i18n);
Vue.use(Element);
Vue.prototype.$notify = Notification;
//window.Event = new Vue();

export const store = new Vuex.Store({
  state: {
    isValid: false,
    translations: {
      en: {
        "hello": "Hello World"
      },
      ar: {
        "hello": "Hallo Verden"
      }
    },
    maintenanceData: [],
    kpi_mtp: [],
    setTenant: [],
    setSubTenant: [],
    translationsdatalist: '',
    next_form_id: '',
    propTitle: '',
    propSubTitle: '',
    next_form_arg: '',
    round_deci: '',
    loading: true,
    groups: [],
    tableData: [],
    groupTanent: [],
    parents: [],
    user_of_data: [],
    user_of_auditing: [],
    isLoading: false,
  },
  mutations: {
    SET_MAINTENANCE(state, maintenanceData) {
      state.maintenanceData = maintenanceData
    },
    SET_MTP(state, mtp) {
      state.kpi_mtp = mtp.map(function (item) {
        return {
          value: item.id,
          text: item.name
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
    maintenanceData: state => state.maintenanceData,
    getRowCount: state => state.maintenanceData.length,
    getChild: state => state.parents.length,
    getShow: state => state.searchViewModal,
    getHistoryShow: state => state.searchHistoryModal,
    priorities: state => state.priorities,
    type: state => state.type,
    translations: state => state.translations,
    translationsdatalist: state => state.translationsdatalist,

  },
  actions: {
    updatedb_kpivaluestates({commit}, [sector, mtp_id]) {
      this.state.isLoading = true;
      Vue.axios({
        //url: 'maintenanceData',
        url: `/updatedb_kpivaluestates/${sector}/${mtp_id}`,
        //url: `/updatedb_kpivaluestates`,
        method: 'GET'
      })
        .then(response => {
          this.state.isLoading = false;
          if (response.data.code == 200) {
            this.dispatch('get_text_title', 'success@m');
            this.dispatch('get_text_message', response.data.msg + '@m');

            Vue.prototype.$notify({
              title: this.state.title,
              message: this.state.message,
              type: 'success',
              position: 'top-right'
            });
          } else {
            this.dispatch('get_text_title', 'success@m');
            this.dispatch('get_text_message', response.data.msg + '@m');

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
    loadMaintenance({commit}) {
      this.state.isLoading = true;
      Vue.axios({
        //url: 'maintenanceData',
        url: `/maintenanceData`,
        method: 'GET'
      })
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              commit('SET_MAINTENANCE', (response.data.maintenanceData))
          } else {
            this.dispatch('get_text_title', 'success@m');
            this.dispatch('get_text_message', response.data.msg + '@m');

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
    loadMaintenanceById({commit}, [sector, mtp_id]) {
      this.state.isLoading = true;
      Vue.axios({
        //url: 'maintenanceData',
        url: `/maintenanceData/${sector}/${mtp_id}`,
        method: 'GET'
      })
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              commit('SET_MAINTENANCE', (response.data.maintenanceData))
          } else {
            this.dispatch('get_text_title', 'success@m');
            this.dispatch('get_text_message', response.data.msg + '@m');

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
    get_text_title({commit}, textbit) {
      var transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][textbit];
      if (transtext) {
        commit('GET_TEXT_TITLE', transtext)
        //return ;
      } else {
        commit('GET_TEXT_TITLE', "!" + textbit)
      }

    },
    get_text_message({commit}, textbit) {
      var transtext = JSON.parse(localStorage.getItem('translation'))[i18n.locale][textbit];
      if (transtext) {
        commit('GET_TEXT_MSG', transtext)
        //return ;
      } else {
        commit('GET_TEXT_MSG', "!" + textbit)
      }

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
          }
        });
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
  }
});
