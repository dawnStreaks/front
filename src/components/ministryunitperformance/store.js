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
    nodes2: [],
    connections2: [],
    nameselected: '',
    setTenant: [],
    setSubTenant: [],
    loading: false,
    isLoading: false,
    fullPage: true,
    linkflag: '',
    title: '',
    message: '',
    setperfprog: '',
    kpi_mtp: ''

  },
  mutations: {
    SET_NODE_DATA(state, dataresp) {
      state.nodes2 = dataresp;

    },
    SET_CON_DATA(state, datarespcon) {
      state.connections2 = datarespcon;

    },
    SET_SELECT_NAME(state, nameselect) {
      state.nameselected = nameselect;

    },
    GET_TEXT_TITLE(state, text) {
      return state.title = text;
    },
    GET_TEXT_MSG(state, text) {
      return state.message = text;
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
    // kpi_value: state => state.kpi_value,
    // kpi_mtp: state => state.kpi_mtp,
    // kpi_quarter_map: state => state.kpi_quarter_map
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
      //alert(textbit);
      if (transtext) {
        commit('GET_TEXT_MSG', transtext)
        //return ;
      } else {
        commit('GET_TEXT_MSG', "!" + textbit)
      }

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

              return {
                text: item.name,
                value: item.id
              }
            });
            ;
          }
        });
    },
  }
})
