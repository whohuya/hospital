import App from './App'
import router from './router'
import api from '../../utils/api'
import vueWechatTitle from 'vue-wechat-title'

Vue.config.productionTip = false
Vue.use(api)
Vue.use(vueWechatTitle)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})


