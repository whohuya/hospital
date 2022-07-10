//时间格式化
const formatDateTime = cellValue => {
  if (cellValue == null || cellValue == '') {
    return '';
  }
  return moment(cellValue).format('YYYY-MM-DD HH:mm:ss');
};

const formatStatus = cellValue => {
  return cellValue == '1' ? '启用' : cellValue == '2' ? '禁用' : '';
};
//消息管理  接收人
const formatType = cellValue => {
  return cellValue == '1' ? '全部用户' : cellValue == '2' ? '部分用户' : '';
};

//用户状态
const formatState = cellValue => {
  return cellValue ? '启用' : '停用';
};
//角色及菜单状态
const formatEnabled = cellValue => {
  return cellValue ? '启用' : '禁用';
};
//app状态
const appStatus = cellValue => {
  return cellValue == true ? '发版成功' : cellValue == false ? '未发版' : '发版失败';
};
//消息类型
const messageType = cellValue => {
  return cellValue == '1'
    ? '系统消息'
    : cellValue == '2'
    ? '营销消息'
    : cellValue == '3'
    ? '支付消息'
    : '';
};
//消息状态
const messageStatus = cellValue => {
  return cellValue == '0'
    ? '失败'
    : cellValue == '1'
    ? '成功'
    : cellValue == null
    ? '未发送'
    : '';
};

//所属项目
const formatProject = cellValue => {
  if (cellValue && cellValue.name) {
    return cellValue.name;
  } else {
    return '';
  }
};
const formatImageType = cellValue => {
  if (cellValue === 1) {
    return '首页banner';
  }
};
const formatImageStatus = cellValue => {
  return cellValue == true ? '启用' : cellValue == false ? '停用' : '';
};
const formatArticleType = cellValue => {
  return cellValue == 1 ? 'banner详情页 ' : cellValue == 2 ? '常见问题答案' : '';
};
//格式化片排序

