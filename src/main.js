import Vue from 'vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate/src';
import App from './App.vue'
import './registerServiceWorker'
import tooltipDirective from '@/directives/tooltip.directive'
import dateFilter from '@/filters/date.filter'
import currencyFilter from "@/filters/currency.filter";
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/message.plugin'
import Loader from './components/app/Loader'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
  apiKey: "AIzaSyDNQcvaq-wbvrqfY7Zd6VYRBqPObrTr_gU",
  authDomain: "vue-crm-9855c.firebaseapp.com",
  databaseURL: "https://vue-crm-9855c.firebaseio.com",
  projectId: "vue-crm-9855c",
  storageBucket: "vue-crm-9855c.appspot.com",
  messagingSenderId: "583724236093",
  appId: "1:583724236093:web:070bf2943bebe62680d954",
  measurementId: "G-S0M2PC837H"
})

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.use(messagePlugin)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
