import Filter from './filter';
// 一行一条，filter 移动到独立的文件中处理
export default {
  gate: '',
  version: '', // 默认版本
  module: '', // 默认模块
  key: '', // 设置发送数据的类型是JSON还是BLOB
  filter: function () { }, // 默认拦截过滤器
  // inter: function () {}, // 默认拦截器
  list: {
    /**用户接口 */
    user: {
      login: {
        module: '',
        url: '/auth-server/oauth/token',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        filter: Filter.saveUser,
      }, //登录
      getMenus:{
        module: '',
        url: '/user-api/user/menus',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded',

      },
        updatePassword:{ module: '', url: '/user-api/user/updatePassword',type:'post',contentType:'application/x-www-form-urlencoded'},//获取菜单树

    },
    //业务中台
    bussiness: {
      organizeList:{ module: '', url: '/user-api/organization/pageList',type:'get'},//组织机构管理
      organizeCreate:{ module: '', url: '/user-api/organization/save',type:'post'},//新增集团
      organizeEdit:{ module: '', url: '/user-api/organization/update',contentType:'application/x-www-form-urlencoded',type:'put'},//修改集团
      organizeDel:{ module: '', url: '/user-api/organization/delete',type:'delete'},//删除集团
      organizeGet:{ module: '', url: '/user-api/organization/get',type:'get'},//获取组织机构
      companyList:{ module: '', url: '/user-api/organization/list',type:'get'},//获取企业
      projectManageList:{ module: '', url: '/user-api/app/page',type:'get'},//项目管理分页
      getUserList:{ module: '', url: '/user-api/user/list',type:'get'},//获取用户信息
      getUserDetail:{ module: '', url: '/user-api/user/get',type:'get'},//获取用户详细信息
      createUser:{ module: '', url: '/user-api/user/save',type:'post'},//创建用户信息
      updateUser:{ module: '', url: '/user-api/user/update',type:'put'},//修改用户信息
      delUser:{ module: '', url: '/user-api/user/delete',type:'delete'},//删除用户信息
      getRoleAll:{ module: '', url: '/user-api/role/list',type:'get'},//获取角色信息
      getRoleList:{ module: '', url: '/user-api/role/pageList',type:'get'},//获取角色信息
      getMenuList:{ module: '', url: '/user-api/menu/pageList',type:'get'},//获取菜单分页
      createMenu:{ module: '', url: '/user-api/menu/save',type:'get'},//创建菜单
      getProject:{ module: '', url: '/user-api/app/list',type:'get'},//项目
      externalManageList:{ module: '', url: '/user-api/user/manage/page',type:'get'},//外部用户信息分页查询
      externalManageUpdateState:{ module: '', url: '/user-api/user/manage/update/status',type:'post'},//外部用户修改用户状态
      enterpriseInfo:{ module: '', url: '/user-api/user/manage/get/enterprise/auth/info',type:'get'},//外部用户企业认证详情查询
      personalInfo:{ module: '', url: '/user-api/user/manage/get/personal/auth/info',type:'get'},//外部用户个人认证详情查询
      personalAudit:{ module: '', url: '/user-api/user/review/personal',type:'post'},//外部用户个人认证审核
      enterpriseAudit:{ module: '', url: '/user-api/user/review/enterprise',type:'post'},//外部用户企业认证审核
      getadmainUser:{ module: '', url: '/user-api/user/maps/like/name',type:'get'},//根据用户名称模糊查询用户名称和手机号
      projectCreate:{ module: '', url: '/user-api/app/save',contentType:'application/x-www-form-urlencoded',type:'put'},//新增项目
      projectEdit:{ module: '', url: '/user-api/app/update',contentType:'application/x-www-form-urlencoded',type:'post'},//修改项目
      projectDelete:{ module: '', url: '/user-api/app/delete',type:'delete'},//删除项目
      roleCreate:{ module: '', url: '/user-api/role/save',type:'post'},//新增角色
      roleUpdate:{ module: '', url: '/user-api/role/update', contentType:'application/x-www-form-urlencoded' ,type:'put'},//修改角色
      roleDelete:{ module: '', url: '/user-api/role/delete',type:'delete'},//删除角色
      menuCreate:{ module: '', url: '/user-api/menu/save',type:'post'},//新增菜单
      menuUpdate:{ module: '', url: '/user-api/menu/update', contentType:'application/x-www-form-urlencoded' ,type:'put'},//修改菜单
      menuDelete:{ module: '', url: '/user-api/menu/delete',type:'delete'},//删除菜单
      getMenu:{ module: '', url: '/user-api/menu/list',type:'get'},//获取所有菜单
      getMenuDetail:{ module: '', url: '/user-api/menu/get',type:'get'},//获取菜单详情
      getOgrInfoTree:{ module: '', url: '/user-api/organization/getOgrInfoTree',type:'get'},//获取组织机构信息树列表
      getAuthRoleList:{ module: '', url: '/user-api/permission/getRoleList',type:'get'},//权限管理
      getMenuTree:{ module: '', url: '/user-api/permission/getMenuTree',type:'get'},//菜单树
      setAuth:{ module: '', url: '/user-api/permission/authorize',type:'post'},//角色授权
      resetAuth:{ module: '', url: '/user-api/permission/reset',type:'post'},//重置权限
      getRolePermission:{ module: '', url: '/user-api/permission/getRolePermission',type:'get'},//根据指定应用下指定角色的权限信息
      getmenuFunList:{ module: '', url: '/user-api/dict/page',type:'get'},//获取菜单功能管理list分页
      getmenuFunAllList:{ module: '', url: '/user-api/dict/all',type:'get'},//获取所有菜单功能管理list
      menuFunCreate:{ module: '', url: '/user-api/dict/save',contentType:'application/x-www-form-urlencoded',type:'put'},//新增菜单功能
      menuFunUpdate:{ module: '', url: '/user-api/dict/update',contentType:'application/x-www-form-urlencoded',type:'post'},//新增菜单功能
      menuFunDelete:{ module: '', url: '/user-api/dict/delete',type:'delete'},//删除菜单功能
      getMenuConfig:{ module: '', url: '/user-api/menu',type:'get'},//菜单功能查询
      configFun:{ module: '', url: '/user-api/menu',type:'post'},//功能授权
      failLogList:{ module: '', url: '/user-api/syncData/fail/user/pageList',type:'get'},//同步失败记录
      delFailLogList:{ module: '', url: '/user-api/syncData/fail/log/delete',type:'delete'},//批量删除同步失败记录
      getRoleListByAppId:{ module: '', url: '/user-api/permission/getRoleList',type:'get'},//根据所属项目id获取角色列表
      getAuthorizedRole:{ module: '', url: '/user-api/permission/getRolePermission',type:'get'},//获取已授权角色列表
      roleAuthorize:{ module: '', url: '/user-api/user/roleAuthorize',type:'post'},//角色授权

      //反馈问题
      feedback: {
        module: '',
        url: '/ecosystem-admin/feedback/page',
        type: 'get',
      },
      feedbackDelete: {
        module: '',
        url: '/ecosystem-admin/feedback/delete',
        type: 'delete',
      },

      //消息管理
      systemMessage: {
        module: '',
        url: '/ecosystem-admin/message/page',
        type: 'get',
      },
      //消息管理详情
      articalContent: {
        module: '',
        url: '/ecosystem-admin/message/get',
        type: 'get',
      },
      //删除系统消息
      deleteSyMessage: {
        module: '',
        url: '/ecosystem-admin/message/delete',
        type: 'delete',
      },
      // 图片列表
      pictureManage: {
        module: '',
        url: '/ecosystem-admin/picture/manage/page',
        type: 'get',
      },
      // 添加图片
      addPicture: {
        module: '',
        url: '/ecosystem-admin/picture/manage/save',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
      },
      // 编辑图片
      editPicture: {
        module: '',
        url: '/ecosystem-admin/picture/manage/update',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
      },
      // 图片详情
      getImgDetail: {
        module: '',
        url: '/ecosystem-admin/picture/manage/get',
        type: 'get',
      },
      //删除图片
      deleteImg: {
        module: '',
        url: '/ecosystem-admin/picture/manage/delete',
        type: 'delete',
        contentType: 'application/x-www-form-urlencoded',
      },
      //文章列表
      articleManage: {
        module: '',
        url: '/ecosystem-admin/article/manage/page',
        type: 'get',
      },
      //添加文章
      addArticle: {
        module: '',
        url: '/ecosystem-admin/article/manage/save',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
      },
      //编辑文章
      editArticle: {
        module: '',
        url: '/ecosystem-admin/article/manage/update',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
      },
      //获取文章详情
      getArticleDetail: {
        module: '',
        url: '/ecosystem-admin/article/manage/get',
        type: 'get',
      },
      //删除文章
      deleteArticle: {
        module: '',
        url: '/ecosystem-admin/article/manage/delete',
        type: 'delete',
        contentType: 'application/x-www-form-urlencoded',
      },
      // 问题列表
      problemManage: {
        module: '',
        url: '/ecosystem-admin/general/question/page',
        type: 'get',
      },
      // 添加问题
      addProblem: {
        module: '',
        url: '/ecosystem-admin/general/question/save',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
      },
      // 编辑问题
      editProblem: {
        module: '',
        url: '/ecosystem-admin/general/question/update',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
      },
      //获取问题详情
      getProblemDetail: {
        module: '',
        url: '/ecosystem-admin/general/question/get',
        type: 'get',
      },
      //消息管理添加
      msgAdd: {
        module: '',
        url: '/ecosystem-admin/message/save',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
      },
      //消息管理编辑
      msgEdit: {
        module: '',
        url: '/ecosystem-admin/message/update',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded',
      },
      //删除问题
      deleteProblem: {
        module: '',
        url: '/ecosystem-admin/general/question/delete',
        type: 'delete',
        contentType: 'application/x-www-form-urlencoded',
      },
      //app分页
      appPage: {
        module: '',
        url: '/ecosystem-admin/appPackage/page',
        type: 'get',
      },
      //小程序分页
      appletPage: {
        module: '',
        url: '/ecosystem-admin/applet/page',
        type: 'get',
      },
      //app新增
      addApp: {
        module: '',
        url: '/ecosystem-admin/appPackage/save',
        type: 'post',
        contentType:'application/x-www-form-urlencoded'
      },
      //小程序新增
      addApplet: {
        module: '',
        url: '/ecosystem-admin/applet/save',
        type: 'post',
        contentType:'application/x-www-form-urlencoded'
      },
      //app升级
      upgradeApp: {
        module: '',
        url: '/ecosystem-admin/appPackage/upgrade',
        type: 'post',
        contentType:'application/x-www-form-urlencoded'
      },
      //小程序升级
      upgradeApplet: {
        module: '',
        url: '/ecosystem-admin/applet/upgrade',
        type: 'post',
        contentType:'application/x-www-form-urlencoded'
      },
      //小程序升级记录
      appletsRecord: {
        module: '',
        url: '/ecosystem-admin/applet/upgrade/record',
        type: 'get',
      },
      //app升级记录
      appRecord: {
        module: '',
        url: '/ecosystem-admin/appPackage/upgrade/record',
        type: 'get',
      },
      systemUser:{
        module: '',
        url: '/ecosystem-admin/message/user/list',
        type: 'get',
      },
      //h5详情
      getDetail: {
        module: '',
        url: '/ecosystem-admin/article/manage/get',
        type: 'get',
      },
    },
  },
};