const formatSequence = cellValue => {
  return cellValue ? cellValue : '1';
};
//
const groupManageTable = [
  //集团列表
  { label: '集团编号', prop: 'code', width: 100 },
  { label: '集团名称', prop: 'name', width: 150 },
  { label: '集团性质', prop: 'type', formatter: formatType },
  { label: '联系人', prop: 'contactPerson' },
  { label: '联系电话', prop: 'contactNumber' },
  { label: '地址', prop: 'address' },
  { label: '状态', prop: 'enabled', formatter: formatEnabled },
  { label: '创建人', prop: 'createUser' },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const organizeManageTable = [
  //组织列表
  { label: '组织编号', prop: 'code', width: 100 },
  { label: '组织名称', prop: 'name', width: 150 },
  { label: '联系人', prop: 'contactPerson' },
  { label: '联系电话', prop: 'contactNumber' },
  { label: '地址', prop: 'address' },
  { label: '所属集团', prop: 'groupName' },
  { label: '上级组织', prop: 'parentOrgName' },
  { label: '状态', prop: 'enabled', formatter: formatEnabled },
  { label: '创建人', prop: 'createUser' },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const factoryManageTable = [
  //厂区列表
  { label: '厂区编号', prop: 'code', width: 50 },
  { label: '厂区名称', prop: 'name', width: 150 },
  { label: '联系人', prop: 'contactPerson' },
  { label: '联系电话', prop: 'contactNumber' },
  { label: '所属组织', prop: 'orgName' },
  { label: '地址', prop: 'address' },
  { label: '状态', prop: 'enabled', formatter: formatEnabled },
  { label: '创建人', prop: 'createUser' },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const departmentManageTable = [
  //部门列表
  { label: '部门编号', prop: 'code', width: 50 },
  { label: '部门名称', prop: 'name', width: 150 },
  { label: '所属组织', prop: 'parentOrgName' },
  // {label: '所属分厂', prop: 'factoryName'},
  { label: '状态', prop: 'enabled', formatter: formatEnabled },
  { label: '修改时间', prop: 'updateTime', formatter: formatDateTime },
  { label: '备注', prop: 'description' },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const projectManage = [
  //项目列表
  { label: '项目编号', prop: 'code', width: 100 },
  { label: '项目名称', prop: 'name', width: 150 },
  { label: '超管姓名', prop: 'adminUser', width: 80 },
  { label: '手机号', prop: 'adminUserTelephone' },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter: formatDateTime,
    width: 100,
  },
  { label: '备注', prop: 'description', width: 150 },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const externalManage = [
  //外部用户列表
  { label: '用户名', prop: 'username', width: 80 },
  { label: '手机号', prop: 'telephone', width: 150 },
  { label: '所属项目', prop: 'appInfoList', formatter: formatProject },
  {
    label: '个人认证状态',
    otherTemplate: true,
    prop: 'userAuthenticationList',
  },
  { label: '企业认证状态', sort: true, prop: 'userAuthenticationList' },
  { label: '注册时间', prop: 'createTime', formatter: formatDateTime },
  { label: '最后登录时间', prop: 'lastLoginTime', formatter: formatDateTime },
  { label: '状态', prop: 'enabled', formatter: formatState },
  { label: '操作', template: true, fixed: 'right', width: 100 },
];
const userManageTable = [
  { label: '工号', prop: 'username', width: 80 },
  { label: '姓名', prop: 'nickname' },
  { label: '手机号', prop: 'telephone' },
  { label: '所属项目', prop: 'appNameList', width: 150 },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '最后登录时间', prop: 'lastLoginTime', formatter: formatDateTime },
  { label: '状态', prop: 'enabled', formatter: formatEnabled },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const roleManageTable = [
  { label: '角色编号', prop: 'code', width: 150 },
  { label: '角色名称', prop: 'name' },
  { label: '所属项目', prop: 'appName' },
  { label: '描述', prop: 'description', width: 150 },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter: formatDateTime,
    width: 150,
  },
  { label: '状态', prop: 'enabled', formatter: formatEnabled },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];

const menuManageTable = [
  { label: '菜单名称', prop: 'name' },
  { label: '菜单编码', prop: 'code' },
  { label: '上级菜单', prop: 'parentName' },
  { label: '描述', prop: 'description' },
  { label: '状态', prop: 'enabled', formatter: formatEnabled },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const menuFunManageTable = [
  { label: '功能编码', prop: 'code' },
  { label: '功能名称', prop: 'name' },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];

const failLogTable = [
  { label: '工号', prop: 'username' },
  { label: '姓名', prop: 'nickname' },
  { label: '手机号', prop: 'telephone' },
  { label: '同步时间', prop: 'createTime', formatter: formatDateTime },
];
const appManageTable = [
  //APP列表
  { label: 'APP名称', prop: 'name', width: 150 },
  { label: '发版人', prop: 'releaseUser', width: 100 },
  { label: '发版时间', prop: 'releaseTime', formatter: formatDateTime },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '版本号', prop: 'version' },
  { label: '发版内容', prop: 'description' },
  { label: '编码CODE', prop: 'code' },
  { label: '发版状态', prop: 'isReleased', formatter: appStatus },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const appletsManageTable = [
  //小程序列表
  { label: '小程序名称', prop: 'name', width: 150 },
  { label: '发版人', prop: 'releaseUser', width: 100 },
  { label: '发版时间', prop: 'releaseTime', formatter: formatDateTime },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '版本号', prop: 'version' },
  { label: 'APPID', prop: 'appletId' },
  { label: '发版状态', prop: 'isReleased', formatter: appStatus },
  { label: '发版内容', prop: 'description' },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const appletsRecordTable = [
  //小程序升级历史列表
  { label: '小程序名称', prop: 'name', width: 150 },
  { label: '发版人', prop: 'releaseUser', width: 100 },
  { label: '发版时间', prop: 'releaseTime', formatter: formatDateTime },
  { label: '版本号', prop: 'version' },
  { label: '发版内容', prop: 'description' },
];
const appRecordTable = [
  //app升级历史列表
  { label: 'app名称', prop: 'name', width: 150 },
  { label: '发版人', prop: 'releaseUser', width: 100 },
  { label: '发版时间', prop: 'releaseTime', formatter: formatDateTime },
  { label: '版本号', prop: 'version' },
  { label: '编码CODE', prop: 'code' },
  { label: '发版内容', prop: 'description' },
];
const msgManage = [
  { label: '消息类型', prop: 'type', formatter: messageType },
  { label: '标题', otherTemplate: true },
  { label: '接收人', prop: 'sendScope', formatter: formatType },
  { label: '创建人', prop: 'createUserName' },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '发送时间', prop: 'sendTime', formatter: formatDateTime },
  { label: '发送状态', prop: 'isSent', formatter: messageStatus },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
// 文章管理
const articleManageTable = [
  { label: '文章标题', prop: 'title' },
  { label: '文章位置', prop: 'type', formatter: formatArticleType },
  { label: '文章来源', prop: 'source' },
  { label: '创建人', prop: 'createUserName' },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '状态', prop: 'enabled', formatter: formatImageStatus },
  // { label: '文章链接', prop: 'redirectUri', formatter: formatUrl },
  {
    label: '文章链接',
    otherTemplate: true,
  },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
//问题管理
const commonProblemTable = [
  { label: '问题名称', prop: 'name' },
  { label: '排序', prop: 'sequence', formatter: formatSequence },
  { label: '创建人', prop: 'createUserName' },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '状态', prop: 'enabled', formatter: formatImageStatus },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const imageManageTable = [
  { label: '图片位置', prop: 'type', formatter: formatImageType },
  { label: '图片名称', prop: 'name' },
  { label: '创建人', prop: 'createUserName' },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '状态', prop: 'enabled', formatter: formatImageStatus },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
const feedbackManage = [
  { label: '用户名', prop: 'userName' },
  { label: '手机号', prop: 'telephone' },
  { label: '反馈内容', prop: 'content' },
  { label: '创建时间', prop: 'createTime', formatter: formatDateTime },
  { label: '操作', template: true, fixed: 'right', width: 80 },
];
export {
  userManageTable,
  organizeManageTable,
  factoryManageTable,
  departmentManageTable,
  projectManage,
  externalManage,
  roleManageTable,
  menuManageTable,
  failLogTable,
  menuFunManageTable,
  appManageTable,
  appletsManageTable,
  appletsRecordTable,
  msgManage,
  feedbackManage,
  groupManageTable,
  articleManageTable,
  commonProblemTable,
  imageManageTable,
  appRecordTable,
};
