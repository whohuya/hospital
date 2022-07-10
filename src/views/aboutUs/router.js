const aboutUs =()=>import('./App')

export default new VueRouter({
  routes: [ {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs,
      meta:{
          noTitle:'',
          btnPermissions: ['admin', 'supper', 'normal'],
          isScroll:false,
          keepAlive: false
      }
  },]
})
