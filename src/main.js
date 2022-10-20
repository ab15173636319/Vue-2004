import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 导入自定义插件
import MyPluins from '@/plugins/mYPlugins.js'
Vue.use(MyPluins)

// 导入过滤器
import '@/Filters/MyFilters.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
