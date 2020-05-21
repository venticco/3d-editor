import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Switch from '@/components/Switch.vue'

Vue.config.productionTip = false
Vue.component('v-switch', Switch)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
