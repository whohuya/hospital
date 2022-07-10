//避免重复点击报错
VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};
//路由懒加载  which is lazy-loaded when the route is visited.
const onlineReporting=()=> import('./mod/onlineReporting/onlineReporting.vue')



Vue.use(VueRouter);
/**isScroll 页面滚动设置，列表查询页面默认false,详情页面为true */
//meta 路由元信息
const routes = [
  {
    path: '/',
    redirect: '/onlineReporting/onlineReporting',
    meta: {
      title: '在线举报',
      btnPermissions: ['admin', 'supper', 'normal'],
      isScroll: false,
      keepAlive: false,
      outLink: true,
    },
  },
  {
    path: '/onlineReporting/onlineReporting',
    name: 'onlineReporting',
    component: onlineReporting,
    meta: {
      title: '在线举报',
      btnPermissions: ['admin', 'supper', 'normal'],
      isScroll: false,
      keepAlive: false,
      outLink: true,
    },
  },

];

const router = new VueRouter({
  routes,
});

export default router;
