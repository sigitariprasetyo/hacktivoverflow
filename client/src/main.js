import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import wysiwyg from 'vue-wysiwyg'
import VueCrontab from 'vue-crontab'

Vue.use(VueCrontab)
Vue.use(Buefy)
Vue.use(wysiwyg)
Vue.config.productionTip = false

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
