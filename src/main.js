import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import Icons from '@/components/icons'
import 'element-ui/lib/theme-chalk/index.css'

import bootstrap from './config/bootstrap'
import './assets/common.scss'
import './assets/element-variables.scss'
import dict from './dict'

Vue.use(ElementUI)

Vue.component('Icon', Icons)
Vue.prototype.$dict = dict
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
