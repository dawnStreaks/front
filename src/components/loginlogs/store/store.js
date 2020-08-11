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
    loginlogs: [],
    userProfile: [],
    groups: [],
    isLoading: false,
    fullPage: true,
    title: '',
    message: '',
  },
  mutations: {
    SET_LOGINLOGS(state, loginlogs) {
      state.loginlogs = loginlogs
    },
    GET_TEXT_TITLE(state, text) {
      return state.title = text;
    },
    GET_TEXT_MSG(state, text) {
      return state.message = text;
    },
  },
  getters: {
    loginlogs: state => state.loginlogs,
    getRowCount: state => state.loginlogs.length,
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
    loadloginlogs({commit}) {
      this.state.isLoading = true;
      Vue.axios({
        url: 'loginlogs',
        method: 'GET'
      })
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              commit('SET_LOGINLOGS', (response.data.loginlogs))
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
    loadTenants({commit}) {
      Vue.axios({
        url: 'logloadTenants',
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
    loadSubTenants({commit}, val) {
      Vue.axios.get(`/logloadSubTenants/${val}`)
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

    loadloginDatadate({commit}, val) {
      Vue.axios.get(`/loadloginDataDate/${val}`)
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              commit('SET_LOGINLOGS', (response.data.loginlogs))
          }
          else {
            commit('SET_LOGINLOGS', (response.data.loginlogs))
          }

        });
    },

    loadloginDataSector({commit}, val) {
      Vue.axios.get(`/loadloginlogDataSector/${val}`)
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              commit('SET_LOGINLOGS', (response.data.loginlogs[0]))
          }
          else {
            commit('SET_LOGINLOGS', (response.data.loginlogs))
          }

        });
    },

    loadloginDataOrgUnit({commit}, val) {
      Vue.axios.get(`/loadloginlogDataOrgUnit/${val}`)
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              commit('SET_LOGINLOGS', (response.data.loginlogs[0]))
          }
          else {
            commit('SET_LOGINLOGS', (response.data.loginlogs))
          }
        });
    },


  }
})
