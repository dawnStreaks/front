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
        roles: '',
        loading: false,
        risklist: [],
        riskdata: [],
        userProfile: [],
        groups: [],
        isLoading: false,
        fullPage: true,
        title: '',
        message: '',
        setTenant: [],
        setSubTenant: [],
        projectlist:[],
        sectors: [],
        userlist:[],
        riskcatlist:[],
        sectorUser: [],
        project_id:'',
        for_edit:true,
        for_insert:false,

    },
    mutations: {

        SET_DEFAULT_DATA(state, defaultData) {
            //console.log(defaultData.roles);
            state.roles = defaultData.roles.map(function (item) {
                //alert(item);
                return {
                    id: item.id,
                    label: item.name
                }
            });
            state.sectors = defaultData.sectors;
            state.notiArgs = defaultData.notiArgs;
            state.dom = defaultData.dom;
            state.notiEvent = defaultData.notiEvent.map(function (item) {
                return {
                    text: item.name,
                    value: item.id,
                }
            });
        },

      SET_RISKLIST(state, risklist) {
            state.risklist = risklist
        },
        SET_RISK_DATA(state, riskdata) {
            state.riskdata = riskdata
        },
        SET_PROJECTIST(state, projectlist) {
            state.projectlist = projectlist.map(function (item) {
                //alert(item);
                return {
                  value: item.id,
                  //text: item.name
                // value:item.name,
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
        REMOVE_RISK(state, risk) {
            var risks = state.risklist
            risks.splice(risks.indexOf(risk), 1)
        },
        UPDATE_RISK(state, risklist) {
            // console.log(risklist)
            // alert('hipppiiieee')
            this.dispatch('loadrisklist')
            // window.history.back();


          },
        
      
    },
    getters: {
      risklist: state => state.risklist,
      riskdata: state => state.riskdata,
        getRowCount: state => state.risklist.length,
        translations:state => state.translations,
        sectors: state => state.sectors,
        sectorUser: state => state.sectorUser,
        project_id: state => state.project_id,

    },
    actions: {


        loaduserlist({commit}) {
            //alert(sector)
            this.state.isLoading = true;
            Vue.axios({
                url: 'loaduserlist',
                method: 'GET'
            })
              .then(response => {
                if (response.data.code == 200) {
                  this.state.userlist = response.data.data;
                  console.log(this.state.userlist)
                }
                this.state.isLoading = false;
              });
          },

          
          loadriskcatlist({commit}) {
            //alert(sector)
            this.state.isLoading = true;
            Vue.axios({
                url: 'loadriskcatlist',
                method: 'GET'
            })
              .then(response => {
                if (response.data.code == 200) {
                  this.state.riskcatlist = response.data.data;
                  console.log(this.state.riskcatlist)
                }
                this.state.isLoading = false;
              });
          },


        loadNotificationDefaultData({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'loadNotificationDefaultData1',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        console.log(response.data)
                        this.state.loading = true,
                        commit('SET_DEFAULT_DATA', (response.data))
                    }
                    this.state.isLoading = false;
                });
        },


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
      loadprojectearch({commit}, val) {
          
        this.state.isLoading = true;
        Vue.axios.get(`/projectlistfilter/${val}`)
          .then(response => {
            if (response.data.code == 200) {
              this.state.loading = true,
                //alert(response.data.audittrial[0].new_valueslist)
                commit('SET_PROJECTIST', (response.data.projectlist))
            } else {
              commit('SET_PROJECTIST', [])
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

        loadrisklist({commit},val) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'risklist',
                method: 'GET'
            })
            // Vue.axios.get(`/risklist/${val}`)

                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true,
                        commit('SET_RISKLIST', (response.data.risklist))
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
        removeRisk({commit}, risk) {
            this.state.isLoading = true;
            // alert(strategy.id);
            Vue.axios.delete(`/risklist1/${risk.id}`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    
      
                    Vue.prototype.$notify({
                      title: 'نجاح',
                      message: response.data.msg,
                      type: 'success',
                      position: 'top-right',
                      duration: 10000
              
                    });
                    commit('REMOVE_RISK', risk)
                } else {
                    // this.dispatch('get_text_title', 'Error@m');
                    // this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                      title: 'خطأ',
                      message: response.data.msg,
                      type: 'Error',
                      position: 'top-right',
                      duration: 10000
          
                    })
                }
            })
        },
        updateRisk({commit}, risk) {
            // console.log(user);
            //return false;
            // alert('hi')

            this.state.isLoading = true;
            Vue.axios.put(`risklist1/${risk.where}`, risk.data).then(response => {
                this.state.isLoading = false;
                // this.dispatch('get_text_title', 'Success@m');
                // this.dispatch('get_text_message', response.data.msg+'@m');
                // console.log('Update user', response.data.code, 'from the server')
                Vue.prototype.$notify({
                  title: 'نجاح',
                  message: response.data.msg,
                  type: 'success',
                  position: 'top-right',
                  duration: 10000
                });
                commit('UPDATE_RISK', risk.data)
                window.location.replace('/risklist/'+risk.pid)
                // window.history.back();


            }).catch(error => {
                    if (error.response.status == 201){
                        // his.dispatch('get_text_title', 'Error@m');
                        // this.dispatch('get_text_message', error.response.data.errors.Type[0]+'@m');
                          Vue.prototype.$notify.error({
                            title: 'خطأ',
                            message: error.response.data.msg,
                            type: 'Error',
                            position: 'top-right',
                            duration: 10000
                                  });
                    }})

        },
      
        // loadUser({commit},sector) {
        //     //alert(sector)
        //     this.$store.state.isLoading = true;
        //     Vue.axios.get(`loadKpiOrgUsersNotification/${sector}/null`)
        //       .then(response => {
        //         if (response.data.code == 200) {
        //           this.$store.state.sectorUser = response.data.data;
        //         }
        //         this.$store.state.isLoading = false;
        //       });
        //   },
    // 
    // {
    //     Vue.axios.get(`/risklist1/${riskid}`)
    //     .then((response) => {
    //                       this.state.riskData = response.data.data

    //     });

    // },

 loadriskdata({commit},riskid){
            this.state.isLoading = true;
          Vue.axios.get(`/risklist1/${riskid}`)
                .then(response => {
                    if (response.data.code == 200) {
                        console.log(response.data)
                        this.state.loading = true,
                        commit('SET_RISK_DATA', (response.data.data))
                    }
                    this.state.isLoading = false;
                });
        },


      createRisk({commit}, risk) {
            this.state.isLoading = true;
            Vue.axios.post(`/riskstore`, risk.data).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    this.dispatch('get_text_title', 'Success@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    console.log('Created project', response.data.code, 'from the server')
                    Vue.prototype.$notify({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'success',
                        position: 'top-right'
                    });
                    window.location.replace('/risklist/'+risk.pid)

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
                if (error.response.status == 422){
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.errors.Type[0]+'@m');
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
