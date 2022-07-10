import App from './App.vue'
import router from './router'
import api from '../../utils/api'
import store from '../../store'
import vueWechatTitle from 'vue-wechat-title'
Vue.config.productionTip = false
Vue.use(api).use(vueWechatTitle);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
