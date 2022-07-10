import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isScroll: false,
    userName: '0',
    userSetting: 0, //用户管理
    groupManageSetting: 0, //集团管理
    organizeManageSetting: 0, //组织管理
    factoryManageSetting: 0, //厂区管理
    departmentManageSetting: 0, //厂区管理
    feedbackSetting: 0, //项目管理
    externalManageSetting: 0, //外部用户管理
    roleManageSetting: 0, //角色管理
    menuManageSetting: 0, //菜单管理
    menuFunManageSetting: 0, //菜单功能管理
    failLogSetting: 0, //同步失败记录
    appManageSetting: 0, //APP版本管理
    appletsManageSetting: 0, //小程序版本管理
    imageManageSetting: 0,
    problemManageSetting: 0,
    articleManageSetting: 0,
    msgSetting:0,
  },
  getters: {
    scrollget(state) {
      return state.isScroll;
    },
  },
  mutations: {
    msgDelet(state, payload) {
      state.msgSetting = payload;
    },
    scrollSet(state, payload) {
      state.isScroll = payload;
    },
    userSet(state, payload) {
      state.userSetting = payload;
    },
    groupUpdate(state, payload) {
      state.groupManageSetting = payload;
    },
    orgUpdate(state, payload) {
      state.organizeManageSetting = payload;
    },
    facUpdate(state, payload) {
      state.factoryManageSetting = payload;
    },
    departUpdate(state, payload) {
      state.departmentManageSetting = payload;
    },
    externalUpdate(state, payload) {
      state.externalManageSetting = payload;
    },
    projectUpdate(state, payload) {
      state.feedbackSetting = payload;
    },
    roleUpdate(state, payload) {
      state.roleManageSetting = payload;
    },
    menuUpdate(state, payload) {
      state.menuManageSetting = payload;
    },
    menuFunUpdate(state, payload) {
      state.menuFunManageSetting = payload;
    },
    logUpdate(state, payload) {
      state.failLogSetting = payload;
    },
    appUpdate(state, payload) {
      state.appManageSetting = payload;
    },
    appletsUpdate(state, payload) {
      state.appletsManageSetting = payload;
    },
    articleManageUpdate(state, payload) {
      state.articleManage = payload;
    },
    imageUpdate(state, payload) {
      state.imageManageSetting = payload;
    },
    problemUpdate(state, payload) {
      state.problemManageSetting = payload;
    },
    articleUpdate(state, payload) {
      state.articleManageSetting = payload;
    },
  },
  actions: {},
  modules: {},
});
