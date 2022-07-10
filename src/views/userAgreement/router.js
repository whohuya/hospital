const userAgreement =()=>import('./App')

export default new VueRouter({
  routes: [ {
      path: '/userAgreement',
      name: 'userAgreement',
      component: userAgreement,
      meta:{
          noTitle:'',
          btnPermissions: ['admin', 'supper', 'normal'],
          isScroll:false,
          keepAlive: false
      }
  },]
})
