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
      nodes2 :[],
      connections2 : [],
      nameselected:'',
      setTenant: [],
      setSubTenant: [],
      loading: false,
      isLoading: false,
      fullPage: true,
      linkflag:'',
      title: '',
      message: '',

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

      loadmindmapdata({commit}, [val, linkflag]) {
       // alert(val);
        this.state.isLoading = true;

            Vue.axios({
                url: `/mindmapdata/${val}/${linkflag}`,
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                      this.state.isLoading = false;
                      console.log(response.data)
                      commit('SET_NODE_DATA', (JSON.parse(response.data.nodes)))
                      commit('SET_CON_DATA', (JSON.parse(response.data.data)));
                      commit('SET_SELECT_NAME', (response.data.nameselected));

                    }

                if (response.data.code  == 404) {
                  this.state.isLoading = false;

                 this.dispatch('get_text_title', 'error@m');
                  this.dispatch('get_text_message', response.data.msg + '@m');

                  // Vue.prototype.$notify.error({
                  //   title: this.state.title,
                  //   message: this.state.message,
                  //   type: 'Error',
                  //   position: 'top-right'
                  // });

                }

            });
        },



    }
})
