import Vue from 'vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate/src';
import App from './App.vue'
import './registerServiceWorker'
import dateFilter from '@/filters/date.filter'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/message.plugin'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.use(messagePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
