import Vue from 'vue'
import App from './App.vue'
import './config/dependencies'
import './config/msgs'
import router from './config/router'
import store from './config/store'
import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueGoogleCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
