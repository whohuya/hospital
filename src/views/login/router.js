const Login =()=>import('../login/App')

export default new VueRouter({
  routes: [ {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta:{
          noTitle:'登录',
          btnPermissions: ['admin', 'supper', 'normal'],
          isScroll:false,
          keepAlive: false
      }
  },]
})
