// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import VeeValidate from 'vee-validate';
import Element from 'element-ui';
import {i18n} from './plugins/i18n.js';
import './assets/glyphicon.css';
import './assets/newfontAwesome.css';

// import VueSocketIO from 'vue-socket.io'

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://dev.api.najah.online:8890',
//   vuex: {
//     //store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   },
//   //options: { path: "/my-app/" } //Optional options
// }))

Vue.use(Element);
Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
console.log(window.location.pathname.split("/").includes('dashboard'));
var id = null;
//localStorage.removeItem('appId');
if (window.location.pathname.split("/").includes('dashboard')) {
  //alert('in')
  //localStorage.setItem('appId', '');
  id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  // alert(id);
  if (id != 'dashboard' && id != '') {
    console.log(id)
    localStorage.setItem('appId', id);
  }
}
if (window.location.pathname.split("/").includes('kpilist')) {
  //alert('in')
  //localStorage.setItem('appId', '');
  id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  // alert(id);
  if (id != 'kpilist' && id != '') {
    console.log(id)
    localStorage.setItem('appId', id);
  }
}
if (window.location.pathname.split("/").includes('ministrydepartmentperformance')) {
  //alert('in')
  //localStorage.setItem('appId', '');
  id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  // alert(id);
  if (id != 'ministrydepartmentperformance' && id != '') {
    console.log(id)
    localStorage.setItem('appId', id);
  }
}

Vue.axios.defaults.baseURL = 'http://dev.api.najah.online/api/v1/client';
Vue.router  = router;
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  tokenDefaultName:"token",
  tokenStore: ['localStorage', 'cookie'],
  authRedirect: {path: '/auth'},
  notFoundRedirect: {path: '/dashboard'},
  fetchData: {url: "auth/" + localStorage.getItem('appId'), method: "GET"},
  refreshData: {enabled: false}
});

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  mounted() {
  },
  methods: {},
  components: {
    App
  }
});
