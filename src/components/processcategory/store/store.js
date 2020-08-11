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
        categories: [],
        userProfile: [],
        groups: [],
        isLoading: false,
        fullPage: true,
        title: '',
        message: '',
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories
        },
        REMOVE_CATEGORY(state, category) {
            var categories = state.categories
            categories.splice(categories.indexOf(category), 1)
        },
        UPDATE_CATEGORY(state, user) {
            console.log(user);
        },
        CREATED_CATEGORY(state, userObject) {
            console.log('add User', userObject)
            this.dispatch('loadCategoriesTable')
            console.log('after User', state.categories)
        },
        GET_TEXT_TITLE(state, text) {
            return state.title = text;
        },
        GET_TEXT_MSG(state, text) {
            return state.message = text;
        },
    },
    getters: {
        categories: state => state.categories,
        getRowCount: state => state.categories.length,
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
        loadCategoriesTable({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'categorylistTableVal',
                method: 'GET'
            })          
                    .then(response => {
                        if (response.data.code == 200) {
                            this.state.loading = true,
                            commit('SET_CATEGORIES', (response.data.data))
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
        removeCategory({commit}, category) {
            this.state.isLoading = true;
            // alert(category.id);
            Vue.axios.delete(`/categorylist1/${category.id}`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    // this.dispatch('get_text_title', 'Success@m');
                    // this.dispatch('get_text_message', response.data.msg+'@m');
                    // console.log('removed user', response.data.code, 'from the server')
      
                    Vue.prototype.$notify({
                        title: 'نجاح',
                      message: response.data.msg,
                      type: 'success',
                      position: 'top-right',
                      duration: 10000
                    });
                    commit('REMOVE_CATEGORY', category)
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
        updateCategory({commit}, category) {
            this.state.isLoading = true;
            
      Vue.axios.put(`categorylist1/${category.where}`, category.data).then(response => {
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
          commit('UPDATE_CATEGORY', category.data)
      }).catch(error => {
              if (error.response.status == 422){
                  // his.dispatch('get_text_title', 'Error@m');
                  // this.dispatch('get_text_message', error.response.data.errors.Type[0]+'@m');
                    Vue.prototype.$notify.error({
                      title: 'خطأ',
                      message: error.response.data.message,
                      type: 'Error',
                      position: 'top-right',
                      duration: 10000
                            });
              }})

                 
        
        },
        createCategory({commit}, category) {
            
            this.state.isLoading = true;
            Vue.axios.post(`/categorylist1`, category.data).then(response => {
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
                    commit('CREATED_CATEGORY', category.data)
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
                if (error.response.status == 422){
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
                        title: 'خطأ',
                              message: response.data.msg,
                              type: 'Error',
                              position: 'top-right',
                              duration: 10000
                    })
                }
            }).catch(error => {
                this.state.isLoading = false;
                if (error.response.status == 422) {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.errors.Type[0]+'@m');
                    Vue.prototype.$notify.error({
                        title: 'خطأ',
                        message: response.data.msg,
                        type: 'Error',
                        position: 'top-right',
                        duration: 10000
                    });
                }
            })
        }
    }
})
