const stateOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
];
const typeOptions = [
  { label: '内部', value: 1 },
  { label: '外部', value: 2 },
];
const authStatusOptions = [
  { label: '认证中', value: 1 },
  { label: '认证通过', value: 2 },
  { label: '认证失败', value: 3 },
];
const authenticationTypeOptions = [
  { label: '个人认证', value: 'A01' },
  { label: '企业认证', value: 'A02' },
];
//sendState  sentStateOptions
const sentStateOptions = [
  { label: '未发送', value: '0' },
  { label: '失败', value: '1' },
  { label: '成功', value: '2' },
];
const articleStatus = [
  { label: '启用', value: true },
  { label: '停用', value: false },
];
const problemStatus = [
  { label: '启用', value: true },
  { label: '停用', value: false },
];
const messageTypeOptions = [
  { label: '系统消息', value: '1' },
  { label: '营销消息', value: '2' },
  { label: '支付消息', value: '3' },
];
const msgGetters = [
  { label: '全部用户', value: 1 },
  { label: '部分用户', value: 2 },
];
const imgStatus = [
  { label: '启用', value: 'true' },
  { label: '停用', value: 'false' },
];
const imgPostion = [{ label: '首页banner', value: 1 }];
const articlePostion = [
  { label: 'banner详情页 ', value: 1 },
  { label: '常见问题答案', value: 2 },
];

export {
  stateOptions,
  typeOptions,
  authStatusOptions,
  authenticationTypeOptions,
  sentStateOptions,
  articleStatus,
  problemStatus,
  messageTypeOptions,
  msgGetters,
  imgStatus,
  imgPostion,
  articlePostion,
};
