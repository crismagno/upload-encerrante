import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import jquery from 'jquery'
window.$ = jquery

import VueGoogleCharts from 'vue-google-charts'
 
Vue.use(VueGoogleCharts)

import './config/msgs'

import router from './config/router'
import store from './config/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
