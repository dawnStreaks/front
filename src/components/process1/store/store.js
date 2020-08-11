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
    processlist: [],
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
    setProcessCategory: [],
    isTableSet:false,
    actualClick:false,
    initialClick:true,

  },
  mutations: {
    SET_PROCESSES(state, processlist) {
      state.processlist = processlist
      this.state.isTableSet=true;

      // alert(state.processlist[0]['id'])


    },

    SET_LINKS(state, linkedlist) {
      state.linkedlist = linkedlist
    },

    

    REMOVE_PROCESS(state, process) {
      var processes = state.processlist
      processes.splice(processes.indexOf(process), 1)
  },

  REMOVE_LINK(state, link) {
    // var links = this.getters.linkedlist
    // alert(links.indexOf(link))
    // console.log(links)
    // $.each(links, function(i, el){
    //   if (this.id == link){
    //     this.links.splice(i, 1);
    //   }
    // });
    var links= state.linkedlist
    // console.log(links)
    // alert(this.state.linkingPrcId)
    // // if (links.indexOf(link)!= -1) {
    //   links.splice( links.indexOf(link), 1)
    //   // commit('SET_LINKS', (links))

    // }
    state.linkingPrcId=this.state.linkingPrcId
    this.dispatch('loadLinkedListTable',[this.state.linkingPrcId])

},

  UPDATE_PROCESS(state, processlist) {
    // state.processlist = processlist
    // alert('hi')
    this.dispatch('loadProcessListTable')
  },

  CREATE_LINK(state, prc_id) {
  state.linkingPrcId = prc_id
  // alert(state.linkingPrcId);
  
  // alert(this.state.linkingPrcId);
 
    this.dispatch('loadLinkedListTable',[this.state.linkingPrcId])
  },

  CREATED_PROCESS(state, userObject) {
      // console.log('add User', userObject)
      this.dispatch('loadProcessListTable')
      // console.log('after User', state.processes)
  },
    
  },
  getters: {

  processlist: state => state.processlist,
    getRowCount: state => state.processlist.length,
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
        url: 'prcloadTenants1',
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
        url: 'prcloadTenants11',
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

    loadCategory({commit}) {
      Vue.axios({
        url: 'prcloadCategory1',
        method: 'GET'
      })
        .then(response => {
          if (response.data.code == 200) {
            //this.state.loading = true,
            this.state.setProcessCategory = response.data.kpiCat.map(function (item) {
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
      Vue.axios.get(`/prcloadSubTenants1/${val}`)
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
      Vue.axios.get(`/prcloadSubTenants11/${val}`)
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

    

    loadProcessListTable({commit}) {
      this.state.isLoading = true;
      this.state.isTableSet=false;

      // if (parent == undefined) {
      //   parent=2       }//initial,when sector not selected
   
    Vue.axios.get(`/processlistTableVal`)

          .then(response => {
              if (response.data.code == 200) {
                  this.state.loading = true,
                  commit('SET_PROCESSES', (response.data.data))
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

  loadProcessListTableSector({commit},[parent]) {
    this.state.isLoading = true;
    this.state.isTableSet = false

    // if (parent == undefined) {
    //   parent=2       }//initial,when sector not selected
 
  Vue.axios.get(`/processlistTableValSector/${parent}`)

        .then(response => {
            if (response.data.code == 200) {
                this.state.loading = true,
                commit('SET_PROCESSES', (response.data.data))
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

loadProcessListTableOrg({commit},[parent]) {
  this.state.isLoading = true;
  // if (parent == undefined) {
  //   parent=2       }//initial,when sector not selected

Vue.axios.get(`/processlistTableValOrg/${parent}`)

      .then(response => {
          if (response.data.code == 200) {
              this.state.loading = true,
              commit('SET_PROCESSES', (response.data.data))
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

  removeProcess({commit}, process) {
      this.state.isLoading = true;
      // alert(process.id);
      Vue.axios.delete(`/processlist1/${process.id}`).then(response => {
          this.state.isLoading = false;
          if (response.data.code == 200) {
              

              Vue.prototype.$notify({
                title: 'نجاح',
                message: response.data.msg,
                type: 'success',
                position: 'top-right',
                duration: 10000
        
              });
              commit('REMOVE_PROCESS', process)
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
  updateProcess({commit}, process) {
      // console.log(user);
      //return false;
      this.state.isLoading = true;
      Vue.axios.put(`processlist1/${process.where}`, process.data).then(response => {
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
          commit('UPDATE_PROCESS', process.data)
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
  createProcess({commit}, process) {
      this.state.isLoading = true;
      Vue.axios.post(`/processlist1`, process.data).then(response => {
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
              commit('CREATED_PROCESS', process.data)
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
Vue.axios.get(`/linkedlistTableVal/${prc_id}`)

      .then(response => {
          if (response.data.code == 200) {
              this.state.loading = true,
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
  Vue.axios.delete(`/linkedlist1/${link.sector_id}/${link.subtenant_id}`).then(response => {
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
          commit('REMOVE_LINK', link.subtenant_id)

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
  Vue.axios.put(`linkedlist1/${link.where}`, link.data).then(response => {
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