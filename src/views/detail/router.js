const detail =()=>import('./App')

export default new VueRouter({
  routes: [ {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta:{
          noTitle:'',
          btnPermissions: ['admin', 'supper', 'normal'],
          isScroll:false,
          keepAlive: false
      }
  },]
})
