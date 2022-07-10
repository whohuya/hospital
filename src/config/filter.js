// 过滤器
// import store from '../vuex/store'
export default {
    // 登录保存用户信息
    saveUser: function (da) {
      if ((da.success)) {
          localStorage.setItem('accessToken',JSON.stringify(da.entity))
          localStorage.setItem('userInfo',da.entity.user_nickname)
          localStorage.setItem('userId',da.entity.user_id)

      }
      return da
    },
    // 登出
    loginOut: function (da) {
      // 清理掉登录信息
      if (da.code === '200' || da.code === 200) {
        localStorage.removeItem('accessToken')
        window.location.href = location.protocol + '//' + location.host + '/login.html#/'
      } else {
      }
      return da
    },
    // 登录状态
    loginStatus: function (da) {
      if ((da.code === '200' || da.code === 200) && da.result) {
        console.log(da.result)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('permissionCodeList')
        localStorage.removeItem('keyParams')
      }
      return da
    },
  }
