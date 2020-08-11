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
    linkedlist:[],
    linkingPrcId:[],
    strategylist: [],
    userProfile: [],
    groups: [],
    isLoading: false,
    fullPage: true,
    title: '',
    message: '',
    setSubTenant: [],
    setSubTenant1: [],
    setTenant: [],
    setTenant1: [],
    setTenantreal1: [],

    setStrategyCategory: [],
    isTableSet:false,
    actualClick:false,
    initialClick:true,

  },
  mutations: {
    SET_STRATEGIES(state, strategylist) {
      state.strategylist = strategylist
      this.state.isTableSet=true;

      // alert(state.processlist[0]['id'])


    },

    SET_LINKS(state, linkedlist) {
      state.linkedlist = linkedlist
    },

    

    REMOVE_STRATEGY(state, strategy) {
      var strategies = state.strategylist
      strategies.splice(strategies.indexOf(strategy), 1)
  },

  REMOVE_LINK(state) {
      var links= state.linkedlist
        state.linkingPrcId=this.state.linkingPrcId
    this.dispatch('loadLinkedListTable',[this.state.linkingPrcId])

},

  UPDATE_STRATEGY(state, strategylist) {
    // state.strategylist = strategylist
    // alert('hi')
    this.dispatch('loadStrategyListTable')
  },

  CREATE_LINK(state, prc_id) {
  state.linkingPrcId = prc_id
 
    this.dispatch('loadLinkedListTable',[this.state.linkingPrcId])
  },

  CREATED_STRATEGY(state, userObject) {
      // console.log('add User', userObject)
      this.dispatch('loadStrategyListTable')
      // console.log('after User', state.STRATEGIES)
  },
    
  },
  getters: {

  strategylist: state => state.strategylist,
    getRowCount: state => state.strategylist.length,
    linkingPrcId: state=> state.linkingPrcId,
     isTableSet: state=>state.isTableSet,
    linkedlist: state => state.linkedlist,
    getRowCount1: state => state.linkedlist.length,
    translations:state => state.translations,
    initialClick:state=>state.initialClick,
    actualClick:state=> state.actualClick,
  },
  actions: {
   
    

   
    loadTenants({commit}) {
      Vue.axios({
        url: 'stgloadTenants1',
        method: 'GET'
      })
        .then(response => {
          if (response.data.code == 200) {
            this.state.setTenant = response.data.tenants.map(function (item) {
              return {
                text: item.name,
                value: item.id
              }
            });
           
          }
        });
    },

    loadlinkTenants({commit}) {
      Vue.axios({
        url: 'stgloadTenants11',
        method: 'GET'
      })
        .then(response => {
          if (response.data.code == 200) {
            this.state.setTenant1 = response.data.tenants.map(function (item) {
              return {
                text: item.name,
                value: item.id
              }
            });
           
          }
        });
    },

    loadlinkTenantsreal({commit}) {
      Vue.axios({
        url: 'stgloadTenantsreal11',
        method: 'GET'
      })
        .then(response => {
          if (response.data.code == 200) {
            this.state.setTenantreal1 = response.data.tenants.map(function (item) {
              return {
                text: item.name,
                value: item.id
              }
            });
           
          }
        });
        // console.log(this.state.setTenantreal1[0].text)
    },

    loadCategory({commit}) {
      Vue.axios({
        url: 'stgloadCategory1',
        method: 'GET'
      })
        .then(response => {
          if (response.data.code == 200) {
            //this.state.loading = true,
            this.state.setStrategyCategory = response.data.kpiCat
//             .map(function (item) {
//               // console.log(this.$i18n.locale)
// // if(item.name=="Vision"){item.name="a"}
//               return {
//                 text: item.name,//$i18n.locale=='ar'?(item.name=="Goal"?"هدف":(item.name=="Target"?"غاية":(item.name=="Vision"?"رؤية":""))):item.name, //item.name,
//                 value: item.id
//               }
//             });
            // console.log(this.state.setStrategyCategory[0].text)
          }
        });
    },

    loadSubTenants({commit}, val) {
      Vue.axios.get(`/stgloadSubTenants1/${val}`)
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

    loadlinkSubTenants({commit}, val) {
      Vue.axios.get(`/stgloadSubTenants11/${val}`)
        .then(response => {
          if (response.data.code == 200) {
            //this.state.loading = true,
            this.state.setSubTenant1 = response.data.tenants.map(function (item) {
              //alert(item.id)
              return {
                text: item.name,
                value: item.id
              }
            });
          }
        });
    },

    

    loadStrategyListTable({commit}) {
      this.state.isLoading = true;
      this.state.isTableSet=false;

      // if (parent == undefined) {
      //   parent=2       }//initial,when sector not selected
   
    Vue.axios.get(`/strategylistTableVal`)

          .then(response => {
              if (response.data.code == 200) {
                  this.state.loading = true,
                  commit('SET_STRATEGIES', (response.data.data))
              } else {
                  Vue.prototype.$notify.error({
                    title: 'خطأ',
                    message: response.data.msg,
                    type: 'Error',
                    position: 'top-right',
                    duration: 10000
      
                  });
              }
              this.state.isLoading = false

          });
  },

  loadStrategyListTableSector({commit},[parent]) {
    this.state.isLoading = true;
    this.state.isTableSet = false

    // if (parent == undefined) {
    //   parent=2       }//initial,when sector not selected
 
  Vue.axios.get(`/strategylistTableValSector/${parent}`)

        .then(response => {
            if (response.data.code == 200) {
                this.state.loading = true,
                commit('SET_STRATEGIES', (response.data.data))
            } else {
                Vue.prototype.$notify.error({
                  title: 'خطأ',
                  message: response.data.msg,
                  type: 'Error',
                  position: 'top-right',
                  duration: 10000
    
                });
            }
            this.state.isLoading = false
        });
},

loadStrategyListTableOrg({commit},[parent]) {
  this.state.isLoading = true;
  // if (parent == undefined) {
  //   parent=2       }//initial,when sector not selected

Vue.axios.get(`/strategylistTableValOrg/${parent}`)

      .then(response => {
          if (response.data.code == 200) {
              this.state.loading = true,
              commit('SET_STRATEGIES', (response.data.data))
          } else {
              Vue.prototype.$notify.error({
                title: 'خطأ',
                message: response.data.msg,
                type: 'Error',
                position: 'top-right',
                duration: 10000
  
              });
          }
          this.state.isLoading = false
      });
},

  removeStrategy({commit}, strategy) {
      this.state.isLoading = true;
      // alert(strategy.id);
      Vue.axios.delete(`/strategylist1/${strategy.id}`).then(response => {
          this.state.isLoading = false;
          if (response.data.code == 200) {
              

              Vue.prototype.$notify({
                title: 'نجاح',
                message: response.data.msg,
                type: 'success',
                position: 'top-right',
                duration: 10000
        
              });
              commit('REMOVE_STRATEGY', strategy)
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
  updateStrategy({commit}, strategy) {
      // console.log(user);
      //return false;
      this.state.isLoading = true;
      Vue.axios.put(`strategylist1/${strategy.where}`, strategy.data).then(response => {
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
          commit('UPDATE_STRATEGY', strategy.data)
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
  createStrategy({commit}, strategy) {
      this.state.isLoading = true;
      Vue.axios.post(`/strategylist1`, strategy.data).then(response => {
          this.state.isLoading = false;
          if (response.data.code == 200) {
              // this.dispatch('get_text_title', 'Success@m');
              // this.dispatch('get_text_message', response.data.msg+'@m');
              // console.log('Created user', response.data.code, 'from the server')
              Vue.prototype.$notify({
                title: 'نجاح',
                message: response.data.msg,
                type: 'success',
                position: 'top-right',
                duration: 10000
    
              });
              commit('CREATED_STRATEGY', strategy.data)
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
      }).catch(error => {
          this.state.isLoading = false;
          if (error.response.status == 201){
              // this.dispatch('get_text_title', 'Error@m');
              // this.dispatch('get_text_message', error.response.data.errors.Type[0]+'@m');
              Vue.prototype.$notify.error({
                title: 'خطأ',
                message: response.data.msg,
                type: 'Error',
                position: 'top-right',
                duration: 10000
    
              });
          }})
  },
//link table
loadLinkedListTable({commit},[prc_id]) {
  this.state.isLoading = true;
  if (prc_id == undefined) {
    prc_id=this.state.linkingPrcId       }//initial,when sector not selected
// alert(prc_id);
this.state.linkedlist=[];
Vue.axios.get(`/strategylinkedlistTableVal/${prc_id}`)

      .then(response => {
          if (response.data.code == 200) {
              this.state.loading = true,
              // alert(response.data.code);

              commit('SET_LINKS', (response.data.data))
          } else {
              // this.dispatch('get_text_title', 'Error@m');
              // this.dispatch('get_text_message', response.data.msg+'@m');
              Vue.prototype.$notify.error({
                title: 'خطأ',
                message: response.data.msg,
                type: 'Error',
                position: 'top-right',
                duration: 10000
  
              });
          }
          this.state.isLoading = false
      });
},
removeLink({commit}, [link]) {
  this.state.isLoading = true;
  // if (link.id == undefined) {
  //   prc_id=this.state.linkingPrcId       }
  Vue.axios.delete(`/strategylinkedlist1/${link.tenant_id}/${link.sector_id}/${link.subtenant_id}/${this.state.linkingPrcId}`).then(response => {
    console.log(link)
      this.state.isLoading = false;
      if (response.data.code == 200) {
          Vue.prototype.$notify({
            title: 'نجاح',
            message: response.data.msg,
            type: 'success',
            position: 'top-right',
            duration: 10000
          });
          commit('REMOVE_LINK')

      } else {
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
createLink({commit}, link) {
  this.state.isLoading = true;
  if(link.where==undefined)
    link.where=this.state.linkingPrcId
    else
  this.state.linkingPrcId=link.where;
  Vue.axios.put(`strategylinkedlist1/${link.where}`, link.data).then(response => {
      this.state.isLoading = false;
      Vue.prototype.$notify({
        title: 'نجاح',
        message: response.data.msg,
        type: 'success',
        position: 'top-right',
        duration: 10000
      });
      commit('CREATE_LINK', this.state.linkingPrcId)
  }).catch(error => {
          if (error.response.status == 201){
                Vue.prototype.$notify.error({
                  title: 'خطأ',
                  message: error.response.data.msg,
                  type: 'Error',
                  position: 'top-right',
                  duration: 10000
                        });
          }})
},

  }
})