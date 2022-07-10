import App from './App.vue';
import router from './router';
import api from '../../utils/api';
import store from '../../store';
import vueWechatTitle from 'vue-wechat-title';
Vue.config.productionTip = false;
Vue.use(api).use(vueWechatTitle);
setTimeout(() => {
  let JIM = new window.JMessage();
  Vue.prototype.JIM = JIM;
});
router.beforeEach((to, from, next) => {
  if (to.meta.isScroll) {
    store.commit('scrollSet', true);
    next();
  } else {
    store.commit('scrollSet', false);
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
