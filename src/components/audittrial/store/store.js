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
    audittrial: [],
    userProfile: [],
    groups: [],
    isLoading: false,
    fullPage: true,
    title: '',
    message: '',
  },
  mutations: {
    SET_AUDITTRIAL(state, audittrial) {
      state.audittrial = audittrial
    },
    GET_TEXT_TITLE(state, text) {
      return state.title = text;
    },
    GET_TEXT_MSG(state, text) {
      return state.message = text;
    },
  },
  getters: {
    audittrial: state => state.audittrial,
    getRowCount: state => state.audittrial.length,
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


    loadaudittrialDataSector({commit}, val) {
      this.state.isLoading = true;
      Vue.axios.get(`/audittrialfilter/${val}`)
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              //alert(response.data.audittrial[0].new_valueslist)
              commit('SET_AUDITTRIAL', (response.data.audittrial))
          } else {
            commit('SET_AUDITTRIAL', [])
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
    loadaudittrial({commit}) {
      this.state.isLoading = true;
      Vue.axios({
        url: 'audittrial',
        method: 'GET'
      })
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              //alert(response.data.audittrial[0].new_valueslist)
              commit('SET_AUDITTRIAL', (response.data.audittrial))
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

    loadusers({commit}, val) {
      Vue.axios.get(`/loadusers`)
        .then(response => {
          if (response.data.code == 200) {
            //this.state.loading = true,
            this.state.setUsers = response.data.users.map(function (item) {
              //alert(item.id)
              return {
                text: item.name,
                value: item.id
              }
            });
          }
        });
    },

    loadscreen({commit}, val) {
      Vue.axios.get(`/loadscreens`)
        .then(response => {
          if (response.data.code == 200) {
            //this.state.loading = true,
            this.state.setScreens = response.data.screens.map(function (item) {
              //alert(item.id)
             // const [screen1, screen2,screen3] = item.name.split("\\");

              console.log(name); // john smith
              return {
                text:  item.auditname,
                value:  item.auditable_type
              }
            });
          }
        });
    },

    loadloginDatadate({commit}, val) {
      Vue.axios.get(`/loadaudittrialDataDate/${val}`)
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              commit('SET_AUDITTRIAL', (response.data.audittrial))
          }
          else {
            commit('SET_AUDITTRIAL', (response.data.audittrial))
          }

        });
    },

    loadloginDataSector({commit}, val) {
      Vue.axios.get(`/loadaudittrialDataSector/${val}`)
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              commit('SET_AUDITTRIAL', (response.data.audittrial[0]))
          }
          else {
            commit('SET_AUDITTRIAL', (response.data.audittrial))
          }

        });
    },

    loadloginDataOrgUnit({commit}, val) {
      Vue.axios.get(`/loadaudittrialDataOrgUnit/${val}`)
        .then(response => {
          if (response.data.code == 200) {
            this.state.loading = true,
              commit('SET_AUDITTRIAL', (response.data.audittrial[0]))
          }
          else {
            commit('SET_AUDITTRIAL', (response.data.audittrial))
          }
        });
    },


  }
})
